import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Account = () => {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [phone, setPhone] = useState("");
    const [editingPhone, setEditingPhone] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changingPassword, setChangingPassword] = useState(false);
    const { cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const u = JSON.parse(stored);
            setUser(u);
            setPhone(u.phone || "");
            setPassword(u.password || "");
        }
    }, []);

    useEffect(() => {
        if (user) {
            // Fetch orders for this user from Supabase
            supabase
                .from("orders")
                .select("*")
                .eq("customer_id", user.id)
                .order("created_at", { ascending: false })
                .then(({ data }) => {
                    setOrders(data || []);
                });
        }
    }, [user]);

    const handleSignOut = () => {
        localStorage.removeItem("user");
        toast.success("Signed out successfully.");
        navigate("/sign-in");
    };

    const handlePhoneSave = () => {
        if (!/^01[0-9]{9}$/.test(phone)) {
            toast.error("Please enter a valid Egyptian phone number.");
            return;
        }
        setUser((u: any) => {
            const updated = { ...u, phone };
            localStorage.setItem("user", JSON.stringify(updated));
            return updated;
        });
        setEditingPhone(false);
        toast.success("Phone number updated.");
    };

    const handleChangePassword = () => {
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }
        setUser((u: any) => {
            const updated = { ...u, password: newPassword };
            localStorage.setItem("user", JSON.stringify(updated));
            return updated;
        });
        setPassword(newPassword);
        setNewPassword("");
        setChangingPassword(false);
        toast.success("Password changed (demo only).");
        // TODO: Update password in backend if/when supported
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Not Signed In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">Please sign in to view your account.</p>
                            <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        );
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
                            <div><b>Name:</b> {user.name}</div>
                            <div><b>Email:</b> {user.email}</div>
                            <div>
                                <b>Phone:</b> {editingPhone ? (
                                    <span>
                                        <Input value={phone} onChange={e => setPhone(e.target.value)} className="inline w-48 mr-2" />
                                        <Button size="sm" onClick={handlePhoneSave}>Save</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setEditingPhone(false)}>Cancel</Button>
                                    </span>
                                ) : (
                                    <span>
                                        {phone ? phone : <span className="text-slate-400">Not set</span>}
                                        <Button size="sm" variant="ghost" onClick={() => setEditingPhone(true)} className="ml-2">Edit</Button>
                                    </span>
                                )}
                            </div>
                            <div>
                                <b>Password:</b> {changingPassword ? (
                                    <span>
                                        <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="inline w-48 mr-2" placeholder="New password" />
                                        <Button size="sm" onClick={handleChangePassword}>Change</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setChangingPassword(false)}>Cancel</Button>
                                    </span>
                                ) : (
                                    <span>
                                        ****** <Button size="sm" variant="ghost" onClick={() => setChangingPassword(true)} className="ml-2">Change</Button>
                                    </span>
                                )}
                                {/* TODO: Implement real password change with backend */}
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
                            <CardTitle>Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {orders.length === 0 ? (
                                <div>No previous orders found.</div>
                            ) : (
                                <ul className="space-y-4">
                                    {orders.map(order => (
                                        <li key={order.id} className="border-b pb-2">
                                            <div><b>Order ID:</b> {order.id}</div>
                                            <div><b>Status:</b> {order.status}</div>
                                            <div><b>Total:</b> {order.total} EGP</div>
                                            <div><b>Placed:</b> {new Date(order.created_at).toLocaleString()}</div>
                                            <div><b>Products:</b> {order.product_ids?.join(", ")}</div>
                                            {/* TODO: Implement order tracking details if available */}
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