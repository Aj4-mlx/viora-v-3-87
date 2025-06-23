
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

interface Analytics {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  recentOrders: number;
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch products count and low stock
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('stock');

      // Fetch customers count
      const { count: customersCount, error: customersError } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true });

      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('total, created_at');

      if (productsError || customersError || ordersError) {
        console.error('Error fetching analytics:', { productsError, customersError, ordersError });
        return;
      }

      const totalProducts = products?.length || 0;
      const lowStockProducts = products?.filter(p => p.stock < 10).length || 0;
      const totalCustomers = customersCount || 0;
      const totalOrders = orders?.length || 0;
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
      
      // Recent orders (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentOrders = orders?.filter(order => 
        new Date(order.created_at) > sevenDaysAgo
      ).length || 0;

      setAnalytics({
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue,
        lowStockProducts,
        recentOrders,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyticsCards = [
    {
      title: "Total Products",
      value: analytics.totalProducts,
      description: `${analytics.lowStockProducts} low stock`,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Customers",
      value: analytics.totalCustomers,
      description: "Registered users",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      description: `${analytics.recentOrders} this week`,
      icon: ShoppingCart,
      color: "text-purple-600",
    },
    {
      title: "Total Revenue",
      value: `$${analytics.totalRevenue.toFixed(2)}`,
      description: "All time sales",
      icon: DollarSign,
      color: "text-coral-peach",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Analytics Overview</h3>
        <p className="text-sm text-slate-600">
          Key metrics for your e-commerce business
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-slate-600">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {analytics.lowStockProducts > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Low Stock Alert</CardTitle>
            <CardDescription className="text-amber-700">
              {analytics.lowStockProducts} product(s) have low stock (less than 10 items)
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
