import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Package } from 'lucide-react';

function ProductCard({ product }) {
  const productTitle = product.title || product.name;

  const handleWhatsAppQuote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hello, I want a quote for ${productTitle}${product.category ? ` (${product.category})` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919023979663?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -8, shadow: "0 20px 40px rgba(30,42,74,0.15)" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group h-full"
    >
      <Link
        to={`/spares-service/product/${product.id}`}
        className="flex h-full flex-col bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-slate-100"
      >
        {/* Product Image */}
        <div className="flex justify-center mb-3">
          <img 
            src={product.image} 
            alt={productTitle} 
            className="w-full h-32 object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
          />
        </div>

        {/* Product Category Badge */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-orange-600 border border-orange-200/50">
              <Package className="h-2.5 w-2.5" />
              {product.category || 'Industrial'}
            </span>
          </div>
        </div>

        {/* Product Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
            {productTitle}
          </h3>
          
          <p className="text-xs leading-relaxed text-slate-600 mb-4 line-clamp-2 flex-1">
            {product.description || 'High-quality industrial component designed for reliable performance.'}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
              <span>DETAILS</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <button
              onClick={handleWhatsAppQuote}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 hover:from-green-600 hover:to-green-700"
              title="Get a Quote"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>QUOTE</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
