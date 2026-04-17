import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const location = useLocation();
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: 'Cart' },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <nav className={`sticky top-0 z-50 bg-white/[0.92] backdrop-blur-2xl border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-6 h-[68px] flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600 flex items-center gap-1.5 shrink-0">
          Shpoz<span className="text-yellow-600">Mart</span>
        </Link>

        {/* Search — desktop */}
        <div className="flex-1 max-w-[480px] relative hidden md:flex">
          <input
            type="text"
            placeholder="Search products, brands, categories…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-[42px] border-[1.5px] border-gray-200 rounded-full pl-[18px] pr-12 text-[0.9rem] text-gray-800 bg-gray-50 outline-none transition-all focus:border-blue-600 focus:ring-[3px] focus:ring-blue-600/[0.12] focus:bg-white placeholder:text-gray-400"
          />
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors" aria-label="Search">
            <Search size={14} />
          </button>
        </div>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none ml-auto">
          {navLinks.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`px-3.5 py-1.5 rounded-full text-[0.9rem] font-medium transition-colors ${isActive(l.to) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <Link to="/wishlist" className="relative w-[42px] h-[42px] rounded-xl border-[1.5px] border-gray-200 bg-white text-gray-600 flex items-center justify-center transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow-blue" aria-label="Wishlist">
            <Heart size={18} />
          </Link>
          <Link to="/cart" className="relative w-[42px] h-[42px] rounded-xl border-[1.5px] border-gray-200 bg-white text-gray-600 flex items-center justify-center transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow-blue" aria-label="Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-gray-900 text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/profile" className="relative w-[42px] h-[42px] rounded-xl border-[1.5px] border-gray-200 bg-white text-gray-600 flex items-center justify-center transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow-blue" aria-label="Profile">
            <User size={18} />
          </Link>
          <button
            className="relative w-[42px] h-[42px] rounded-xl border-[1.5px] border-gray-200 bg-white text-gray-600 flex md:hidden items-center justify-center"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1 md:hidden">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search…"
              className="w-full h-[42px] border-[1.5px] border-gray-200 rounded-full px-4 text-[0.9rem] outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3.5 py-2.5 rounded-lg font-medium text-[0.9rem] ${isActive(l.to) ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 flex gap-2">
            <Link to="/login" className="flex-1">
              <button className="btn btn-outline btn-full">Login</button>
            </Link>
            <Link to="/signup" className="flex-1">
              <button className="btn btn-primary btn-full">Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
