import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SparesHome from './pages/SparesService/pages/SparesHome';
import PremiumHome from './pages/SparesService/pages/PremiumHome';
import ProductsPage from './pages/SparesService/pages/ProductsPage';
import ProductDetails from './pages/SparesService/pages/ProductDetails';
import ServicePage from './pages/SparesService/pages/ServicePage';
import Sidebar from './admin/components/Sidebar';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import AddProduct from './admin/pages/AddProduct';
import EditProduct from './admin/pages/EditProduct';

const AdminShell = ({ children }) => (
  <div className="flex min-h-screen bg-[#F6F3F0] text-slate-700">
    <Sidebar />
    <div className="flex-1">{children}</div>
  </div>
);

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/spares-service/home' || location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F3F0] text-slate-700">
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? 'flex-1' : isHomePage ? 'flex-1' : 'mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'}>
        <Routes>
          <Route path="/" element={<Navigate to="/spares-service/home" replace />} />
          <Route path="/spares-service/home" element={<PremiumHome />} />
          <Route path="/spares-service" element={<Navigate to="/spares-service/about" replace />} />
          <Route path="/spares-service/overview" element={<Navigate to="/spares-service/about" replace />} />
          <Route path="/spares-service/about" element={<SparesHome />} />
          <Route path="/spares-service/products" element={<ProductsPage />} />
          <Route path="/spares-service/product/:id" element={<ProductDetails />} />
          <Route path="/spares-service/service" element={<ServicePage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminShell>
                  <Dashboard />
                </AdminShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminShell>
                  <Products />
                </AdminShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AdminShell>
                  <AddProduct />
                </AdminShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedRoute>
                <AdminShell>
                  <EditProduct />
                </AdminShell>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/spares-service/about" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
