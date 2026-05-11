import { motion } from 'framer-motion';
import { Filter, Package } from 'lucide-react';

function FilterSidebar({ categories, selectedCategory, onCategoryChange, resultCount }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 lg:sticky lg:top-24 lg:self-start"
    >
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
            <Filter className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Filter Catalog</h2>
        </div>
        <p className="text-xs leading-relaxed text-slate-600">
          Find components by category or search.
        </p>
      </div>

      <div className="space-y-5">
        {/* Categories Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-3.5 w-3.5 text-orange-500" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Categories</p>
          </div>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
                className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border-2 border-orange-500 bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-600 shadow-md shadow-orange-500/10'
                    : 'border border-gray-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50/50 hover:-translate-y-0.5 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  {selectedCategory === category && (
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-4 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-full bg-orange-100 flex items-center justify-center">
              <Package className="h-3.5 w-3.5 text-orange-600" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Results</p>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <p className="text-3xl font-black tracking-tight text-slate-900">{resultCount}</p>
            <p className="text-xs font-medium text-slate-600">
              {resultCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <p className="text-xs text-slate-600 text-opacity-70">filtered products</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}

export default FilterSidebar;
