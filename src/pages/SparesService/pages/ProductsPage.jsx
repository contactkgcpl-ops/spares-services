import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Package, AlertCircle, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import CategoryFilter from '../components/CategoryFilter';
import useProductFilter from '../hooks/useProductFilter';

const resolveApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost/spares-service/public/api';
};

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
});

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const { categories, category, filteredProducts, query, setCategory, setQuery } = useProductFilter(products);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setQuery(searchParam);
    }
  }, [location.search, setQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        // Add timestamp to query to force bypass of any intermediate caches
        const response = await api.get(`/products?t=${Date.now()}`);
        
        // Handle { success, count, data: [...] } structure
        const apiProducts = Array.isArray(response.data?.data) 
          ? response.data.data 
          : (Array.isArray(response.data) ? response.data : []);

        const normalizedProducts = apiProducts.map((product) => ({
          ...product,
          id: product.id || product._id || '',
          title: product.title || product.productName || product.name || 'Industrial Part',
          name: product.title || product.productName || product.name || 'Industrial Part', // Map both just in case
        }));

        setProducts(normalizedProducts);
      } catch (fetchError) {
        console.error('Fetch products failed:', fetchError);
        setError(fetchError?.response?.data?.message || 'Failed to load products. Check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white overflow-x-hidden mb-0 pb-0">
      {/* Premium Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#081635] to-[#1E3268]">
        {/* Hero Content */}
        <div className="relative z-20 flex w-full items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-10 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-8 py-4 text-sm tracking-wide font-bold text-orange-200 backdrop-blur-sm shadow-lg shadow-orange-500/30"
              >
                <Package className="h-5 w-5 text-orange-300" />
                <span className="text-orange-100">Industrial Product Catalog</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="mb-3 text-3xl font-black tracking-tight text-white sm:text-2xl md:text-3xl leading-tight"
              >
                Premium Industrial
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                  Spares & Components
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                className="mb-8 max-w-3xl text-xs sm:text-sm leading-relaxed text-white/95 font-medium mx-auto"
              >
                Discover our comprehensive catalog of high-quality industrial parts,
                from pumps and valves to motors and controls, engineered for excellence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <div className="relative w-full max-w-lg">
                  <SearchBar query={query} onChange={setQuery} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full bg-[#EEF2F7] pt-6 pb-4 mb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr] items-start">
            {/* Left Sidebar */}
            <div className="sticky top-24 h-fit self-start">
              <FilterSidebar
                categories={categories}
                selectedCategory={category}
                onCategoryChange={setCategory}
                resultCount={filteredProducts.length}
              />
            </div>

            {/* Right Content Area */}
            <div className="space-y-8">
              {/* Search and Filter Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Available Products</h2>
                    <p className="mt-0.5 text-[11px] text-slate-600">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <CategoryFilter categories={categories} selectedCategory={category} onCategoryChange={setCategory} />
                  </div>
                </div>
              </motion.div>

              {/* Products Grid or Empty State */}
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="rounded-xl bg-white p-10 text-center shadow-sm border border-gray-100"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                    {loading ? (
                      <RefreshCw className="h-8 w-8 text-orange-500 animate-spin" />
                    ) : error ? (
                      <AlertCircle className="h-8 w-8 text-orange-500" />
                    ) : (
                      <Search className="h-8 w-8 text-orange-500" />
                    )}
                  </div>

                  {loading ? (
                    <>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Loading Products</h3>
                      <p className="text-xs text-slate-600 mb-6">Please wait while we fetch the latest catalog...</p>
                    </>
                  ) : error ? (
                    <>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Products</h3>
                      <p className="text-xs text-slate-600 mb-6">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h3>
                      <p className="text-xs text-slate-600 mb-6">Try adjusting your filters or browse different categories.</p>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                    >
                      <ProductCard key={product.id} product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
