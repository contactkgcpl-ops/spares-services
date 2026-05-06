import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import { getProducts } from '../services/productService';

const Dashboard = () => {
  const [products, setProducts] = useState(getProducts());

  useEffect(() => {
    setProducts(getProducts());
    const onStorageChange = () => setProducts(getProducts());
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  const categoriesCount = useMemo(() => {
    const unique = new Set(products.map((item) => item.category).filter(Boolean));
    return unique.size;
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      <Header title="Dashboard" />
      <div className="p-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
            <p className="text-sm text-slate-600">Total Products</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{products.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
            <p className="text-sm text-slate-600">Total Categories</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{categoriesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
