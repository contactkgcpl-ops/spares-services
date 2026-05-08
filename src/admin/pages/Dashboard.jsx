import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { deleteProduct, getProducts } from '../services/productService';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProducts();
        setProducts(data);
      } catch (fetchError) {
        setError(fetchError?.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoriesCount = useMemo(() => {
    const unique = new Set(products.map((item) => item.category).filter(Boolean));
    return unique.size;
  }, [products]);
  const recentCount = useMemo(() => products.filter((item) => item.updatedAt).length, [products]);

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteProduct(deleteTargetId);
      const data = await getProducts();
      setProducts(data);
      setDeleteTargetId('');
    } catch (deleteError) {
      setError(deleteError?.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Dashboard" />
      <div className="p-6 py-16">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
            <p className="text-sm text-slate-600">Total Products</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{products.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
            <p className="text-sm text-slate-600">Total Categories</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{categoriesCount}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
            <p className="text-sm text-slate-600">Records Updated</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{recentCount}</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Products</h2>
            <Link
              to="/admin/add-product"
              className="rounded-lg bg-[#f47c20] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
            >
              Add Product
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-10 text-center text-sm text-slate-500">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-10 text-center text-sm text-slate-500">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#f8fafc]">
                      <td className="px-4 py-3 text-sm text-slate-700">{product.title || product.productName}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{product.category}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/admin/edit-product/${product.id}`}
                            className="rounded-md px-2 py-1 font-medium text-[#f47c20] transition-colors hover:bg-[#f47c20]/10"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteTargetId(product.id)}
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
      <DeleteConfirmModal
        open={Boolean(deleteTargetId)}
        onCancel={() => setDeleteTargetId('')}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
