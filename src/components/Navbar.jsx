import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview', to: '/spares-service' },
  { label: 'Products', to: '/spares-service/products' },
  { label: 'Service', to: '/spares-service/service' }
];

function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/spares-service" className="flex items-center gap-3 text-lg font-semibold text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-slate-950 shadow-soft">
            SS
          </span>
          <span>SPARES & SERVICE</span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-brand' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/spares-service/products"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-500"
        >
          Explore Parts
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
