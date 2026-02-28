import { useState, useEffect } from 'react';
import { Eye, Package, Truck, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabase';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setUpdatingOrder(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order status:', error);
        alert(`Failed to update order status: ${error.message}`);
        return;
      }

      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      case 'confirmed': return 'bg-red-600/10 text-red-600 border-red-600/20';
      case 'shipped': return 'bg-red-600 text-white border-red-600';
      case 'delivered': return 'bg-zinc-950 text-white border-zinc-800';
      case 'cancelled': return 'bg-zinc-900 text-zinc-600 border-zinc-800';
      default: return 'bg-zinc-900 text-zinc-500 border-zinc-800';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent animate-spin" />
        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">ACCESSING MANIFESTS...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 bg-red-600" />
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">DEPLOYMENT <span className="text-red-600">MANIFESTS</span></h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Monitor and authorize asset deployments</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-zinc-900/30 border border-zinc-800 overflow-hidden" style={{ clipPath: 'polygon(0 0, 99% 0, 100% 1%, 100% 100%, 1% 100%, 0 99%)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">MANIFEST ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">OPERATOR</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">TOTAL VALUE</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">STATUS</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">TIMESTAMP</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-red-600/5 transition-colors group">
                  <td className="px-6 py-4 text-xs font-black text-zinc-400 group-hover:text-red-600 transition-colors">
                    {order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-tighter">{order.customer_name}</div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{order.customer_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-white italic">
                    KSh {order.total_amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 border text-[8px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          fetchOrderItems(order.id);
                        }}
                        className="h-8 w-8 p-0 border-zinc-800 hover:border-red-600 hover:text-red-600"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          disabled={updatingOrder === order.id}
                          className="h-8 w-8 p-0 border-zinc-800 text-red-600 hover:bg-red-600 hover:text-white"
                          title="Confirm Order"
                        >
                          <Package className="h-4 w-4" />
                        </Button>
                      )}
                      {order.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          disabled={updatingOrder === order.id}
                          className="h-8 w-8 p-0 border-zinc-800 text-red-600 hover:bg-red-600 hover:text-white"
                          title="Mark as Shipped"
                        >
                          <Truck className="h-4 w-4" />
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          disabled={updatingOrder === order.id}
                          className="h-8 w-8 p-0 border-zinc-800 text-red-600 hover:bg-red-600 hover:text-white"
                          title="Mark as Delivered"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border-2 border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative" style={{ clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%)' }}>
            <div className="flex items-center justify-between p-8 border-b border-zinc-900 bg-zinc-900/50">
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">MANIFEST <span className="text-red-600">SPECIFICATIONS</span></h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-l-2 border-red-600 pl-3">OPERATOR INTEL</h4>
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 space-y-2">
                    <p className="text-xs font-black text-white uppercase"><span className="text-zinc-600 mr-2">NAME:</span> {selectedOrder.customer_name}</p>
                    <p className="text-xs font-black text-white uppercase"><span className="text-zinc-600 mr-2">EMAIL:</span> {selectedOrder.customer_email}</p>
                    <p className="text-xs font-black text-white uppercase"><span className="text-zinc-600 mr-2">COMMS:</span> {selectedOrder.customer_phone}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-l-2 border-red-600 pl-3">DEPLOYMENT DATA</h4>
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 space-y-2">
                    <p className="text-xs font-black text-white uppercase"><span className="text-zinc-600 mr-2">ID:</span> {selectedOrder.id.toUpperCase()}</p>
                    <p className="text-xs font-black text-white uppercase flex items-center gap-2">
                      <span className="text-zinc-600">STATUS:</span>
                      <span className={`px-2 py-0.5 border text-[8px] font-black ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p className="text-xs font-black text-white uppercase"><span className="text-zinc-600 mr-2">TIMESTAMP:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-l-2 border-red-600 pl-3">SECTOR COORDINATES</h4>
                <div className="bg-zinc-900/50 border border-zinc-800 p-4">
                  <p className="text-xs font-black text-white uppercase leading-relaxed">{selectedOrder.delivery_address}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-l-2 border-red-600 pl-3">ASSET LIST</h4>
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-xs border-b border-zinc-800 pb-4">
                      <span className="font-black text-zinc-400 uppercase tracking-tighter">{item.product_name} <span className="text-red-600 ml-2">x{item.quantity}</span></span>
                      <span className="font-black text-white italic">KSh {item.subtotal.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-4">
                    <span className="text-xl font-black italic uppercase tracking-tighter text-white">TOTAL VALUE</span>
                    <span className="text-xl font-black italic uppercase tracking-tighter text-red-600">KSh {selectedOrder.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}