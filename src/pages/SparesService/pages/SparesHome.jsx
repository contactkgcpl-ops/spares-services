import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../utils/productUtils';
import useProductFilter from '../hooks/useProductFilter';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import heroGraphic from '../assets/hero-img.jpeg';

const resolveApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:5000`;
  }

  return 'http://localhost:5000';
};

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
});

function SparesHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { categories, category, filteredProducts, query, setCategory, setQuery } = useProductFilter(products);
  const featured = getFeaturedProducts(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/api/products');
        const apiProducts = response.data?.data || [];
        const normalizedProducts = apiProducts.map((product) => ({
          ...product,
          id: product._id || product.id,
          name: product.title || product.name || '',
        }));
        setProducts(normalizedProducts);
      } catch (error) {
        setError(error?.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="about" className="space-y-12 py-16">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-8 sm:p-10 hero-gradient shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-[#f47c20]/10 px-4 py-2 text-sm font-medium text-[#f47c20]">
              Industrial spare parts & service platform
            </span>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Reliable spares, optimized service, better uptime.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                Discover modern replacement parts, preventive maintenance packages, and engineering support built for heavy industry.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/spares-service/products"
                className="rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
              >
                Browse catalog
              </Link>
              <Link
                to="/spares-service/service"
                className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]"
              >
                Learn about services
              </Link>
            </div>
          </div>

          <div className="relative mx-auto max-w-xl h-80">
            <img src={heroGraphic} alt="Industrial equipment illustration" className="h-full w-full rounded-lg border border-slate-200 bg-[#f8fafc] object-contain" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Search parts in one place</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">Use instant search and category filters to locate the spare part you need without delay.</p>
          <div className="mt-6 space-y-6">
            <SearchBar query={query} onChange={setQuery} />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Browse by category</p>
              <div className="mt-4">
                <CategoryFilter categories={categories} selectedCategory={category} onCategoryChange={setCategory} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-[#f47c20]">Current catalog</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{filteredProducts.length} parts matching your selection</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {loading ? (
              <p className="text-sm text-slate-500">Loading products...</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : (
              featured.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
          <h3 className="text-lg font-semibold text-slate-900">Precision sourcing</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Every spare part is selected for fit, durability, and compatibility with industrial equipment.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
          <h3 className="text-lg font-semibold text-slate-900">Fast track support</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Field service, commissioning, and repair available for shutdown windows and urgent replacements.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
          <h3 className="text-lg font-semibold text-slate-900">Connected maintenance</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Track part lifecycle and get service recommendations that reduce downtime and increase reliability.</p>
        </div>
      </div>
    </section>
  );
}

export default SparesHome;
