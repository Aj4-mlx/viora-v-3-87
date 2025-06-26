
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Account = () => {
    const { user, signOut, loading } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [phone, setPhone] = useState("");
    const [editingPhone, setEditingPhone] = useState(false);
    const { cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/sign-in');
            return;
        }
        
        if (user) {
            fetchProfile();
            fetchOrders();
        }
    }, [user, loading, navigate]);

    const fetchProfile = async () => {
        if (!user) return;
        
        const { data: profile } = await supabase
            .from('customers')
            .select('*')
            .eq('id', user.id)
            .single();
        
        if (profile) {
            setProfile(profile);
            setPhone(profile.phone || "");
        }
    };

    const fetchOrders = async () => {
        if (!user) return;
        
        const { data: orders } = await supabase
            .from("orders")
            .select(`
                *,
                order_items(
                    *,
                    products(name, image_url)
                )
            `)
            .eq("customer_id", user.id)
            .order("created_at", { ascending: false });
        
        if (orders) setOrders(orders);
    };

    const handleSignOut = async () => {
        await signOut();
        toast.success("Signed out successfully.");
        navigate("/");
    };

    const handlePhoneSave = async () => {
        if (!/^01[0-9]{9}$/.test(phone)) {
            toast.error("Please enter a valid Egyptian phone number.");
            return;
        }
        
        const { error } = await supabase
            .from('customers')
            .update({ phone })
            .eq('id', user?.id);
            
        if (error) {
            toast.error("Failed to update phone number.");
        } else {
            toast.success("Phone number updated.");
            setEditingPhone(false);
            fetchProfile();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 py-8 px-2 md:px-0">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div><b>Name:</b> {profile?.name || user?.email?.split('@')[0]}</div>
                            <div><b>Email:</b> {user.email}</div>
                            <div>
                                <b>Phone:</b> {editingPhone ? (
                                    <span className="ml-2">
                                        <Input 
                                            value={phone} 
                                            onChange={e => setPhone(e.target.value)} 
                                            className="inline w-48 mr-2" 
                                            placeholder="01XXXXXXXXX"
                                        />
                                        <Button size="sm" onClick={handlePhoneSave}>Save</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setEditingPhone(false)} className="ml-2">Cancel</Button>
                                    </span>
                                ) : (
                                    <span className="ml-2">
                                        {phone || <span className="text-slate-400">Not set</span>}
                                        <Button size="sm" variant="ghost" onClick={() => setEditingPhone(true)} className="ml-2">Edit</Button>
                                    </span>
                                )}
                            </div>
                            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Current Cart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cartItems.length === 0 ? (
                                <div>Your cart is empty.</div>
                            ) : (
                                <ul className="space-y-2">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="flex justify-between border-b pb-1">
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>{item.price.toLocaleString()} EGP</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {orders.length === 0 ? (
                                <div>No previous orders found.</div>
                            ) : (
                                <ul className="space-y-4">
                                    {orders.map(order => (
                                        <li key={order.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div className="font-semibold">Order #{order.order_number}</div>
                                                    <div className="text-sm text-slate-600">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">{order.total} EGP</div>
                                                    <div className={`text-sm px-2 py-1 rounded ${
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </div>
                                                </div>
                                            </div>
                                            {order.order_items && order.order_items.length > 0 && (
                                                <div className="text-sm text-slate-600">
                                                    Items: {order.order_items.map((item: any) => 
                                                        item.products?.name || 'Unknown Product'
                                                    ).join(', ')}
                                                </div>
                                            )}
                                            <div className="text-sm text-slate-600">
                                                Payment: {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Account;
