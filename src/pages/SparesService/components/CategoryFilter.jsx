function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${selectedCategory === category
              ? 'bg-[#D87F2A] text-white'
              : 'border border-[#D3C2B6] bg-[#FBF7F1] text-slate-700 hover:-translate-y-1 hover:border-[#D87F2A]'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
