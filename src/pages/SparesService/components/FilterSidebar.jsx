import { motion } from 'framer-motion';
import { Filter, Package } from 'lucide-react';

function FilterSidebar({ categories, selectedCategory, onCategoryChange, resultCount }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:sticky lg:top-24 lg:self-start"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30">
            <Filter className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Filter Catalog</h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          Find the right component by category or search keyword.
        </p>
      </div>

      <div className="space-y-6">
        {/* Categories Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-4 w-4 text-orange-500" />
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Categories</p>
          </div>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border-2 border-orange-500 bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-600 shadow-lg shadow-orange-500/20'
                    : 'border border-gray-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50/50 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  {selectedCategory === category && (
                    <div className="h-2 w-2 rounded-full bg-orange-500" />
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
          className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Package className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Results</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-4xl font-black tracking-tight text-slate-900">{resultCount}</p>
            <p className="text-sm font-medium text-slate-600">
              {resultCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <p className="text-sm text-slate-600">match your current filters</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}

export default FilterSidebar;
