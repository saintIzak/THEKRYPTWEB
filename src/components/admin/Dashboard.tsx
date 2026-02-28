import { useState, useEffect } from 'react';
import { Package, TrendingUp, Users, Zap, Target, Shield, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  averageRating: number;
}

interface DashboardProps {
  onNavigate?: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('in_stock, rating');

      if (error) throw error;

      const totalProducts = products?.length || 0;
      const inStockProducts = products?.filter(p => p.in_stock).length || 0;
      const outOfStockProducts = totalProducts - inStockProducts;
      const averageRating = products?.length
        ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
        : 0;

      setStats({
        totalProducts,
        inStockProducts,
        outOfStockProducts,
        averageRating: Math.round(averageRating * 10) / 10,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'TOTAL ASSETS',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-white',
      borderColor: 'border-zinc-800'
    },
    {
      title: 'OPERATIONAL',
      value: stats.inStockProducts,
      icon: Zap,
      color: 'text-red-600',
      borderColor: 'border-red-600/20'
    },
    {
      title: 'DEPLETED',
      value: stats.outOfStockProducts,
      icon: Shield,
      color: 'text-zinc-600',
      borderColor: 'border-zinc-800'
    },
    {
      title: 'COMBAT RATING',
      value: stats.averageRating,
      icon: Target,
      color: 'text-white',
      borderColor: 'border-zinc-800'
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent animate-spin" />
        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">INITIALIZING COMMAND CENTER...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-1 bg-red-600" />
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">COMMAND <span className="text-red-600">OVERVIEW</span></h2>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Real-time tactical intelligence</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`bg-zinc-900/50 border ${stat.borderColor} p-6 relative group overflow-hidden`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="h-24 w-24 text-white" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{stat.title}</p>
                  <p className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`p-3 bg-zinc-950 border border-zinc-800`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900/30 border border-zinc-800 p-8 relative" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 5%, 100% 100%, 2% 100%, 0 95%)' }}>
        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
          <ChevronRight className="h-4 w-4 text-red-600" />
          RAPID DEPLOYMENT ACTIONS
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div
            className="p-6 bg-zinc-950 border border-zinc-800 hover:border-red-600 transition-all cursor-pointer group"
            onClick={() => onNavigate?.('products')}
          >
            <Package className="h-8 w-8 text-zinc-600 group-hover:text-red-600 mb-4 transition-colors" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest group-hover:text-red-600 transition-colors">ADD NEW ASSET</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Expand the arsenal with new tactical gear.</p>
          </div>
          <div
            className="p-6 bg-zinc-950 border border-zinc-800 hover:border-red-600 transition-all cursor-pointer group"
            onClick={() => onNavigate?.('analytics')}
          >
            <TrendingUp className="h-8 w-8 text-zinc-600 group-hover:text-red-600 mb-4 transition-colors" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest group-hover:text-red-600 transition-colors">INTEL ANALYTICS</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Analyze combat performance and data.</p>
          </div>
          <div
            className="p-6 bg-zinc-950 border border-zinc-800 hover:border-red-600 transition-all cursor-pointer group"
            onClick={() => onNavigate?.('orders')}
          >
            <Users className="h-8 w-8 text-zinc-600 group-hover:text-red-600 mb-4 transition-colors" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest group-hover:text-red-600 transition-colors">MANIFEST CONTROL</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Process and authorize tactical deployments.</p>
          </div>
        </div>
      </div>
    </div>
  );
}