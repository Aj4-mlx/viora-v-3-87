import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!orderId) return;
        setLoading(true);
        supabase
            .from("orders")
            .select("*")
            .eq("id", orderId)
            .single()
            .then(({ data, error }) => {
                if (error || !data) {
                    setError("Order not found.");
                } else {
                    setOrder(data);
                }
                setLoading(false);
            });
    }, [orderId]);

    let deliveryInfo = null;
    if (order && order.note) {
        try {
            deliveryInfo = JSON.parse(order.note);
        } catch { }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center py-8 px-2 md:px-0">
                <div className="w-full max-w-lg">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Confirmation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-8">Loading order details...</div>
                            ) : error ? (
                                <div className="text-center text-red-600 py-8">{error}</div>
                            ) : (
                                <>
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold mb-2 text-coral-peach">Thank you for your order!</h2>
                                        <div className="text-slate-700 mb-2">Your order has been placed successfully.</div>
                                        <div className="text-slate-500 text-sm">Order ID: <span className="font-mono">{order.id}</span></div>
                                    </div>
                                    <div className="mb-4">
                                        <b>Status:</b> <span className="capitalize">{order.status}</span>
                                    </div>
                                    <div className="mb-4">
                                        <b>Total:</b> {order.total} EGP
                                    </div>
                                    {deliveryInfo && (
                                        <div className="mb-4">
                                            <b>Delivery Info:</b>
                                            <ul className="ml-4 list-disc text-slate-700">
                                                <li>Name: {deliveryInfo.name}</li>
                                                <li>Email: {deliveryInfo.email}</li>
                                                <li>Phone: {deliveryInfo.phone}</li>
                                                <li>Address: {deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.governorate}</li>
                                                <li>Payment: {deliveryInfo.paymentMethod}</li>
                                            </ul>
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <b>Products:</b>
                                        <ul className="ml-4 list-disc text-slate-700">
                                            {order.product_ids && order.product_ids.map((pid: string | number, idx: number) => (
                                                <li key={idx}>Product ID: {pid}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-center mt-8">
                                        <Button onClick={() => navigate('/account')} className="bg-coral-peach hover:bg-coral-peach/80">Go to My Account</Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
