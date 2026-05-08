import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { CATEGORY_OPTIONS, getProductById, updateProduct } from '../services/productService';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    image: '',
    category: '',
    technicalDetails: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const foundProduct = await getProductById(id);

        setFormData({
          productName: foundProduct.productName || '',
          description: foundProduct.description || '',
          image: foundProduct.image || '',
          category: foundProduct.category || '',
          technicalDetails: foundProduct.technicalDetails || '',
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

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setImageSource('file');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.productName || !formData.description || !formData.category || !formData.technicalDetails || !formData.image) {
      setError('Please fill all fields including image.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await updateProduct(id, formData);
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
            Loading product...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4 rounded-xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
            <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
              required
            />
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-[#f47c20] file:px-3 file:py-2 file:text-white"
            />
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
            <textarea
              name="technicalDetails"
              value={formData.technicalDetails}
              onChange={handleChange}
              placeholder="Technical Details"
              rows="4"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none focus:border-[#f47c20]"
              required
            />

            {error && <p className="text-sm text-red-400">{error}</p>}
            {formData.image && (
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="mb-2 text-xs text-slate-400">
                  Image Preview ({imageSource === 'file' ? 'Uploaded File' : 'URL'})
                </p>
                <img src={formData.image} alt="Product preview" className="h-36 w-36 rounded-lg object-cover" />
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
            >
              {saving ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
