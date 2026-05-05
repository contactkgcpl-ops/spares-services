import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CATEGORY_OPTIONS, deleteProduct, getProducts } from '../services/productService';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState(getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const sortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const nameMatch = product.productName.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      return nameMatch && categoryMatch;
    });
    return filtered.sort((a, b) => a.productName.localeCompare(b.productName));
  }, [products, searchTerm, selectedCategory]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Are you sure?');
    if (!shouldDelete) {
      return;
    }

    deleteProduct(id);
    setProducts(getProducts());
    setMessage('Product deleted');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header title="Products" />
      <div className="p-6">
        {message && (
          <div className="mb-4 rounded-lg border border-emerald-600/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {message}
          </div>
        )}
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product name"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none transition-colors focus:border-[#F47C20]"
          />
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none transition-colors focus:border-[#F47C20]"
          >
            <option value="">All Categories</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedProducts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-10 text-center">
                    <div className="mx-auto max-w-sm rounded-lg border border-dashed border-slate-700 bg-slate-950/60 p-6">
                      <p className="text-base font-medium text-slate-200">No products found</p>
                      <p className="mt-1 text-sm text-slate-400">Try changing search/filter or add a new product.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedProducts.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-slate-800/40">
                    <td className="px-4 py-3 text-sm text-white">{product.productName}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{product.category}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="rounded-md px-2 py-1 font-medium text-[#F47C20] transition-colors hover:bg-[#F47C20]/10"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-md px-2 py-1 font-medium text-red-400 transition-colors hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
