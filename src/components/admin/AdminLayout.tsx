import { ReactNode } from 'react';
import { Settings, Package, BarChart3, Users, LogOut, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';

import logo from '../../assets/images/logo02.jpg';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if signOut fails
      window.location.href = '/';
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-950 border-b border-zinc-800 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-none overflow-hidden shadow-md border border-zinc-800">
                <img src={logo} alt="THE KRYPT Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-black italic tracking-tighter uppercase">THE <span className="text-red-600">KRYPT</span> ADMIN</h1>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Command Center</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-zinc-900 rounded-none font-black uppercase tracking-widest text-[10px]">
              <LogOut className="h-3 w-3 mr-2" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-left transition-colors font-black uppercase tracking-widest text-[10px] ${activeTab === item.id
                    ? 'bg-red-600/10 text-red-600 border-l-2 border-red-600'
                    : 'text-zinc-500 hover:bg-zinc-900'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}