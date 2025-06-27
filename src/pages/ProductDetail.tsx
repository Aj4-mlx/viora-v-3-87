import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Database["public"]["Tables"]["products"]["Row"] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();
            if (error || !data) {
                setError("Product not found.");
                setProduct(null);
            } else {
                setProduct(data);
            }
            setLoading(false);
        };
        if (id) fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-4 text-coral-peach">{error || "Product not found."}</h2>
                <Button onClick={() => navigate(-1)} className="bg-coral-peach text-white">Back to Shop</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center py-12">
                <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-1/2 flex items-center justify-center bg-pale-peach/30 p-8">
                        <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-auto max-h-96 object-contain rounded-lg shadow"
                        />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">{product.name}</h1>
                            <p className="text-coral-peach text-lg font-semibold mb-4">{product.price} EGP</p>
                            <p className="text-slate-600 mb-2"><span className="font-medium">Category:</span> {product.category}</p>
                            {product.description && (
                                <p className="text-slate-700 mb-6 whitespace-pre-line">{product.description}</p>
                            )}
                        </div>
                        <Button
                            size="lg"
                            className="bg-floral-deep-violet hover:bg-floral-violet text-white font-bold text-lg mt-4 transition-colors"
                            onClick={() => addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image_url || '',
                            })}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail; 