import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const productTitle = product.title || product.name;

  const handleWhatsAppQuote = () => {
    const message = `Hello, I want a quote for ${productTitle}${product.category ? ` (${product.category})` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919023979663?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link
      to={`/spares-service/product/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#D3C2B6] bg-[#FBF7F1] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D87F2A]"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-[#D87F2A]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#D87F2A]">
          {product.category}
        </span>
        <img src={product.image} alt={productTitle} className="h-20 w-20 rounded-lg object-cover" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-[#14212A] transition group-hover:text-[#D87F2A]">
        {productTitle}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-[#f47c20]">
          View details <span aria-hidden="true">&rarr;</span>
        </div>

        <button
          onClick={handleWhatsAppQuote}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-green-700 hover:scale-105"
          title="Get a Quote via WhatsApp"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-.595-.149-.893 0l-.495.492c-.057.057-.114.122-.114.187 0 .415.336.75.75.75h4.5c.415 0 .75-.335.75-.75s-.335-.75-.75-.75h-4.492l-.492-.491c-.298-.149-.595-.149-.893 0l-7.5 7.5c-.149.298-.149.595 0 .893l7.5 7.5c.149.298.149.595 0 .893z" />
            <path d="M12.016 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10zm0 17.5c-4.136 0-7.5-3.364-7.5-7.5s3.364-7.5 7.5-7.5 7.5 3.364 7.5 7.5-3.364 7.5-7.5z" />
          </svg>
          Get a Quote
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
