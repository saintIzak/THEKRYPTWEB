import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';

import { products as sampleProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase error, falling back to sample data:', error);
        setProducts(sampleProducts);
        return;
      }

      if (!data || data.length === 0) {
        console.log('No products found in Supabase, using sample data');
        setProducts(sampleProducts);
        return;
      }

      // Transform data to match Product interface
      const transformedProducts: Product[] = data.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: Number(item.price),
        image: item.image_url,
        images: item.images || [],
        description: item.description,
        rating: Number(item.rating),
        inStock: item.in_stock,
        isTested: item.is_tested || false,
      }));

      console.log('Transformed products:', transformedProducts);

      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      // Fallback to sample products on error
      setProducts(sampleProducts);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}