import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import TechnicalSpecs from '../components/TechnicalSpecs';
import { API_BASE_URL, resolveImageUrl } from '../../../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const mapSpecs = (specifications = []) =>
  (Array.isArray(specifications) ? specifications : [])
    .map((line) => line?.toString().trim())
    .filter(Boolean)
    .map((line, index) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        return {
          label: line.slice(0, colonIndex).trim(),
          value: line.slice(colonIndex + 1).trim(),
        };
      }

      return {
        label: `Spec ${index + 1}`,
        value: line,
      };
    });

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        setNotFound(false);
        const response = await api.get(`/products/${id}`);
        const apiProduct = response.data?.data;
        if (!apiProduct) {
          setNotFound(true);
          return;
        }

        setProduct({
          ...apiProduct,
          id: apiProduct._id || apiProduct.id,
          name: apiProduct.title || apiProduct.name || '',
          image: resolveImageUrl(apiProduct.image),
          features: Array.isArray(apiProduct.features) ? apiProduct.features : [],
          specifications: Array.isArray(apiProduct.specifications) ? apiProduct.specifications : [],
        });
      } catch (fetchError) {
        if (fetchError?.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(fetchError?.response?.data?.message || 'Failed to load product details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const productTitle = product?.title || product?.name;
  const productSpecifications = mapSpecs(product?.specifications || []);

  const handleWhatsAppQuote = () => {
    const message = `Hello, I want a quote for ${productTitle}${product.category ? ` (${product.category})` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919898727796?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] flex items-center justify-center p-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm max-w-md w-full">
          <div className="w-11 h-11 border-4 border-[#0F1E4A]/20 border-t-[#0F1E4A] rounded-full animate-spin mx-auto mb-5"></div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F1E4A]">Loading details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] flex items-center justify-center p-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm max-w-md w-full">
          <h1 className="text-xl font-bold tracking-tight text-[#0F1E4A] mb-3">Unable to load product</h1>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <Link
            to="/spares-service/products"
            className="inline-flex rounded-xl bg-[#0F1E4A] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#162B68] hover:-translate-y-1"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-[#EEF2F7] flex items-center justify-center p-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm max-w-md w-full">
          <h1 className="text-xl font-bold tracking-tight text-[#0F1E4A] mb-3">Product not found</h1>
          <p className="text-sm text-slate-500 mb-6">Please return to the product list and select another item.</p>
          <Link
            to="/spares-service/products"
            className="inline-flex rounded-xl bg-[#0F1E4A] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#162B68] hover:-translate-y-1"
          >
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#EEF2F7]">
      <div className="max-w-7xl mx-auto px-6 py-5 md:py-6 space-y-5">

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-6 bg-white rounded-2xl p-5 md:p-6 shadow-sm">

          {/* Left: Product Image */}
          <div className="flex items-center justify-center rounded-xl bg-[#EEF2F7]/50 p-4 md:p-5">
            <img
              src={product.image}
              alt={productTitle}
              className="max-h-[430px] w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-center space-y-5">
            <div className="space-y-2.5">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#FF7A1A]">
                {product.category || 'Industrial Component'}
              </p>
              <h1 className="text-2xl md:text-[2.1rem] font-extrabold text-[#0F1E4A] leading-tight tracking-tight">
                {productTitle}
              </h1>
            </div>

            <p className="text-sm md:text-base text-slate-500 leading-7 font-medium">
              {product.description}
            </p>

            {/* Quick Badges */}
            <div className="flex items-center gap-4 md:gap-6 py-3 border-y border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-[13px] md:text-[14px] font-bold text-[#0F1E4A]">In Stock</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-[13px] md:text-[14px] font-bold text-[#0F1E4A]">12-Month Warranty</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleWhatsAppQuote}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1E4A] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#162B68] hover:shadow-lg hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5" />
                Request a Quote
              </button>

              <Link
                to="/spares-service/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#0F1E4A] transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                Back to Catalog
              </Link>
            </div>
          </div>
        </div>

        {/* Unified Content Section */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm space-y-6">

          {/* Overview */}
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-[#0F1E4A] mb-2.5">Product Overview</h2>
            <div className="text-slate-500 text-sm md:text-base leading-7 font-medium">
              {product.fullDescription || product.description}
            </div>
          </div>

          {/* Features & Applications */}
          {(product.features?.length > 0 || product.applications?.length > 0) && (
            <div className="grid md:grid-cols-2 gap-6">
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-base md:text-lg font-extrabold text-[#0F1E4A] mb-3">Key Features</h3>
                  <div className="flex flex-col gap-2.5">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2.5">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#FF7A1A]/10 flex items-center justify-center">
                          <span className="text-[#FF7A1A] text-xs font-bold">✓</span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.applications && product.applications.length > 0 && (
                <div>
                  <h3 className="text-base md:text-lg font-extrabold text-[#0F1E4A] mb-3">Applications</h3>
                  <div className="flex flex-col gap-2.5">
                    {product.applications.map((app, index) => (
                      <div key={index} className="flex items-center gap-2.5">
                        <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#FF7A1A]"></div>
                        <p className="text-sm text-slate-600 font-medium">{app}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Technical Specs */}
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-[#0F1E4A] mb-3">Technical Specifications</h2>
            <TechnicalSpecs specs={productSpecifications} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

