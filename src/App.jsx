import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Auth pages — no Navbar/Footer */}
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Main app with Layout (Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/"              element={<HomePage />} />
            <Route path="/products"      element={<ProductsPage />} />
            <Route path="/product/:id"   element={<ProductDetailPage />} />
            <Route path="/cart"          element={<CartPage />} />
            <Route path="/checkout"      element={<CheckoutPage />} />
            <Route path="/profile"       element={<ProfilePage />} />
            <Route path="/wishlist"      element={<ProfilePage />} />
            {/* 404 */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '120px 24px' }}>
                <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1 }}>404</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gray-900)', margin: '16px 0 8px' }}>
                  Page not found
                </h2>
                <p style={{ color: 'var(--gray-400)', marginBottom: '28px' }}>
                  Looks like this page doesn't exist.
                </p>
                <a href="/" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Back to Home
                </a>
              </div>
            } />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
