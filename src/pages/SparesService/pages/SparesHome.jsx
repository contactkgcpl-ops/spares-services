import { Link } from 'react-router-dom';
import products from '../data/products';
import { getFeaturedProducts } from '../utils/productUtils';
import useProductFilter from '../hooks/useProductFilter';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import heroGraphic from '../assets/hero-graphic.svg';

function SparesHome() {
  const { categories, category, filteredProducts, query, setCategory, setQuery } = useProductFilter(products);
  const featured = getFeaturedProducts(products);

  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-950/90 p-8 sm:p-10 hero-gradient shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
              Industrial spare parts & service platform
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Reliable spares, optimized service, better uptime.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                Discover modern replacement parts, preventive maintenance packages, and engineering support built for heavy industry.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/spares-service/products"
                className="rounded-3xl bg-brand px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-orange-500"
              >
                Browse catalog
              </Link>
              <Link
                to="/spares-service/service"
                className="rounded-3xl border border-slate-800 px-6 py-4 text-sm font-semibold text-slate-100 transition hover:border-brand/60"
              >
                Learn about services
              </Link>
            </div>
          </div>

          <div className="relative mx-auto max-w-xl">
            <img src={heroGraphic} alt="Industrial equipment illustration" className="w-full rounded-[2rem] border border-slate-800 bg-slate-950/80" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/95 to-transparent" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Search parts in one place</h2>
          <p className="mt-3 text-slate-400">Use instant search and category filters to locate the spare part you need without delay.</p>
          <div className="mt-6 space-y-6">
            <SearchBar query={query} onChange={setQuery} />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Browse by category</p>
              <div className="mt-4">
                <CategoryFilter categories={categories} selectedCategory={category} onCategoryChange={setCategory} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.24em] text-brand">Current catalog</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">{filteredProducts.length} parts matching your selection</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-white">Precision sourcing</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Every spare part is selected for fit, durability, and compatibility with industrial equipment.</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-white">Fast track support</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Field service, commissioning, and repair available for shutdown windows and urgent replacements.</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-white">Connected maintenance</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Track part lifecycle and get service recommendations that reduce downtime and increase reliability.</p>
        </div>
      </div>
    </section>
  );
}

export default SparesHome;
