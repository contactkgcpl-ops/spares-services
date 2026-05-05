import { NavLink } from 'react-router-dom';

const linkClassName = ({ isActive }) =>
  [
    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-[#F47C20] text-white'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
  ].join(' ');

const Sidebar = () => {
  return (
    <aside className="w-full max-w-64 border-r border-slate-800 bg-slate-900/70 p-5">
      <p className="mb-6 text-lg font-semibold text-white">Admin Panel</p>
      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClassName}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClassName}>
          Products
        </NavLink>
        <NavLink to="/admin/add-product" className={linkClassName}>
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
