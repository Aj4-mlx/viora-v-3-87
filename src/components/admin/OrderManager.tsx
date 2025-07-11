import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Order {
  id: string;
  customer_id: string;
  total: number;
  status: string;
  created_at: string;
  customers: {
    name: string;
    email: string;
  };
  order_items: {
    id: string;
    product_id: string;
    quantity: number;
    price_at_order: number;
  }[];
}

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (
            name,
            email
          ),
          order_items (
            id,
            product_id,
            quantity,
            price_at_order
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order status:', error);
        toast.error('Failed to update order status');
        return;
      }

      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return "secondary";
      case 'shipped': return "default";
      case 'delivered': return "default";
      case 'cancelled': return "destructive";
      default: return "secondary";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case 'shipped': return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'delivered': return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'cancelled': return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading orders...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>
          View and manage customer orders ({orders.length} orders)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customers.name}</div>
                        <div className="text-sm text-slate-500">{order.customers.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.order_items.length} items
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32 bg-white text-foreground border-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-input shadow-lg z-50">
                          <SelectItem value="pending" className="hover:bg-accent hover:text-accent-foreground">Pending</SelectItem>
                          <SelectItem value="shipped" className="hover:bg-accent hover:text-accent-foreground">Shipped</SelectItem>
                          <SelectItem value="delivered" className="hover:bg-accent hover:text-accent-foreground">Delivered</SelectItem>
                          <SelectItem value="cancelled" className="hover:bg-accent hover:text-accent-foreground">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderManager;
