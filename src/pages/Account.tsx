
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Eye, RefreshCw, Truck } from "lucide-react";

const Account = () => {
    const { user, signOut, loading } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [isReordering, setIsReordering] = useState(false);
    const { cartItems, addToCart, clearCart } = useCart();
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
            setName(profile.name || "");
        }
    };

    const fetchOrders = async () => {
        if (!user) return;

        const { data: orders } = await supabase
            .from("orders")
            .select("*")
            .eq("customer_id", user.id)
            .order("created_at", { ascending: false });

        if (orders) setOrders(orders);
    };

    const handleSignOut = async () => {
        await signOut();
        toast.success("Signed out successfully.");
        navigate("/");
    };

    const handleNameSave = async () => {
        if (!name.trim()) {
            toast.error("Please enter a valid name.");
            return;
        }

        const { error } = await supabase
            .from('customers')
            .update({ name })
            .eq('id', user?.id);

        if (error) {
            toast.error("Failed to update name.");
        } else {
            toast.success("Name updated.");
            setEditingName(false);
            fetchProfile();
        }
    };

    const handlePasswordChange = async () => {
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                toast.error(error.message || "Failed to update password");
                return;
            }

            toast.success("Password updated successfully");
            setPassword("");
            setConfirmPassword("");
            setChangingPassword(false);
        } catch (err) {
            console.error("Error updating password:", err);
            toast.error("An error occurred while updating your password");
        }
    };

    const handleReorder = async (orderId: string) => {
        try {
            setIsReordering(true);

            // Get order by ID to access product_ids
            const { data: order } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();

            if (!order || !order.product_ids || order.product_ids.length === 0) {
                toast.error("No items found in this order");
                setIsReordering(false);
                return;
            }

            // Get products for this order
            const { data: products } = await supabase
                .from('products')
                .select('*')
                .in('id', order.product_ids);

            if (!products || products.length === 0) {
                toast.error("Products from this order are no longer available");
                setIsReordering(false);
                return;
            }

            // Clear current cart
            clearCart();

            // Add items to cart if they're still available
            let unavailableItems = [];
            for (const product of products) {
                if (product.stock > 0) {
                    addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image_url,
                        quantity: 1
                    });
                } else {
                    unavailableItems.push(product.name);
                }
            }

            if (unavailableItems.length > 0) {
                toast.warning(`Some items are no longer available: ${unavailableItems.join(', ')}`);
            }

            toast.success("Items added to cart");
            navigate('/cart');
        } catch (err) {
            console.error("Error reordering:", err);
            toast.error("Failed to reorder. Please try again.");
        } finally {
            setIsReordering(false);
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
        return null;
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
                            <div>
                                <b>Name:</b> {editingName ? (
                                    <span className="ml-2">
                                        <Input
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="inline w-48 mr-2"
                                            placeholder="Enter your name"
                                        />
                                        <Button size="sm" onClick={handleNameSave}>Save</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setEditingName(false)} className="ml-2">Cancel</Button>
                                    </span>
                                ) : (
                                    <span className="ml-2">
                                        {profile?.name || <span className="text-slate-400">Not set</span>}
                                        <Button size="sm" variant="ghost" onClick={() => setEditingName(true)} className="ml-2">Edit</Button>
                                    </span>
                                )}
                            </div>
                            <div><b>Email:</b> {user.email}</div>
                            
                            <div className="mt-4">
                                {changingPassword ? (
                                    <div className="space-y-3 border p-3 rounded-md">
                                        <h3 className="font-medium">Change Password</h3>
                                        <div>
                                            <label className="text-sm text-slate-600">New Password</label>
                                            <div className="relative">
                                                <Input 
                                                    type={showPassword ? "text" : "password"}
                                                    value={password} 
                                                    onChange={e => setPassword(e.target.value)} 
                                                    placeholder="Enter new password"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {password && password.length < 6 && (
                                                <p className="text-xs text-red-500 mt-1">Password must be at least 6 characters</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm text-slate-600">Confirm Password</label>
                                            <Input 
                                                type="password"
                                                value={confirmPassword} 
                                                onChange={e => setConfirmPassword(e.target.value)} 
                                                placeholder="Confirm new password"
                                            />
                                            {confirmPassword && password !== confirmPassword && (
                                                <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button size="sm" onClick={handlePasswordChange}>Update Password</Button>
                                            <Button size="sm" variant="ghost" onClick={() => {
                                                setChangingPassword(false);
                                                setPassword("");
                                                setConfirmPassword("");
                                            }}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button variant="outline" onClick={() => setChangingPassword(true)}>Change Password</Button>
                                )}
                            </div>
                            
                            <div className="mt-4">
                                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
                            </div>
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
                                                    <div className="font-semibold">Order #{order.id.slice(0, 8)}</div>
                                                    <div className="text-sm text-slate-600">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">{order.total} EGP</div>
                                                    <div className={`text-sm px-2 py-1 rounded ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                Items: {order.product_ids ? order.product_ids.length : 0} products
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="flex items-center"
                                                    onClick={() => navigate(`/order-tracking/${order.id}`)}
                                                >
                                                    <Truck className="h-3 w-3 mr-1" />
                                                    Track Order
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="flex items-center"
                                                    onClick={() => handleReorder(order.id)}
                                                    disabled={isReordering}
                                                >
                                                    <RefreshCw className="h-3 w-3 mr-1" />
                                                    {isReordering ? 'Processing...' : 'Reorder'}
                                                </Button>
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
