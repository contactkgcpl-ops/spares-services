function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            selectedCategory === category
              ? 'bg-brand text-slate-950 shadow-soft'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
