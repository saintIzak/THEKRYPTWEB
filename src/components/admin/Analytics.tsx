import { useState, useEffect } from 'react';
import { TrendingUp, ShoppingCart, DollarSign, Users, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{
    name: string;
    category: string;
    totalSold: number;
    revenue: number;
  }>;
  ordersByStatus: Array<{
    status: string;
    count: number;
  }>;
  recentOrders: Array<{
    id: string;
    customer_name: string;
    total_amount: number;
    created_at: string;
  }>;
  customerMetrics: {
    totalCustomers: number;
    newCustomers: number;
    repeatCustomers: number;
  };
  topCustomers: Array<{
    name: string;
    email: string;
    totalSpent: number;
    orderCount: number;
  }>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    ordersByStatus: [],
    recentOrders: [],
    customerMetrics: {
      totalCustomers: 0,
      newCustomers: 0,
      repeatCustomers: 0
    },
    topCustomers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*');

      if (ordersError) throw ordersError;

      // Fetch order items for product analytics
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('*');

      if (itemsError) throw itemsError;

      // Calculate analytics
      const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
      const totalOrders = orders?.length || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Orders by status
      const statusCounts = orders?.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count: count as number
      }));

      // Top products
      const productStats = orderItems?.reduce((acc, item) => {
        const key = item.product_name;
        if (!acc[key]) {
          acc[key] = {
            name: item.product_name,
            category: 'Unknown',
            totalSold: 0,
            revenue: 0
          };
        }
        acc[key].totalSold += item.quantity;
        acc[key].revenue += item.subtotal;
        return acc;
      }, {} as Record<string, { name: string; category: string; totalSold: number; revenue: number }>) || {};

      const topProducts = (Object.values(productStats) as { name: string; category: string; totalSold: number; revenue: number }[])
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Recent orders
      const recentOrders = orders
        ?.sort((a: { created_at: string }, b: { created_at: string }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5) || [];

      // Customer analytics
      const customerStats = orders?.reduce((acc, order) => {
        const email = order.customer_email;
        if (!acc[email]) {
          acc[email] = {
            name: order.customer_name,
            email: order.customer_email,
            totalSpent: 0,
            orderCount: 0,
            firstOrder: order.created_at
          };
        }
        acc[email].totalSpent += order.total_amount;
        acc[email].orderCount += 1;
        if (new Date(order.created_at) < new Date(acc[email].firstOrder)) {
          acc[email].firstOrder = order.created_at;
        }
        return acc;
      }, {} as Record<string, { name: string; email: string; totalSpent: number; orderCount: number; firstOrder: string }>) || {};

      const customerList = Object.values(customerStats) as { name: string; email: string; totalSpent: number; orderCount: number; firstOrder: string }[];
      const totalCustomers = customerList.length;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const newCustomers = customerList.filter(
        (customer) => new Date(customer.firstOrder) >= thirtyDaysAgo
      ).length;

      const repeatCustomers = customerList.filter(
        (customer) => customer.orderCount > 1
      ).length;

      const topCustomers = customerList
        .sort((a: { totalSpent: number }, b: { totalSpent: number }) => b.totalSpent - a.totalSpent)
        .slice(0, 5);

      setData({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        topProducts,
        ordersByStatus,
        recentOrders,
        customerMetrics: {
          totalCustomers,
          newCustomers,
          repeatCustomers
        },
        topCustomers
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent animate-spin" />
        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">EXTRACTING COMBAT DATA...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 bg-red-600" />
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">TACTICAL <span className="text-red-600">INTELLIGENCE</span></h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Deep-dive performance metrics and asset flow</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: 'TOTAL REVENUE', value: `KSh ${data.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-red-600' },
          { label: 'TOTAL MANIFESTS', value: data.totalOrders, icon: ShoppingCart, color: 'text-white' },
          { label: 'AVG MANIFEST VALUE', value: `KSh ${Math.round(data.averageOrderValue).toLocaleString()}`, icon: TrendingUp, color: 'text-white' },
          { label: 'TOTAL OPERATORS', value: data.customerMetrics.totalCustomers, icon: Users, color: 'text-white' },
        ].map((metric, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 relative group overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{metric.label}</p>
                <p className={`text-2xl font-black italic tracking-tighter ${metric.color}`}>{metric.value}</p>
              </div>
              <div className="p-3 bg-zinc-950 border border-zinc-800">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Base Section */}
      <div className="bg-zinc-900/30 border border-zinc-800 p-8 relative" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 5%, 100% 100%, 2% 100%, 0 95%)' }}>
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
          <ChevronRight className="h-4 w-4 text-red-600" />
          OPERATOR DEMOGRAPHICS
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center p-6 bg-zinc-950 border border-zinc-800">
            <p className="text-4xl font-black italic text-white tracking-tighter">{data.customerMetrics.totalCustomers}</p>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">TOTAL OPERATORS</p>
          </div>
          <div className="text-center p-6 bg-zinc-950 border border-zinc-800">
            <p className="text-4xl font-black italic text-red-600 tracking-tighter">{data.customerMetrics.newCustomers}</p>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">NEW RECRUITS (30D)</p>
          </div>
          <div className="text-center p-6 bg-zinc-950 border border-zinc-800">
            <p className="text-4xl font-black italic text-white tracking-tighter">{data.customerMetrics.repeatCustomers}</p>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">VETERAN OPERATORS</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Top Products */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 space-y-6">
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">HIGH-VELOCITY ASSETS</h3>
          <div className="space-y-4">
            {data.topProducts.length > 0 ? (
              data.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 group hover:border-red-600/30 transition-colors">
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-tighter group-hover:text-red-600 transition-colors">{product.name}</p>
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{product.totalSold} UNITS DEPLOYED</p>
                  </div>
                  <p className="text-sm font-black italic text-red-600">
                    KSh {product.revenue.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest text-center py-10">NO ASSET DATA RECORDED</p>
            )}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 space-y-6">
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">ELITE OPERATORS</h3>
          <div className="space-y-4">
            {data.topCustomers.length > 0 ? (
              data.topCustomers.map((customer) => (
                <div key={customer.email} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 group hover:border-red-600/30 transition-colors">
                  <div>
                    <p className="text-xs font-black text-white uppercase tracking-tighter group-hover:text-red-600 transition-colors">{customer.name}</p>
                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{customer.orderCount} MISSIONS COMPLETED</p>
                  </div>
                  <p className="text-sm font-black italic text-red-600">
                    KSh {customer.totalSpent.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest text-center py-10">NO OPERATOR DATA RECORDED</p>
            )}
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-8 space-y-6">
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">MANIFEST STATUS FLOW</h3>
          <div className="space-y-4">
            {data.ordersByStatus.map((status) => (
              <div key={status.status} className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rotate-45 ${status.status === 'delivered' ? 'bg-white' :
                    status.status === 'shipped' ? 'bg-red-600' :
                      status.status === 'confirmed' ? 'bg-red-900' :
                        status.status === 'pending' ? 'bg-zinc-700' :
                          'bg-zinc-900'
                    }`} />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{status.status}</span>
                </div>
                <span className="text-xs font-black text-zinc-500">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-zinc-900/30 border border-zinc-800 p-8 space-y-6" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 98%, 98% 100%, 0 100%)' }}>
        <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">RECENT MANIFEST ACTIVITY</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">MANIFEST ID</th>
                <th className="py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">OPERATOR</th>
                <th className="py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">VALUE</th>
                <th className="py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {data.recentOrders.length > 0 ? (
                data.recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-red-600/5 transition-colors">
                    <td className="py-4 text-xs font-black text-zinc-400 group-hover:text-red-600 transition-colors">
                      {order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="py-4 text-xs font-black text-white uppercase tracking-tighter">{order.customer_name}</td>
                    <td className="py-4 text-xs font-black text-red-600 italic">
                      KSh {order.total_amount.toLocaleString()}
                    </td>
                    <td className="py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[10px] font-black text-zinc-700 uppercase tracking-widest">
                    NO RECENT MANIFESTS DETECTED
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}