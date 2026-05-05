import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-6 py-4">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg bg-[#F47C20] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
