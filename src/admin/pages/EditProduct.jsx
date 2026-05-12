import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { CATEGORY_OPTIONS, getProductById, updateProduct, uploadImage } from '../services/productService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    image: '',
    category: '',
    technicalDetails: '',
    features: '',
    slug: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const foundProduct = await getProductById(id);

        setFormData({
          productName: foundProduct.productName || foundProduct.title || '',
          description: foundProduct.description || '',
          image: foundProduct.image || '',
          category: foundProduct.category || '',
          technicalDetails: foundProduct.specifications || foundProduct.technicalDetails || '',
          features: foundProduct.features || '',
          slug: foundProduct.slug || '',
        });
        
        if (foundProduct.image) {
          setImageSource(foundProduct.image.startsWith('data:image') ? 'file' : 'url');
        }
      } catch (fetchError) {
        if (fetchError?.response?.status === 404) {
          navigate('/admin/products', { replace: true });
          return;
        }
        setError(fetchError?.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'image') {
      setImageSource('url');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setImageSource('file');
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.productName || !formData.description || !formData.category || (!formData.image && !selectedFile)) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      let imagePath = formData.image;

      // If new file is selected, upload it first
      if (selectedFile && imageSource === 'file') {
        console.log('Uploading new image:', selectedFile.name);
        imagePath = await uploadImage(selectedFile, formData.productName);
        console.log('New image uploaded successfully:', imagePath);
      } else if (imageSource === 'url') {
        // Use the URL from the input field
        imagePath = formData.image;
      }
      // If no new file and not URL, keep existing image path

      // Update product with image path
      const productData = {
        ...formData,
        image: imagePath,
      };

      await updateProduct(id, productData);
      navigate('/admin/products', { state: { message: 'Product updated successfully' } });
    } catch (submitError) {
      setError(submitError?.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Edit Product" />
      <div className="p-6 py-16">
        {loading ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-[#f8fafc] p-6 text-sm text-slate-500 shadow-sm">
            Loading product data...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4 rounded-xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Product Name</label>
                <input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="e.g. Industrial Water Pump"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the product"
                rows="3"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Image Management</label>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="image"
                  value={formData.image.startsWith('data:') ? 'Base64 Data (New Upload)' : formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
                  readOnly={formData.image.startsWith('data:')}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#f47c20] file:px-3 file:py-1 file:text-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Features</label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="One per line or comma separated"
                  rows="4"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Details</label>
                <textarea
                  name="technicalDetails"
                  value={formData.technicalDetails}
                  onChange={handleChange}
                  placeholder="Label: Value format (one per line)"
                  rows="4"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            
            {formData.image && (
              <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-center gap-4">
                <img src={formData.image} alt="Preview" className="h-20 w-20 rounded-lg object-contain bg-slate-50" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview</p>
                  <p className="text-[11px] text-slate-500">{imageSource === 'file' ? 'New Image Selected' : 'Current Saved Image'}</p>
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-[#f47c20] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#dc6e19] disabled:opacity-50"
              >
                {saving ? 'Updating Product...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
