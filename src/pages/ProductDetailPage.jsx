import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight, Star, Heart, ShoppingCart,
  Truck, ShieldCheck, RefreshCw, Share2, Minus, Plus,
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === +id) || products[0];
  const { addToCart } = useCart();

  const [selectedImg, setSelectedImg]     = useState(0);
  const [selectedSize, setSelectedSize]   = useState(product.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [qty, setQty]                     = useState(1);
  const [wishlisted, setWishlisted]       = useState(false);
  const [activeTab, setActiveTab]         = useState('description');
  const [addedToCart, setAddedToCart]     = useState(false);

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images = product.images.length >= 4
    ? product.images
    : [...product.images, ...product.images].slice(0, 4);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="bg-white py-3.5 border-b border-gray-100 overflow-x-auto">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1 text-[0.78rem] sm:text-[0.82rem] text-gray-400 whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 shrink-0">Home</Link>
            <ChevronRight size={11} className="text-gray-300 shrink-0" />
            <Link to="/products" className="hover:text-blue-600 shrink-0">Products</Link>
            <ChevronRight size={11} className="text-gray-300 shrink-0" />
            <Link to={`/products?cat=${product.category.toLowerCase()}`} className="hover:text-blue-600 shrink-0">
              {product.category}
            </Link>
            <ChevronRight size={11} className="text-gray-300 shrink-0" />
            <span className="text-gray-700 font-semibold truncate max-w-[120px] sm:max-w-[260px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">

        {/* ── Product Detail Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-6 sm:mt-10">

          {/* ── Gallery ── */}
          <div className="w-full">
            {/* Main image */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 aspect-square border-[1.5px] border-gray-100 w-full">
              <img
                src={images[selectedImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2.5 sm:mt-3.5">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-pointer bg-gray-50 border-2 transition-colors ${
                    selectedImg === i ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImg(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="w-full">
            <div className="text-[0.78rem] sm:text-[0.82rem] font-semibold text-blue-600 tracking-widest uppercase mb-1.5">
              {product.brand}
            </div>
            <h1 className="text-[1.4rem] sm:text-[1.75rem] font-extrabold tracking-tight text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
              <div className="flex gap-0.5 text-yellow-400">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} fill={i <= Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="font-bold text-gray-800 text-sm">{product.rating}</span>
              <span className="text-gray-400 text-xs sm:text-sm">({product.reviews.toLocaleString()} reviews)</span>
              <span className={`text-[0.78rem] sm:text-[0.82rem] font-semibold ${product.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                {product.inStock ? '✓ In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price box */}
            <div className="p-1 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl border-[1.5px] border-gray-100 mb-5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-[1.75rem] sm:text-[2rem] font-black text-gray-900 tracking-tighter">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm sm:text-base text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-[0.78rem] sm:text-[0.82rem] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Save {product.discount}%
                    </span>
                  </>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-[0.78rem] sm:text-[0.8rem] text-emerald-500 mt-1.5 font-semibold">
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-4 sm:mb-5">
                <p className="text-[0.78rem] font-bold text-gray-600 tracking-widest uppercase mb-2.5">Color</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(c => (
                    <div
                      key={c}
                      className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all hover:scale-110 ${
                        selectedColor === c ? 'border-gray-400 scale-110' : 'border-transparent'
                      }`}
                      style={{ background: c }}
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-4 sm:mb-5">
                <p className="text-[0.78rem] font-bold text-gray-600 tracking-widest uppercase mb-2.5">
                  Size{' '}
                  <span className="normal-case text-blue-600 cursor-pointer tracking-normal text-[0.78rem]">
                    — Size Guide →
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`min-w-[42px] h-10 sm:h-11 px-3 rounded-lg border-[1.5px] text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-blue-600 text-blue-600 bg-blue-50'
                          : 'border-gray-200 text-gray-600 bg-white hover:border-blue-600 hover:text-blue-600'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <p className="text-[0.78rem] font-bold text-gray-600 tracking-widest uppercase mb-2.5">Quantity</p>
            <div className="flex items-center gap-1 border-[1.5px] border-gray-200 rounded-xl overflow-hidden w-fit mb-5">
              <button
                className="w-10 h-11 bg-gray-50 text-gray-600 flex items-center justify-center border-none hover:bg-gray-100"
                onClick={() => setQty(q => Math.max(1, q - 1))}
              >
                <Minus size={15} />
              </button>
              <span className="min-w-[44px] sm:min-w-[52px] text-center font-bold text-sm sm:text-base text-gray-800">
                {qty}
              </span>
              <button
                className="w-10 h-11 bg-gray-50 text-gray-600 flex items-center justify-center border-none hover:bg-gray-100"
                onClick={() => setQty(q => q + 1)}
              >
                <Plus size={15} />
              </button>
            </div>

            {/* CTAs */}
            <div className="flex gap-2 sm:gap-3 mb-4">
              <button
                className={`btn flex-1 min-w-0 ${addedToCart ? 'btn-accent' : 'btn-primary'} h-12 sm:h-[54px] text-sm sm:text-base`}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} className="shrink-0" />
                <span className="truncate">{addedToCart ? '✓ Added!' : 'Add to Cart'}</span>
              </button>
              <button
                className={`btn btn-ghost h-12 sm:h-[54px] px-3 sm:px-4 shrink-0 ${wishlisted ? 'text-red-500 border-red-200' : ''}`}
                onClick={() => setWishlisted(w => !w)}
              >
                <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : undefined} />
              </button>
              <button className="btn btn-ghost h-12 sm:h-[54px] px-3 sm:px-4 shrink-0">
                <Share2 size={18} />
              </button>
            </div>

            <Link to="/checkout" className="block mb-5">
              <button className="btn btn-outline btn-full h-12 sm:h-[54px] text-sm sm:text-base">
                Buy Now — Checkout
              </button>
            </Link>

            {/* Feature badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-5 border-t-[1.5px] border-gray-100">
              {[
                { Icon: Truck,       text: 'Free shipping on orders over $50' },
                { Icon: ShieldCheck, text: '2-year warranty included' },
                { Icon: RefreshCw,   text: '30-day hassle-free returns' },
                { Icon: Star,        text: 'Verified customer reviews' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-[0.8rem] text-gray-600">
                  <Icon size={15} className="text-blue-600 shrink-0" />
                  <span className="leading-snug">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-12 sm:mt-16">
          {/* Tab bar — scrollable on mobile */}
          <div className="flex gap-0 border-b-2 border-gray-100 mb-6 overflow-x-auto">
            {['description', 'specifications', 'reviews'].map(t => (
              <button
                key={t}
                className={`px-4 sm:px-5 py-2.5 text-sm font-semibold border-none bg-transparent -mb-[2px] border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === t
                    ? 'text-blue-600 border-b-blue-600'
                    : 'text-gray-500 border-b-transparent hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === 'reviews' ? ` (${product.reviews.toLocaleString()})` : ''}
              </button>
            ))}
          </div>

          {/* Description */}
          {activeTab === 'description' && (
            <div className="max-w-[720px] leading-relaxed text-gray-600 text-[0.9rem] sm:text-[0.95rem]">
              <p>{product.description}</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          )}

          {/* Specifications */}
          {activeTab === 'specifications' && (
            <div className="max-w-[600px]">
              {[
                ['Brand', product.brand],
                ['Category', product.category],
                ['Condition', 'New'],
                ['In Stock', product.inStock ? 'Yes' : 'No'],
                ['Warranty', '2 Years'],
                ['SKU', `SKU-${product.id.toString().padStart(6, '0')}`],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 text-[0.88rem] sm:text-[0.9rem] gap-0.5 sm:gap-0">
                  <span className="sm:w-40 text-gray-400 font-medium sm:shrink-0">{k}</span>
                  <span className="text-gray-800 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="max-w-[680px]">
              {/* Rating summary */}
              <div className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-5 sm:p-6 mb-5 sm:mb-6 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center">
                <div className="text-center sm:text-left flex sm:flex-col items-center gap-3 sm:gap-0">
                  <div className="text-5xl font-black text-gray-900 leading-none">{product.rating}</div>
                  <div>
                    <div className="flex gap-0.5 text-yellow-400 justify-center my-1 sm:my-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={15} fill={i <= Math.round(product.rating) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <div className="text-[0.78rem] text-gray-400 whitespace-nowrap">{product.reviews.toLocaleString()} reviews</div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  {[5,4,3,2,1].map(r => (
                    <div key={r} className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-4 text-[0.78rem] text-gray-500 shrink-0">{r}★</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 6 : 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review cards */}
              {[
                { name: 'Alex M.', rating: 5, comment: 'Absolutely love this product. Quality is top notch and delivery was super fast!', date: 'Apr 10, 2026' },
                { name: 'Sarah K.', rating: 4, comment: 'Great value for money. Works exactly as described. Would recommend.', date: 'Apr 2, 2026' },
              ].map((rev, i) => (
                <div key={i} className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-4 sm:p-5 mb-3">
                  <div className="flex flex-wrap justify-between items-start gap-1 mb-2">
                    <div className="font-bold text-gray-800 text-[0.88rem] sm:text-[0.9rem]">{rev.name}</div>
                    <span className="text-[0.75rem] sm:text-[0.78rem] text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400 mb-2">
                    {[1,2,3,4,5].map(j => <Star key={j} size={12} fill={j <= rev.rating ? 'currentColor' : 'none'} />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-14 sm:mt-[72px]">
            <div className="mb-7 sm:mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-xl sm:text-[1.875rem] font-extrabold tracking-tight text-gray-900">Related Products</h2>
                <p className="text-gray-500 mt-1 sm:mt-1.5 text-sm sm:text-[0.95rem]">You might also like</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
