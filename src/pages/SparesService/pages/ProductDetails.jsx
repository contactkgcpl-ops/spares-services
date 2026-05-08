import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import TechnicalSpecs from '../components/TechnicalSpecs';

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
        const response = await api.get(`/api/products/${id}`);
        const apiProduct = response.data?.data;
        if (!apiProduct) {
          setNotFound(true);
          return;
        }

        setProduct({
          ...apiProduct,
          id: apiProduct._id || apiProduct.id,
          name: apiProduct.title || apiProduct.name || '',
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
    const whatsappUrl = `https://wa.me/919023979663?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Loading product details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Unable to load product</h1>
        <p className="mt-4">{error}</p>
        <Link
          to="/spares-service/products"
          className="mt-6 inline-flex rounded-lg bg-[#f47c20] px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
        >
          Back to products
        </Link>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Product not found</h1>
        <p className="mt-4">Please return to the product list and select another item.</p>
        <Link
          to="/spares-service/products"
          className="mt-6 inline-flex rounded-lg bg-[#f47c20] px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8 py-16">
      {/* Header Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: Product Image with Zoom Effect */}
          <div className="flex items-center justify-center">
            <div className="group relative w-full overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] p-4">
              <div className="relative overflow-hidden rounded-lg bg-white">
                <img
                  src={product.image}
                  alt={productTitle}
                  className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Right: Product Title and Quick Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] font-semibold text-[#f47c20]">Product details</p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {productTitle}
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5 transition-all duration-300 hover:border-[#f47c20] hover:bg-[#fff9f3]">
                <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-500">Availability</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">In stock</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-5 transition-all duration-300 hover:border-[#f47c20] hover:bg-[#fff9f3]">
                <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-500">Category</p>
                <p className="mt-2 text-lg font-semibold text-[#f47c20]">{product.category}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleWhatsAppQuote}
                className="group inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
                title="Get a Quote via WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-.595-.149-.893 0l-.495.492c-.057.057-.114.122-.114.187 0 .415.336.75.75.75h4.5c.415 0 .75-.335.75-.75s-.335-.75-.75-.75h-4.492l-.492-.491c-.298-.149-.595-.149-.893 0l-7.5 7.5c-.149.298-.149.595 0 .893l7.5 7.5c.149.298.149.595 0 .893z"/>
                  <path d="M12.016 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10zm0 17.5c-4.136 0-7.5-3.364-7.5-7.5s3.364-7.5 7.5-7.5 7.5 3.364 7.5 7.5-3.364 7.5-7.5z"/>
                </svg>
                Get a Quote
              </button>
              <Link
                to="/spares-service/products"
                className="inline-flex items-center gap-2 rounded-lg border border-[#f47c20] bg-white px-8 py-3 font-semibold text-[#f47c20] transition-all duration-300 hover:bg-[#f47c20] hover:text-white"
              >
                Back to catalog
              </Link>
            </div>

            {/* Warranty Badge */}
            <div className="rounded-lg border border-slate-200 bg-blue-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                &#10003; <span className="text-blue-600 font-semibold">12-Month Warranty</span> included with all products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Product Overview</h2>
          <p className="text-lg leading-relaxed text-slate-600">
            {product.fullDescription || product.description}
          </p>
        </div>
      </div>

      {/* Key Features Section */}
      {product.features && product.features.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Key Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-gradient-to-br from-white to-[#f8fafc] p-5 transition-all duration-300 hover:border-[#f47c20] hover:shadow-md"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f47c20] text-white font-bold">
                    &#10003;
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-[#f47c20] transition-colors">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Specifications Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Technical Specifications</h2>
        <TechnicalSpecs specs={productSpecifications} />
      </div>

      {/* Applications Section */}
      {product.applications && product.applications.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">Applications & Usage</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {product.applications.map((app, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-4 transition-all duration-300 hover:border-[#f47c20] hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <p className="font-semibold text-slate-700">{app}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-[#f47c20] to-orange-600 p-8 text-white shadow-sm">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h3 className="text-2xl font-bold">Ready to order?</h3>
            <p className="mt-2 text-orange-100">Get in touch with our sales team for competitive pricing and delivery options.</p>
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <button
              onClick={handleWhatsAppQuote}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#f47c20] transition-all duration-300 hover:bg-orange-50 hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-.595-.149-.893 0l-.495.492c-.057.057-.114.122-.114.187 0 .415.336.75.75.75h4.5c.415 0 .75-.335.75-.75s-.335-.75-.75-.75h-4.492l-.492-.491c-.298-.149-.595-.149-.893 0l-7.5 7.5c-.149.298-.149.595 0 .893l7.5 7.5c.149.298.149.595 0 .893z"/>
                <path d="M12.016 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10zm0 17.5c-4.136 0-7.5-3.364-7.5-7.5s3.364-7.5 7.5-7.5 7.5 3.364 7.5 7.5-3.364 7.5-7.5z"/>
              </svg>
              Message us
            </button>
            <a
              href="mailto:info.salvinindustries@gmail.com?subject=Inquiry%20About%20Product"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

