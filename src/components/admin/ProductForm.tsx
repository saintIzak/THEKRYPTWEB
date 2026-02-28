import { useState } from 'react';
import { X, Upload, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { supabase } from '../../lib/supabase';

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
}

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: () => void;
}

export default function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || 0,
    image_url: product?.image_url || '',
    description: product?.description || '',
    rating: product?.rating || 4.5,
    in_stock: product?.in_stock ?? true,
    is_tested: product?.is_tested ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([
    product?.image_url,
    ...(product?.images || [])
  ].filter(Boolean) as string[]);

  const categories = [
    'Gaming Consoles',
    'VR Headsets',
    'Audio',
    'Accessories',
    'Wearables',
    'Drones',
  ];

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && imagePreviews.length + files.length <= 3) {
      setImageFiles(prev => [...prev, ...files]);

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload new images if selected
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        setUploading(true);
        imageUrls = await Promise.all(imageFiles.map(file => uploadImage(file)));
        setUploading(false);
      }

      // Combine existing and new images
      const allImages = [...imagePreviews.filter(url => url.startsWith('http')), ...imageUrls];
      imageUrl = allImages[0] || imageUrl;

      const productData = {
        ...formData,
        image_url: imageUrl,
        images: allImages,
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            ...productData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', product.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([{
            ...productData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }]);

        if (error) throw error;
      }

      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-950 border-2 border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative" style={{ clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-zinc-900 bg-zinc-900/50">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
              {product ? 'EDIT ASSET' : 'NEW ACQUISITION'}
            </h2>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Configure asset specifications</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ASSET NAME</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ENTER ASSET NAME"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black uppercase"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CATEGORY</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-10 px-3 bg-zinc-900 border border-zinc-800 text-white text-sm rounded-none focus:outline-none focus:border-red-600 uppercase font-black"
              >
                <option value="">SELECT SECTOR</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ACQUISITION PRICE (KSh)</label>
              <Input
                type="number"
                required
                min="0"
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="0"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">COMBAT RATING (0-5)</label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">VISUAL ASSETS (MAX 3)</label>
            <div className="space-y-4">
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-32 h-32 border-2 border-zinc-800 overflow-hidden group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* File Upload */}
              {imagePreviews.length < 3 && (
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center gap-3 px-6 py-4 bg-zinc-900 border-2 border-dashed border-zinc-800 text-zinc-500 cursor-pointer hover:border-red-600 hover:text-red-600 transition-all font-black uppercase text-[10px] tracking-widest"
                  >
                    <Upload className="h-4 w-4" />
                    UPLOAD ASSET ({imagePreviews.length}/3)
                  </label>
                  {uploading && <span className="text-[10px] font-black text-red-600 uppercase tracking-widest animate-pulse">UPLOADING...</span>}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">INTEL BRIEFING (DESCRIPTION)</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="ENTER TACTICAL SPECIFICATIONS..."
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:outline-none focus:border-red-600 text-sm font-black uppercase"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800">
              <input
                type="checkbox"
                id="in_stock"
                checked={formData.in_stock}
                onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                className="w-4 h-4 bg-zinc-900 border-zinc-800 text-red-600 focus:ring-red-600 rounded-none"
              />
              <label htmlFor="in_stock" className="text-[10px] font-black text-white uppercase tracking-widest">
                OPERATIONAL STATUS (IN STOCK)
              </label>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800">
              <input
                type="checkbox"
                id="is_tested"
                checked={formData.is_tested}
                onChange={(e) => setFormData({ ...formData, is_tested: e.target.checked })}
                className="w-4 h-4 bg-zinc-900 border-zinc-800 text-red-600 focus:ring-red-600 rounded-none"
              />
              <label htmlFor="is_tested" className="text-[10px] font-black text-white uppercase tracking-widest">
                COMBAT TESTED (THEATRE VERIFIED)
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-8 text-base"
            >
              ABORT
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-none py-8 text-base shadow-[0_0_30px_rgba(220,38,38,0.3)] group"
            >
              <span className="group-hover:scale-110 transition-transform flex items-center gap-2">
                {loading ? 'SAVING...' : product ? 'UPDATE ASSET' : 'INITIALIZE ASSET'} <ChevronRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}