import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Package, Heart, Settings, LogOut, ShoppingBag, TrendingUp,
  Star, Clock, ChevronRight, Edit2, MapPin, CreditCard, Bell, Menu, X,
} from 'lucide-react';
import { orders, products } from '../data/products';
import ProductCard from '../components/ProductCard';

const NAV_ITEMS = [
  { id: 'dashboard', Icon: TrendingUp, label: 'Dashboard' },
  { id: 'orders',    Icon: Package,    label: 'Order History' },
  { id: 'wishlist',  Icon: Heart,      label: 'Wishlist' },
  { id: 'addresses', Icon: MapPin,     label: 'Addresses' },
  { id: 'payment',   Icon: CreditCard, label: 'Payment Methods' },
  { id: 'settings',  Icon: Settings,   label: 'Settings' },
];

const USER = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  joined: 'January 2025',
};

export default function ProfilePage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.pathname === '/wishlist' ? 'wishlist' : 'dashboard'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/wishlist') setActiveSection('wishlist');
  }, [location.pathname]);

  const handleNav = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* ── Page Header ── */}
      <div className="bg-white py-4 sm:py-5 border-b border-gray-100 mb-6 sm:mb-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-[0.78rem] sm:text-[0.82rem] text-gray-400">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={11} className="text-gray-300" />
            <span className="text-gray-700 font-semibold">My Account</span>
          </nav>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">My Account</h1>
            {/* Mobile sidebar toggle */}
            <button
              className="lg:hidden flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-2 rounded-lg border-none cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={16} /> Menu
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-gray-900">Account Menu</span>
              <button className="bg-transparent border-none cursor-pointer text-gray-500" onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {/* User card */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg shrink-0">
                {USER.name[0]}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{USER.name}</div>
                <div className="text-xs text-gray-400">{USER.email}</div>
              </div>
            </div>
            <ul className="list-none p-3 flex-1 overflow-y-auto">
              {NAV_ITEMS.map(({ id, Icon, label }) => (
                <li key={id}>
                  <button onClick={() => handleNav(id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer transition-all ${activeSection === id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 bg-transparent hover:bg-gray-50'}`}>
                    <Icon size={18} /> {label}
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-100 pt-2 mt-2">
                <Link to="/login" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-500">
                  <LogOut size={18} /> Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 sm:gap-8 items-start">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block bg-white rounded-2xl border-[1.5px] border-gray-100 overflow-hidden sticky top-[88px]">
            <div className="p-6 text-center border-b border-gray-100">
              <div className="w-[70px] h-[70px] mx-auto rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mb-3">
                {USER.name[0]}
              </div>
              <div className="font-bold text-gray-900">{USER.name}</div>
              <div className="text-sm text-gray-400">{USER.email}</div>
              <div className="text-[0.72rem] text-gray-400/70 mt-2">Member since {USER.joined}</div>
            </div>
            <ul className="list-none p-3">
              {NAV_ITEMS.map(({ id, Icon, label }) => (
                <li key={id}>
                  <button onClick={() => handleNav(id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer transition-all ${activeSection === id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 bg-transparent hover:bg-gray-50'}`}>
                    <Icon size={18} /> {label}
                  </button>
                </li>
              ))}
              <li className="border-t border-gray-100 pt-2 mt-2">
                <Link to="/login" className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-500">
                  <LogOut size={18} /> Sign Out
                </Link>
              </li>
            </ul>
          </aside>

          {/* ── Content ── */}
          <div className="min-w-0">
            {/* Mobile active section label */}
            <div className="lg:hidden flex items-center gap-2 mb-5 text-sm font-semibold text-gray-600">
              {NAV_ITEMS.find(n => n.id === activeSection)?.Icon &&
                (() => { const Icon = NAV_ITEMS.find(n => n.id === activeSection).Icon; return <Icon size={16} className="text-blue-600" />; })()
              }
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </div>

            {activeSection === 'dashboard' && <DashboardSection onViewAll={() => handleNav('orders')} />}
            {activeSection === 'orders'    && <OrdersSection />}
            {activeSection === 'wishlist'  && <WishlistSection />}
            {activeSection === 'settings'  && <SettingsSection user={USER} />}
            {!['dashboard','orders','wishlist','settings'].includes(activeSection) && (
              <PlaceholderSection label={NAV_ITEMS.find(n => n.id === activeSection)?.label} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────── Dashboard ─────────────────── */
function DashboardSection({ onViewAll }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { Icon: ShoppingBag, label: 'Total Orders',    value: '12', color: 'bg-blue-50 text-blue-600' },
          { Icon: Package,     label: 'Delivered',       value: '9',  color: 'bg-emerald-50 text-emerald-500' },
          { Icon: Clock,       label: 'In Progress',     value: '2',  color: 'bg-yellow-50 text-yellow-600' },
          { Icon: Star,        label: 'Reviews Written', value: '7',  color: 'bg-red-50 text-red-500' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 sm:p-5 border-[1.5px] border-gray-100 text-center">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mx-auto mb-2.5 sm:mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-0.5">{value}</div>
            <div className="text-[0.72rem] sm:text-[0.8rem] text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 border-[1.5px] border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h3 className="font-bold text-sm sm:text-base text-gray-900">Recent Orders</h3>
          <button onClick={onViewAll}
            className="text-xs sm:text-sm text-blue-600 bg-transparent border-none font-semibold cursor-pointer">
            View All
          </button>
        </div>
        <OrdersTable slice={3} />
      </div>
    </>
  );
}

/* ─────────────────── Orders ─────────────────── */
function OrdersSection() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border-[1.5px] border-gray-100">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="font-bold text-sm sm:text-base text-gray-900">Order History</h3>
        <span className="text-xs sm:text-sm text-gray-400">{orders.length} orders</span>
      </div>
      <OrdersTable />
    </div>
  );
}

/* ─────────────────── Orders Table (responsive) ─────────────────── */
function OrdersTable({ slice }) {
  const list = slice ? orders.slice(0, slice) : orders;

  return (
    <>
      {/* Desktop table — hidden on mobile */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-gray-100 text-gray-400 text-left">
              <th className="py-3 pr-4 font-semibold">Order ID</th>
              <th className="py-3 pr-4 font-semibold">Date</th>
              <th className="py-3 pr-4 font-semibold">Items</th>
              <th className="py-3 pr-4 font-semibold">Total</th>
              <th className="py-3 pr-4 font-semibold">Status</th>
              <th className="py-3 pr-4 font-semibold">Payment</th>
              <th className="py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {list.map(order => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 pr-4 font-bold text-gray-900 text-[0.82rem]">{order.id}</td>
                <td className="py-3.5 pr-4 text-gray-600 text-[0.82rem]">{order.date}</td>
                <td className="py-3.5 pr-4 text-gray-600 text-[0.82rem]">{order.items} item{order.items !== 1 ? 's' : ''}</td>
                <td className="py-3.5 pr-4 font-bold text-gray-900 text-[0.82rem]">{order.total}</td>
                <td className="py-3.5 pr-4">
                  <span className={`order-status ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-gray-400 text-[0.78rem]">{order.paymentMethod}</td>
                <td className="py-3.5">
                  <button className="bg-transparent border-none text-blue-600 font-semibold text-[0.78rem] cursor-pointer whitespace-nowrap">
                    Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards — shown only on small screens */}
      <div className="flex flex-col gap-3 sm:hidden">
        {list.map(order => (
          <div key={order.id} className="border-[1.5px] border-gray-100 rounded-xl p-4 bg-gray-50/40">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="font-bold text-gray-900 text-sm">{order.id}</div>
                <div className="text-[0.75rem] text-gray-400 mt-0.5">{order.date}</div>
              </div>
              <span className={`order-status ${order.status} shrink-0`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.78rem] text-gray-500 mt-2">
              <span><span className="text-gray-400">Items:</span> {order.items}</span>
              <span><span className="text-gray-400">Total:</span> <strong className="text-gray-800">{order.total}</strong></span>
              <span><span className="text-gray-400">Via:</span> {order.paymentMethod}</span>
            </div>
            <button className="mt-3 text-[0.78rem] font-semibold text-blue-600 bg-transparent border-none cursor-pointer p-0">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────────────── Wishlist ─────────────────── */
function WishlistSection() {
  const wishlistItems = products.slice(1, 5);
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border-[1.5px] border-gray-100">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h3 className="font-bold text-sm sm:text-base text-gray-900">My Wishlist</h3>
        <span className="text-xs sm:text-sm text-gray-400">{wishlistItems.length} items</span>
      </div>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {wishlistItems.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-16 px-6">
          <div className="text-5xl mb-4 opacity-40">🤍</div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6 text-sm">Save items you like and they'll appear here.</p>
          <Link to="/products"><button className="btn btn-outline btn-sm">Explore Products</button></Link>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── Settings ─────────────────── */
function SettingsSection({ user }) {
  const [name, setName]   = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      {/* Profile Info */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border-[1.5px] border-gray-100">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h3 className="font-bold text-sm sm:text-base text-gray-900">Profile Information</h3>
          <button className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 bg-transparent border-none font-semibold cursor-pointer">
            <Edit2 size={13} /> Edit
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.78rem] font-semibold text-gray-600">Full Name</label>
              <input className="form-input w-full" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.78rem] font-semibold text-gray-600">Phone Number</label>
              <input className="form-input w-full" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[0.78rem] font-semibold text-gray-600">Email Address</label>
              <input className="form-input w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <button type="submit" className={`btn ${saved ? 'btn-accent' : 'btn-primary'}`}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border-[1.5px] border-gray-100">
        <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-4 sm:mb-5">Change Password</h3>
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {[['Current Password', 'current-pw'], ['New Password', 'new-pw'], ['Confirm New Password', 'confirm-pw']].map(([label, id]) => (
            <div className="flex flex-col gap-1.5" key={id}>
              <label className="text-[0.78rem] font-semibold text-gray-600" htmlFor={id}>{label}</label>
              <input id={id} type="password" className="form-input w-full" placeholder="••••••••" />
            </div>
          ))}
          <button className="btn btn-outline w-full sm:w-fit">Update Password</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border-[1.5px] border-gray-100">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <Bell size={17} className="text-blue-600" />
          <h3 className="font-bold text-sm sm:text-base text-gray-900">Notifications</h3>
        </div>
        {[
          { label: 'Order updates & tracking',  desc: 'Get notified when your order ships or is delivered', defaultOn: true  },
          { label: 'Promotions & deals',        desc: 'Exclusive offers and seasonal sales',               defaultOn: true  },
          { label: 'Product recommendations',   desc: 'Personalized picks based on your activity',         defaultOn: false },
          { label: 'Newsletter',                desc: 'Weekly curated content from ShpozMart',            defaultOn: false },
        ].map(n => <NotificationToggle key={n.label} {...n} />)}
      </div>
    </div>
  );
}

function NotificationToggle({ label, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0 gap-4">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-800">{label}</div>
        <div className="text-[0.75rem] text-gray-400 mt-0.5 leading-snug">{desc}</div>
      </div>
      <button
        onClick={() => setOn(s => !s)}
        className={`w-11 h-6 rounded-full border-none p-0.5 flex items-center shrink-0 cursor-pointer transition-colors ${on ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

/* ─────────────────── Placeholder ─────────────────── */
function PlaceholderSection({ label }) {
  return (
    <div className="bg-white rounded-2xl p-10 sm:p-[60px] border-[1.5px] border-gray-100 text-center">
      <div className="text-4xl sm:text-5xl mb-3">🚧</div>
      <h3 className="text-base sm:text-[1.1rem] font-bold text-gray-800 mb-2">{label}</h3>
      <p className="text-gray-400 text-sm">This section is coming soon.</p>
    </div>
  );
}
