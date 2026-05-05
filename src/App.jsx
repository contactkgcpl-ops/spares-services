import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SparesHome from './pages/SparesService/pages/SparesHome';
import ProductsPage from './pages/SparesService/pages/ProductsPage';
import ProductDetails from './pages/SparesService/pages/ProductDetails';
import ServicePage from './pages/SparesService/pages/ServicePage';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/spares-service" replace />} />
          <Route path="/spares-service" element={<SparesHome />} />
          <Route path="/spares-service/products" element={<ProductsPage />} />
          <Route path="/spares-service/product/:id" element={<ProductDetails />} />
          <Route path="/spares-service/service" element={<ServicePage />} />
          <Route path="*" element={<Navigate to="/spares-service" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
