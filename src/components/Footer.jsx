import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

/* Inline SVG social icons — Lucide doesn't ship brand icons */
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Top */}
        <div className="pt-[60px] pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-[1.4rem] font-extrabold tracking-tight text-white">
              Shpoz<span className="text-yellow-400">Mart</span>
            </Link>
            <p className="text-[0.88rem] leading-7 mt-3.5 mb-6">
              Your premium destination for curated products across electronics, fashion, home, and more.
              We believe shopping should feel great.
            </p>
            <div className="flex gap-2.5">
              {[
                { Icon: TwitterIcon,   href: '#', label: 'Twitter (X)' },
                { Icon: InstagramIcon, href: '#', label: 'Instagram'   },
                { Icon: FacebookIcon,  href: '#', label: 'Facebook'    },
                { Icon: YoutubeIcon,   href: '#', label: 'YouTube'     },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 transition-all hover:border-blue-600 hover:text-blue-600 hover:bg-blue-600/10"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <a href="tel:+18005551234" className="flex items-center gap-2 text-[0.82rem] text-gray-500">
                <Phone size={14} /> +1 800 555 1234
              </a>
              <a href="mailto:support@shpozmart.com" className="flex items-center gap-2 text-[0.82rem] text-gray-500">
                <Mail size={14} /> support@shpozmart.com
              </a>
            </div>
          </div>

          <FooterCol title="Shop" links={[
            { label: 'All Products', to: '/products' },
            { label: 'Electronics',  to: '/products?cat=electronics' },
            { label: 'Fashion',      to: '/products?cat=fashion' },
            { label: 'Home & Living',to: '/products?cat=home' },
            { label: 'Deals',        to: '/products?tag=sale' },
          ]} />
          <FooterCol title="Account" links={[
            { label: 'My Profile',     to: '/profile' },
            { label: 'Order History',  to: '/profile#orders' },
            { label: 'Wishlist',       to: '/wishlist' },
            { label: 'Cart',           to: '/cart' },
            { label: 'Login / Signup', to: '/login' },
          ]} />
          <FooterCol title="Support" links={[
            { label: 'Help Center',     to: '#' },
            { label: 'Track Order',     to: '#' },
            { label: 'Returns',         to: '#' },
            { label: 'Privacy Policy',  to: '#' },
            { label: 'Terms of Service',to: '#' },
          ]} />
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-5 flex items-center justify-between text-[0.82rem]">
          <span>© 2026 ShpozMart. All rights reserved.</span>
          <div className="flex gap-4 items-center">
            {['Visa', 'MC', 'PayPal', 'Amex'].map(p => (
              <span key={p} className="px-2 py-0.5 border border-gray-700 rounded text-[0.7rem] font-bold text-gray-500">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-[0.85rem] font-bold text-white tracking-wider uppercase mb-4">{title}</h4>
      <ul className="list-none flex flex-col gap-2.5">
        {links.map(l => (
          <li key={l.label}>
            <Link to={l.to} className="text-[0.88rem] text-gray-500 hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
