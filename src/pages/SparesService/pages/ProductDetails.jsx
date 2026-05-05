import { Link, useParams } from 'react-router-dom';
import products from '../data/products';
import TechnicalSpecs from '../components/TechnicalSpecs';
import { findProductById } from '../utils/productUtils';

function ProductDetails() {
  const { id } = useParams();
  const product = findProductById(products, id);

  if (!product) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center text-slate-300 shadow-soft">
        <h1 className="text-2xl font-semibold text-white">Product not found</h1>
        <p className="mt-4">Please return to the product list and select another item.</p>
        <Link
          to="/spares-service/products"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 font-semibold text-slate-950 hover:bg-orange-500"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-slate-800 bg-slate-950/90 p-8 shadow-soft">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-brand">Detailed specification</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">{product.name}</h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">{product.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-400">
              <span className="rounded-full bg-slate-900/70 px-3 py-2">Category: {product.category}</span>
              <Link
                to="/spares-service/products"
                className="rounded-full bg-slate-900/70 px-3 py-2 text-brand transition hover:bg-slate-800"
              >
                View catalog
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6">
            <img src={product.image} alt={product.name} className="w-full object-contain" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">Product overview</h2>
              <p className="mt-2 text-sm text-slate-400">Complete technical insights and operational notes for maintenance planning.</p>
            </div>
            <a
              href="mailto:sales@spares-service.example?subject=Inquiry%20about%20product%20details"
              className="rounded-3xl bg-brand px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-500"
            >
              Inquire now
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Availability</p>
              <p className="mt-2 text-lg font-semibold text-white">In stock</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Warranty</p>
              <p className="mt-2 text-lg font-semibold text-white">12 months</p>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-sm text-slate-300">Recommended use: Ideal for process lines requiring stable performance under continuous operation.</p>
          </div>
        </div>

        <TechnicalSpecs specs={product.technicalDetails} />
      </div>
    </section>
  );
}

export default ProductDetails;
