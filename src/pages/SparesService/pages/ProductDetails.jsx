import { Link, useParams } from 'react-router-dom';
import products from '../data/products';
import TechnicalSpecs from '../components/TechnicalSpecs';
import { findProductById } from '../utils/productUtils';

function ProductDetails() {
  const { id } = useParams();
  const product = findProductById(products, id);

  if (!product) {
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
    <section className="space-y-10 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-[#f47c20]">Detailed specification</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{product.name}</h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">{product.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-[#f8fafc] px-3 py-2 border border-slate-200">Category: {product.category}</span>
              <Link
                to="/spares-service/products"
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[#f47c20] transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]"
              >
                View catalog
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] p-6">
            <img src={product.image} alt={product.name} className="h-72 w-full rounded-lg object-cover" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Product overview</h2>
              <p className="mt-2 text-sm text-slate-600">Complete technical insights and operational notes for maintenance planning.</p>
            </div>
            <a
              href="mailto:sales@spares-service.example?subject=Inquiry%20about%20product%20details"
              className="rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
            >
              Inquire now
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Availability</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">In stock</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Warranty</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">12 months</p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600 leading-relaxed">Recommended use: Ideal for process lines requiring stable performance under continuous operation.</p>
          </div>
        </div>

        <TechnicalSpecs specs={product.technicalDetails} />
      </div>
    </section>
  );
}

export default ProductDetails;
