import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";

interface OrderStatus {
    status: string;
    date: string;
    description: string;
    icon: JSX.Element;
    completed: boolean;
    current: boolean;
}

const OrderTracking = () => {
    const { orderId } = useParams();
    const [orderNumber, setOrderNumber] = useState(orderId || "");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(!!orderId);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // If orderId is provided in URL, fetch the order
    useEffect(() => {
        if (orderId) {
            fetchOrder(orderId);
        }
    }, [orderId]);

    const fetchOrder = async (id: string) => {
        setLoading(true);
        setError("");

        try {
            // Try to fetch by ID first
            let { data, error: fetchError } = await supabase
                .from("orders")
                .select(`
          *,
          order_history(status, created_at),
          customers(name, email)
        `)
                .eq("id", id)
                .single();

            // If not found by ID, try by order_number
            if (fetchError || !data) {
                const { data: orderByNumber, error: numberError } = await supabase
                    .from("orders")
                    .select(`
            *,
            order_history(status, created_at),
            customers(name, email)
          `)
                    .eq("order_number", id)
                    .single();

                if (numberError || !orderByNumber) {
                    throw new Error("Order not found. Please check the order number and try again.");
                }

                data = orderByNumber;
            }

            setOrder(data);
        } catch (err: any) {
            console.error("Error fetching order:", err);
            setError(err.message || "Failed to fetch order details");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) {
            toast.error("Please enter an order number");
            return;
        }
        fetchOrder(orderNumber);
    };

    const getOrderStatusSteps = (order: any): OrderStatus[] => {
        const statusMap: { [key: string]: number } = {
            pending: 0,
            processing: 1,
            confirmed: 2,
            shipped: 3,
            delivered: 4,
            cancelled: -1,
        };

        const currentStatusIndex = statusMap[order.status] || 0;
        const isCancelled = order.status === "cancelled";

        const steps: OrderStatus[] = [
            {
                status: "pending",
                date: new Date(order.created_at).toLocaleDateString(),
                description: "Order received",
                icon: <Clock className="h-6 w-6" />,
                completed: currentStatusIndex > 0 || isCancelled,
                current: currentStatusIndex === 0 && !isCancelled,
            },
            {
                status: "processing",
                date: getStatusDate(order, "processing"),
                description: "Processing order",
                icon: <Package className="h-6 w-6" />,
                completed: currentStatusIndex > 1 || isCancelled,
                current: currentStatusIndex === 1 && !isCancelled,
            },
            {
                status: "confirmed",
                date: getStatusDate(order, "confirmed"),
                description: "Order confirmed",
                icon: <CheckCircle2 className="h-6 w-6" />,
                completed: currentStatusIndex > 2 || isCancelled,
                current: currentStatusIndex === 2 && !isCancelled,
            },
            {
                status: "shipped",
                date: getStatusDate(order, "shipped"),
                description: "Order shipped",
                icon: <Truck className="h-6 w-6" />,
                completed: currentStatusIndex > 3 || isCancelled,
                current: currentStatusIndex === 3 && !isCancelled,
            },
            {
                status: "delivered",
                date: getStatusDate(order, "delivered"),
                description: "Order delivered",
                icon: <CheckCircle2 className="h-6 w-6" />,
                completed: currentStatusIndex > 4 || isCancelled,
                current: currentStatusIndex === 4 && !isCancelled,
            },
        ];

        // Add cancelled status if applicable
        if (isCancelled) {
            steps.push({
                status: "cancelled",
                date: getStatusDate(order, "cancelled"),
                description: "Order cancelled",
                icon: <XCircle className="h-6 w-6" />,
                completed: true,
                current: true,
            });
        }

        return steps;
    };

    const getStatusDate = (order: any, status: string): string => {
        if (!order.order_history || !Array.isArray(order.order_history)) {
            return "";
        }

        const statusEntry = order.order_history.find((h: any) => h.status === status);
        return statusEntry ? new Date(statusEntry.created_at).toLocaleDateString() : "";
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 py-8 px-2 md:px-0">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Tracking</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="orderNumber" className="block text-sm font-medium text-slate-700 mb-1">
                                        Enter your order number
                                    </label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="orderNumber"
                                            value={orderNumber}
                                            onChange={(e) => setOrderNumber(e.target.value)}
                                            placeholder="e.g. V2306-0001123"
                                            className="flex-1"
                                        />
                                        <Button type="submit" className="bg-coral-peach hover:bg-coral-peach/80" disabled={loading}>
                                            {loading ? "Loading..." : "Track"}
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {error && (
                                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            {order && (
                                <div className="mt-8 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Order Information</h3>
                                            <p className="text-sm text-slate-600">Order Number: <span className="font-mono">{order.order_number || order.id}</span></p>
                                            <p className="text-sm text-slate-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                                            <p className="text-sm text-slate-600">Status: <span className="capitalize">{order.status}</span></p>
                                            <p className="text-sm text-slate-600">Total: {order.total} EGP</p>
                                        </div>
                                        {order.tracking_number && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                                                <p className="text-sm text-slate-600">Tracking Number: <span className="font-mono">{order.tracking_number}</span></p>
                                                <p className="text-sm text-slate-600">Shipping Provider: {order.shipping_provider}</p>
                                                {order.estimated_delivery_date && (
                                                    <p className="text-sm text-slate-600">
                                                        Estimated Delivery: {new Date(order.estimated_delivery_date).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold mb-4">Order Status</h3>
                                        <div className="relative">
                                            {/* Progress line */}
                                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>

                                            {/* Status steps */}
                                            <div className="space-y-8 relative">
                                                {getOrderStatusSteps(order).map((step, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${step.current ? 'bg-coral-peach text-white' :
                                                            step.completed ? 'bg-green-500 text-white' :
                                                                'bg-slate-200 text-slate-500'
                                                            }`}>
                                                            {step.icon}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-medium">{step.description}</div>
                                                            <div className="text-sm text-slate-500">
                                                                {step.date || (step.current ? 'Pending' : '')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-8">
                                        <Button
                                            onClick={() => navigate('/account')}
                                            className="bg-coral-peach hover:bg-coral-peach/80"
                                        >
                                            Go to My Account
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderTracking;