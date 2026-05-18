import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Package } from 'lucide-react';

function ProductCard({ product }) {
  const productTitle = product.title || product.name;
  console.log(product);

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
      whileHover={{ y: -4, shadow: "0 8px 18px rgba(30,42,74,0.08)" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group h-full"
    >
      <Link
        to={`/spares-service/product/${product.id}`}
        className="flex h-full flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3.5 border border-slate-100"
      >

        {/* Product Image */}
        <div className="flex justify-center mb-2.5 bg-gray-50/50 rounded-lg p-2.5">
          {/* <img 
  src={
    product.image?.startsWith('http')
      ? product.image
      : `https://spares.salvinindia.com/spares${product.image}`
  } 
  alt={productTitle} 
  className="w-full h-36 object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/600x400/f8fafc/1e2a4a?text=No+Image';
  }}
/> */}
          <img

            //src={product.image}
            src={
              product.image?.startsWith('http')
                ? product.image
                : `https://spares.salvinindia.com/spares/uploads/${product.image}`
            }
            alt={productTitle}
            className="w-full h-36 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://placehold.co/600x400/f8fafc/1e2a4a?text=No+Image';
            }}
          />
        </div>

        {/* Product Category Badge */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600 border border-slate-200">
              <Package className="h-2.5 w-2.5" />
              {product.category || 'Industrial'}
            </span>
          </div>
        </div>

        {/* Product Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
            {productTitle}
          </h3>

          <p className="text-xs leading-5 text-slate-500 mb-3 line-clamp-2 flex-1">
            {product.description || 'High-quality industrial component designed for reliable performance.'}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-gray-50">
            <div className="flex items-center gap-1 text-[11px] font-bold text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
              <span>DETAILS</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            <button
              onClick={handleWhatsAppQuote}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#1E2A4A] px-3 py-1.5 text-[10px] font-bold text-white transition-all duration-300 hover:bg-orange-600"
              title="Get a Quote"
            >
              <MessageCircle className="h-3 w-3" />
              <span>QUOTE</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
