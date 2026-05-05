import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link
      to={`/spares-service/product/${product.id}`}
      className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-brand/40 hover:bg-slate-900"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {product.category}
        </span>
        <img src={product.image} alt={product.name} className="h-20 w-20 object-contain" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white transition group-hover:text-brand">
        {product.name}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{product.description}</p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
        View details <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

export default ProductCard;
