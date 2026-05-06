import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{title}</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
