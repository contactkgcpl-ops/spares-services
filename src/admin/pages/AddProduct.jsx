import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addProduct, CATEGORY_OPTIONS } from '../services/productService';

const initialForm = {
  productName: '',
  description: '',
  image: '',
  category: '',
  technicalDetails: '',
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');
  const [imageSource, setImageSource] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.productName || !formData.description || !formData.category || !formData.technicalDetails || !formData.image) {
      setError('Please fill all fields including image.');
      return;
    }

    addProduct(formData);
    navigate('/admin/products', { state: { message: 'Product added successfully' } });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header title="Add Product" />
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-[#F47C20]"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-[#F47C20]"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-[#F47C20]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-[#F47C20] file:px-3 file:py-2 file:text-white"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-[#F47C20]"
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
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-white outline-none focus:border-[#F47C20]"
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}
          {formData.image && (
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="mb-2 text-xs text-slate-400">
                Image Preview ({imageSource === 'file' ? 'Uploaded File' : 'URL'})
              </p>
              <img src={formData.image} alt="Product preview" className="h-36 w-36 rounded-md object-cover" />
            </div>
          )}

          <button
            type="submit"
            className="rounded-lg bg-[#F47C20] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#F47C20]/20"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
