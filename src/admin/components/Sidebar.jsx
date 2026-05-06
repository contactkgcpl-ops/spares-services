import { NavLink } from 'react-router-dom';

const linkClassName = ({ isActive }) =>
  [
    'block rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium transition-all duration-300',
    isActive
      ? 'bg-[#f47c20] text-white'
      : 'text-slate-600 hover:-translate-y-1 hover:border-[#f47c20] hover:bg-white',
  ].join(' ');

const Sidebar = () => {
  return (
    <aside className="w-full max-w-64 border-r border-slate-200 bg-[#f8fafc] p-6">
      <p className="mb-6 text-lg font-semibold tracking-tight text-slate-900">Admin Panel</p>
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
