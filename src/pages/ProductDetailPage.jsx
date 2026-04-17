import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Heart, ShoppingCart, Truck, ShieldCheck, RefreshCw, Share2, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === +id) || products[0];
  const { addToCart } = useCart();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images = product.images.length >= 4 ? product.images : [...product.images, ...product.images].slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white py-5 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-[0.82rem] text-gray-400">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link to={`/products?cat=${product.category.toLowerCase()}`} className="hover:text-blue-600">{product.category}</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-700 font-semibold max-w-[200px] truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-20">
        {/* Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
          {/* Gallery */}
          <div>
            <div className="rounded-3xl overflow-hidden bg-gray-50 aspect-square border-[1.5px] border-gray-100">
              <img src={images[selectedImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3.5">
              {images.map((img, i) => (
                <div key={i}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-50 border-2 transition-colors ${selectedImg === i ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
                  onClick={() => setSelectedImg(i)}>
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-[0.82rem] font-semibold text-blue-600 tracking-widest uppercase mb-2">{product.brand}</div>
            <h1 className="text-[1.75rem] font-extrabold tracking-tight text-gray-900 leading-tight mb-3.5">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex gap-0.5 text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= Math.round(product.rating) ? 'currentColor' : 'none'} />)}
              </div>
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
              <span className={`ml-auto text-[0.82rem] font-semibold ${product.inStock ? 'text-emerald-500' : 'text-red-500'}`}>
                {product.inStock ? '✓ In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="p-5 bg-gray-50 rounded-2xl border-[1.5px] border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[2rem] font-black text-gray-900 tracking-tighter">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-[0.82rem] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Save {product.discount}%</span>
                  </>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-[0.8rem] text-emerald-500 mt-1.5 font-semibold">You save ${(product.originalPrice - product.price).toFixed(2)}</p>
              )}
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[0.82rem] font-bold text-gray-600 tracking-widest uppercase mb-2.5">Color</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(c => (
                    <div key={c}
                      className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all hover:scale-110 ${selectedColor === c ? 'border-gray-400 scale-110' : 'border-transparent'}`}
                      style={{ background: c }}
                      onClick={() => setSelectedColor(c)} />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <p className="text-[0.82rem] font-bold text-gray-600 tracking-widest uppercase mb-2.5">
                  Size <span className="normal-case text-blue-600 cursor-pointer tracking-normal">— Size Guide →</span>
                </p>
                <div className="flex gap-2 flex-wrap mb-5">
                  {product.sizes.map(size => (
                    <button key={size}
                      className={`min-w-[44px] h-11 px-3 rounded-lg border-[1.5px] text-sm font-semibold transition-all ${selectedSize === size ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-600 bg-white hover:border-blue-600 hover:text-blue-600'}`}
                      onClick={() => setSelectedSize(size)}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <p className="text-[0.82rem] font-bold text-gray-600 tracking-widest uppercase mb-2.5">Quantity</p>
            <div className="flex items-center gap-1 border-[1.5px] border-gray-200 rounded-xl overflow-hidden w-fit mb-5">
              <button className="w-10 h-12 bg-gray-50 text-gray-600 text-xl flex items-center justify-center border-none hover:bg-gray-100" onClick={() => setQty(q => Math.max(1, q - 1))}>
                <Minus size={16} />
              </button>
              <span className="min-w-[52px] text-center font-bold text-base text-gray-800">{qty}</span>
              <button className="w-10 h-12 bg-gray-50 text-gray-600 text-xl flex items-center justify-center border-none hover:bg-gray-100" onClick={() => setQty(q => q + 1)}>
                <Plus size={16} />
              </button>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-6">
              <button className={`btn btn-lg flex-1 ${addedToCart ? 'btn-accent' : 'btn-primary'}`} onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button className={`btn btn-lg btn-ghost`} onClick={() => setWishlisted(w => !w)} style={{ color: wishlisted ? '#ef4444' : undefined }}>
                <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : undefined} />
              </button>
              <button className="btn btn-lg btn-ghost"><Share2 size={18} /></button>
            </div>

            <Link to="/checkout">
              <button className="btn btn-outline btn-full btn-lg mb-6">Buy Now — Checkout</button>
            </Link>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t-[1.5px] border-gray-100">
              {[
                { Icon: Truck,       text: 'Free shipping on orders over $50' },
                { Icon: ShieldCheck, text: '2-year warranty included' },
                { Icon: RefreshCw,   text: '30-day hassle-free returns' },
                { Icon: Star,        text: 'Verified customer reviews' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg text-[0.82rem] text-gray-600">
                  <Icon size={16} className="text-blue-600 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b-2 border-gray-100 mb-6">
            {['description', 'specifications', 'reviews'].map(t => (
              <button key={t}
                className={`px-5 py-2.5 text-sm font-semibold border-none bg-transparent -mb-[2px] border-b-2 transition-all cursor-pointer ${activeTab === t ? 'text-blue-600 border-b-blue-600' : 'text-gray-500 border-b-transparent hover:text-gray-700'}`}
                onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === 'reviews' ? ` (${product.reviews.toLocaleString()})` : ''}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-[720px] leading-relaxed text-gray-600 text-[0.95rem]">
              <p>{product.description}</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="max-w-[600px]">
              {[
                ['Brand', product.brand], ['Category', product.category], ['Condition', 'New'],
                ['In Stock', product.inStock ? 'Yes' : 'No'], ['Warranty', '2 Years'],
                ['SKU', `SKU-${product.id.toString().padStart(6, '0')}`],
              ].map(([k, v]) => (
                <div key={k} className="flex py-3 border-b border-gray-100 text-[0.9rem]">
                  <span className="w-40 text-gray-400 font-medium shrink-0">{k}</span>
                  <span className="text-gray-800 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="max-w-[680px]">
              {/* Summary */}
              <div className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-6 mb-6 flex gap-8 items-center">
                <div className="text-center">
                  <div className="text-5xl font-black text-gray-900 leading-none">{product.rating}</div>
                  <div className="flex gap-0.5 text-yellow-400 justify-center my-2">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= Math.round(product.rating) ? 'currentColor' : 'none'} />)}
                  </div>
                  <div className="text-[0.8rem] text-gray-400">{product.reviews.toLocaleString()} reviews</div>
                </div>
                <div className="flex-1">
                  {[5,4,3,2,1].map(r => (
                    <div key={r} className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-4 text-[0.8rem] text-gray-500 shrink-0">{r}★</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r === 5 ? 70 : r === 4 ? 20 : r === 3 ? 6 : 2}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sample reviews */}
              {[
                { name: 'Alex M.', rating: 5, comment: 'Absolutely love this product. Quality is top notch and delivery was super fast!', date: 'Apr 10, 2026' },
                { name: 'Sarah K.', rating: 4, comment: 'Great value for money. Works exactly as described. Would recommend.', date: 'Apr 2, 2026' },
              ].map((rev, i) => (
                <div key={i} className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-5 mb-3">
                  <div className="flex justify-between mb-2">
                    <div className="font-bold text-gray-800 text-[0.9rem]">{rev.name}</div>
                    <span className="text-[0.78rem] text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400 mb-2">
                    {[1,2,3,4,5].map(j => <Star key={j} size={13} fill={j <= rev.rating ? 'currentColor' : 'none'} />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-[72px]">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-[1.875rem] font-extrabold tracking-tight text-gray-900">Related Products</h2>
                <p className="text-gray-500 mt-1.5 text-[0.95rem]">You might also like</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
