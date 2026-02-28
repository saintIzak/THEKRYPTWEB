import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Target, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { supabase } from '../../lib/supabase';
import ProductForm from './ProductForm';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  images?: string[];
  description: string;
  rating: number;
  in_stock: boolean;
  is_tested?: boolean;
  created_at: string;
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent animate-spin" />
        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">SCANNING ARSENAL...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1 bg-red-600" />
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">ASSET <span className="text-red-600">INVENTORY</span></h2>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Manage tactical gear and battle equipment</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
        >
          <Plus className="h-4 w-4 mr-2" />
          ADD NEW ASSET
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md group">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600 group-focus-within:text-red-600 transition-colors" />
        <Input
          placeholder="SEARCH THE VAULT..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black uppercase tracking-widest text-xs h-12"
        />
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-zinc-900/30 border border-zinc-800 group hover:border-red-600/50 transition-all overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}>
            <div className="relative h-56 overflow-hidden border-b border-zinc-800">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest ${product.in_stock ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                  {product.in_stock ? 'OPERATIONAL' : 'DEPLETED'}
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black italic uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors">{product.name}</h3>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">{product.category}</p>
              </div>
              <p className="text-2xl font-black italic text-red-600 tracking-tighter">
                KSh {product.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-3">
                {product.is_tested && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-950 border border-zinc-800">
                    <ShieldCheck className="h-3 w-3 text-red-600" />
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">TESTED</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-950 border border-zinc-800">
                  <Target className="h-3 w-3 text-red-600" />
                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">★ {product.rating}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="flex-1 border-zinc-800 hover:border-red-600 hover:text-red-600"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 border-zinc-800 text-zinc-600 hover:text-red-600 hover:border-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={() => {
            fetchProducts();
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}