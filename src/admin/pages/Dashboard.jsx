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
    <div className="min-h-screen bg-slate-950">
      <Header title="Dashboard" />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Total Categories</p>
            <p className="mt-2 text-3xl font-bold text-white">{categoriesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
