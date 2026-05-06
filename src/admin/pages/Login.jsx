import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === 'admin@gmail.com' && password === '123456') {
      localStorage.setItem('admin_auth', 'true');
      const targetPath = location.state?.from?.pathname || '/admin/dashboard';
      navigate(targetPath, { replace: true });
      return;
    }

    setError('Invalid credentials. Use admin@gmail.com / 123456');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-center text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Admin Login</h1>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm text-slate-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none transition-all duration-300 focus:border-[#f47c20]"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="mb-2 block text-sm text-slate-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-600 outline-none transition-all duration-300 focus:border-[#f47c20]"
            required
          />
        </div>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
