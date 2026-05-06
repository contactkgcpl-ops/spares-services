import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import CategoryFilter from '../components/CategoryFilter';
import useProductFilter from '../hooks/useProductFilter';
import products from '../data/products';

function ProductsPage() {
  const { categories, category, filteredProducts, query, setCategory, setQuery } = useProductFilter(products);

  return (
    <section className="space-y-10 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#f47c20]">Product catalog</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Smart search for industrial spares.</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Use live search and filters to narrow down equipment parts from pumps, valves, motors, filters, bearings, and controls.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-6">
            <p className="text-sm font-semibold text-slate-900">Live search</p>
            <p className="mt-2 text-sm text-slate-600">Search by part name, category or performance keywords.</p>
            <div className="mt-5">
              <SearchBar query={query} onChange={setQuery} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
        <FilterSidebar
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          resultCount={filteredProducts.length}
        />

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Available products</h2>
                <p className="mt-2 text-sm text-slate-600">Showing the best industrial spares with responsive product info.</p>
              </div>
              <div className="hidden sm:block">
                <CategoryFilter categories={categories} selectedCategory={category} onCategoryChange={setCategory} />
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
              <p className="text-lg font-semibold text-slate-900">No results found.</p>
              <p className="mt-3">Try a broader keyword or switch to another category.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
