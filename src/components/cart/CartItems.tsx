
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const CartItems = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Items ({cartItems.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <p className="text-slate-600">{item.price.toLocaleString()} EGP</p>
                <p className="text-sm text-slate-500">
                  Subtotal: {(item.price * item.quantity).toLocaleString()} EGP
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
