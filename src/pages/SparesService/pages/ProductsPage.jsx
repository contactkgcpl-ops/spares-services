import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Package, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import CategoryFilter from '../components/CategoryFilter';
import useProductFilter from '../hooks/useProductFilter';
import { buildApiUrl, resolveImageUrl } from '../../../config/api';

const PRODUCTS_PER_PAGE = 12;

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { categories, category, filteredProducts, query, setCategory, setQuery } = useProductFilter(products);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    if (searchParam) {
      setQuery(searchParam);
    }
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [location.search, setQuery, setCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const cacheBust = Date.now();
        const requestPath = `products?t=${cacheBust}`;
        const requestUrl = buildApiUrl(requestPath);

        const response = await axios.get(requestUrl, {
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });

        if (response.data && response.data.success === false) {
          throw new Error(response.data.message || 'Unable to load products');
        }

        // Handle { success, count, data: [...] } structure
        const apiProducts = Array.isArray(response.data?.data)
          ? response.data.data
          : (Array.isArray(response.data) ? response.data : []);

        if (!Array.isArray(apiProducts)) {
          throw new Error('Invalid API response format');
        }

        const normalizedProducts = apiProducts
          .filter(product => product && product.id)
          .map((product) => ({
            ...product,
            id: String(product.id || product._id).trim(),
            title: String(product.title || product.productName || product.name || 'Industrial Part').trim(),
            name: String(product.title || product.productName || product.name || 'Industrial Part').trim(),
            image: resolveImageUrl(product.image),
            category: String(product.category || 'Industrial').trim(),
          }));

        if (normalizedProducts.length === 0) {
          console.warn('No valid products found in API response');
        }

        setProducts(normalizedProducts);
      } catch (fetchError) {
        console.error('Fetch products failed:', fetchError);
        setError(
          fetchError?.response?.data?.message ||
            fetchError?.message ||
            'Failed to load products. Check console for details.'
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, query]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="w-full bg-white overflow-x-hidden mb-0 pb-0">
      {/* Premium Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#081635] to-[#1E3268]">
        {/* Hero Content */}
        <div className="relative z-20 flex w-full items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 md:py-10">
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
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-3 text-xs tracking-wide font-bold text-orange-200 backdrop-blur-sm shadow-lg shadow-orange-500/30"
              >
                <Package className="h-4 w-4 text-orange-300" />
                <span className="text-orange-100">Industrial Product Catalog</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                className="mb-2 text-[1.9rem] font-black tracking-tight text-white sm:text-[2rem] md:text-[2.35rem] leading-tight"
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
                className="mb-6 max-w-2xl text-[13px] sm:text-sm leading-relaxed text-white/95 font-medium mx-auto"
              >
                Discover our comprehensive catalog of high-quality industrial parts,
                from pumps and valves to motors and controls, engineered for excellence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
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
      <div className="w-full bg-[#EEF2F7] pt-5 pb-3 mb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-5 lg:grid-cols-[250px_1fr] items-start">
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
            <div className="space-y-6">
              {/* Search and Filter Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900">Available Products</h2>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                      {totalPages > 1 && (
                        <span className="text-slate-400 ml-1">
                          · Page {currentPage} of {totalPages}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <CategoryFilter categories={categories} selectedCategory={category} onCategoryChange={setCategory} />
                  </div>
                </div>
              </motion.div>

              {/* Products Grid or Empty State */}
              {paginatedProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="rounded-xl bg-white p-8 text-center shadow-sm border border-gray-100"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-5">
                    {loading ? (
                      <RefreshCw className="h-7 w-7 text-orange-500 animate-spin" />
                    ) : error ? (
                      <AlertCircle className="h-7 w-7 text-orange-500" />
                    ) : (
                      <Search className="h-7 w-7 text-orange-500" />
                    )}
                  </div>

                  {loading ? (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Loading Products</h3>
                      <p className="text-xs text-slate-600 mb-6">Please wait while we fetch the latest catalog...</p>
                    </>
                  ) : error ? (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Unable to Load Products</h3>
                      <p className="text-xs text-slate-600 mb-6">{error}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-[11px] font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Try Again
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">No Products Found</h3>
                      <p className="text-xs text-slate-600 mb-6">Try adjusting your filters or browse different categories.</p>
                    </>
                  )}
                </motion.div>
              ) : (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentPage}-${category}-${query}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 md:gap-5"
                    >
                      {paginatedProducts.map((product, index) => (
                        <motion.div
                          key={`product-${product.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                        >
                          <ProductCard key={`card-${product.id}`} product={product} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* ─── Pagination Controls ─── */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                      className="flex items-center justify-center gap-2 pt-4 pb-2"
                    >
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-bold transition-all duration-300 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 hover:-translate-y-0.5 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Previous</span>
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1.5">
                        {getPageNumbers().map((page, index) =>
                          page === '...' ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="flex items-center justify-center w-9 h-9 text-xs font-bold text-slate-400"
                            >
                              ···
                            </span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`flex items-center justify-center w-9 h-9 rounded-xl text-[12px] font-bold transition-all duration-300 ${
                                currentPage === page
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 hover:-translate-y-0.5'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[12px] font-bold transition-all duration-300 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 hover:-translate-y-0.5 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  )}

                  {/* Page Info */}
                  {totalPages > 1 && (
                    <div className="text-center pb-2">
                      <p className="text-[11px] text-slate-400 font-medium">
                        Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
