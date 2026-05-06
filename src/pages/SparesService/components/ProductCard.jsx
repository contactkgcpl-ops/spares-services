import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link
      to={`/spares-service/product/${product.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#f47c20]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#f47c20]">
          {product.category}
        </span>
        <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-slate-900 transition group-hover:text-[#f47c20]">
        {product.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#f47c20]">
        View details <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}

export default ProductCard;
