import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/spares-service/home' },
  { label: 'About', to: '/spares-service/about' },
  { label: 'Products', to: '/spares-service/products' },
  { label: 'Service', to: '/spares-service/service' }
];

function Navbar() {
  return (
    <header className="border-b border-[#D3C2B6] bg-[#FBF7F1]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-6 lg:px-8">
        <Link to="/spares-service/about" className="flex items-center gap-3 text-lg font-bold tracking-tight text-[#14212A]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#D87F2A] text-white shadow-sm">
            SS
          </span>
          <span>SPARES & SERVICE</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `border-b-2 pb-1 text-sm font-medium transition-all duration-300 ${isActive ? 'border-[#D87F2A] text-[#D87F2A]' : 'border-transparent text-slate-700 hover:text-[#D87F2A]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/spares-service/products"
          className="rounded-lg bg-[#D87F2A] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#B95F1C] shadow-sm"
        >
          Explore Parts
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
