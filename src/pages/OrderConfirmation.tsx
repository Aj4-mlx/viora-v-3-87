import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
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
    if (order && order.shipping_address) {
        try {
            deliveryInfo = JSON.parse(order.shipping_address);
        } catch (e) {
            console.error("Error parsing shipping address:", e);
        }
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
                                        <div className="text-slate-500 text-sm">Order Number: <span className="font-mono">{order.order_number || order.id}</span></div>
                                    </div>
                                    <div className="mb-4">
                                        <b>Status:</b> <span className="capitalize">{order.status}</span>
                                    </div>
                                    <div className="mb-4">
                                        <b>Payment Status:</b> <span className="capitalize">{order.payment_status}</span>
                                    </div>
                                    <div className="mb-4">
                                        <b>Payment Method:</b> <span className="capitalize">
                                            {order.payment_method === 'cod' ? 'Cash on Delivery' :
                                                order.payment_method === 'card' ? 'Credit/Debit Card' :
                                                    order.payment_method === 'instapay' ? 'Instapay' :
                                                        order.payment_method === 'vodafone' ? 'Vodafone Cash' :
                                                            order.payment_method === 'fawry' ? 'Fawry' : order.payment_method}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <b>Total:</b> {order.total} EGP
                                    </div>

                                    {/* Payment instructions for non-COD methods */}
                                    {order.payment_method === 'instapay' && (
                                        <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                                            <h3 className="font-bold text-blue-800 mb-2">Instapay Payment Instructions</h3>
                                            <p className="text-blue-700 mb-2">Please complete your payment within 24 hours to avoid order cancellation.</p>
                                            <ol className="list-decimal ml-5 text-blue-700">
                                                <li>Open your Instapay app</li>
                                                <li>Select "Pay Merchant"</li>
                                                <li>Enter merchant code: VIORA2023</li>
                                                <li>Enter the exact amount: {order.total} EGP</li>
                                                <li>In the reference field, enter your order number: {order.order_number}</li>
                                                <li>Complete the payment</li>
                                            </ol>
                                            <p className="mt-2 text-blue-700">We'll update your order status once payment is confirmed.</p>
                                        </div>
                                    )}

                                    {order.payment_method === 'vodafone' && (
                                        <div className="mb-6 p-4 bg-red-50 rounded-md border border-red-200">
                                            <h3 className="font-bold text-red-800 mb-2">Vodafone Cash Payment Instructions</h3>
                                            <p className="text-red-700 mb-2">Please complete your payment within 24 hours to avoid order cancellation.</p>
                                            <ol className="list-decimal ml-5 text-red-700">
                                                <li>Dial *9# on your Vodafone line</li>
                                                <li>Select "Pay Merchant"</li>
                                                <li>Enter merchant number: 01XXXXXXXXX</li>
                                                <li>Enter the exact amount: {order.total} EGP</li>
                                                <li>Use your order number as reference: {order.order_number}</li>
                                            </ol>
                                            <p className="mt-2 text-red-700">We'll update your order status once payment is confirmed.</p>
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <b>Shipping Provider:</b> {order.shipping_provider || "Standard Shipping"}
                                    </div>

                                    <div className="mb-4">
                                        <b>Shipping Cost:</b> {order.shipping_cost || 0} EGP
                                    </div>

                                    <div className="mb-4">
                                        <b>Estimated Delivery:</b> {order.estimated_delivery_date ?
                                            new Date(order.estimated_delivery_date).toLocaleDateString() :
                                            "5-7 business days"}
                                    </div>

                                    {deliveryInfo && (
                                        <div className="mb-4">
                                            <b>Delivery Info:</b>
                                            <ul className="ml-4 list-disc text-slate-700">
                                                <li>Name: {deliveryInfo.name}</li>
                                                <li>Email: {deliveryInfo.email}</li>
                                                <li>Phone: {deliveryInfo.phone}</li>
                                                <li>Address: {deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.governorate}</li>
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