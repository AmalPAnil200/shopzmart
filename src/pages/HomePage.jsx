import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, TrendingUp, Truck, ShieldCheck, RefreshCw, Headphones, Laptop, Shirt, Sofa, Dumbbell, BookOpen, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const CATEGORY_ICONS = {
  laptop: Laptop, shirt: Shirt, sofa: Sofa,
  dumbbell: Dumbbell, bookOpen: BookOpen, sparkles: Sparkles,
};

const HERO_SLIDES = [
  {
    id: 1,
    badgeIcon: TrendingUp,
    badgeText: 'New Arrivals · Spring 2026',
    title: <>Shop Smarter,<br />Live <span className="text-yellow-400">Better.</span></>,
    desc: 'Discover thousands of curated products across electronics, fashion, home, and beyond — at prices that make sense.',
    cta1: 'Shop Now',
    cta2: 'View Deals',
    bgData: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)',
    blob1: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    stats: [
      { value: '50K+', label: 'Products' },
      { value: '120K+', label: 'Happy Customers' },
      { value: '4.9★', label: 'Avg Rating' },
      { value: '99%', label: 'On-Time Delivery' },
    ],
    floating1: { Icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'text-blue-600', bg: 'bg-blue-50' },
  },
  {
    id: 2,
    badgeIcon: Sparkles,
    badgeText: 'Tech Week · Up to 40% Off',
    title: <>Next-Gen Tech,<br /><span className="text-emerald-400">Unbeatable Prices.</span></>,
    desc: 'Upgrade your workspace and daily carry with the latest gadgets, wearables, and computing essentials.',
    cta1: 'Explore Tech',
    cta2: 'All Offers',
    bgData: 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #0d9488 100%)',
    blob1: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    stats: [
      { value: 'Wireless', label: 'Future-Proof' },
      { value: '2 Yr', label: 'Warranty' },
      { value: 'Tech', label: 'Support 24/7' },
      { value: '100%', label: 'Authentic' },
    ],
    floating1: { Icon: ShieldCheck, title: 'Secure Buying', desc: '100% Protected', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  },
  {
    id: 3,
    badgeIcon: Sofa,
    badgeText: 'Minimalist Living',
    title: <>Elevate Your<br /><span className="text-rose-400">Home Space.</span></>,
    desc: 'Transform your living area with our curated collection of modern, sustainable furniture and decor.',
    cta1: 'Shop Home',
    cta2: 'Inspiration',
    bgData: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)',
    blob1: 'radial-gradient(circle, rgba(251,113,133,0.15) 0%, transparent 70%)',
    blob2: 'radial-gradient(circle, rgba(232,121,249,0.15) 0%, transparent 70%)',
    img: 'https://i.pinimg.com/736x/4c/19/50/4c1950a37b35b2300ad40dbf47828f15.jpg',
    stats: [
      { value: '100%', label: 'Sustainable' },
      { value: 'Premium', label: 'Materials' },
      { value: 'Award', label: 'Winning Design' },
      { value: 'Fast', label: 'Assembly' },
    ],
    floating1: { Icon: RefreshCw, title: 'Easy Returns', desc: '30-Day Guarantee', color: 'text-purple-600', bg: 'bg-purple-50' },
  }
];

export default function HomePage() {
  const featured = products.slice(0, 8);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const slide = HERO_SLIDES[currentSlide];

  return (
    <>
      {/* ─── HERO SLIDER ─── */}
      <section className="relative overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center bg-gray-900 group">
        {/* Backgrounds */}
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} style={{ background: s.bgData }}>
            <div className="absolute -top-1/2 -right-[10%] w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: s.blob1 }} />
            <div className="absolute -bottom-1/5 -left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: s.blob2 }} />
          </div>
        ))}

        <div className="max-w-[1280px] mx-auto px-6 py-20 pb-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20 w-full">
          {/* Content */}
          <div key={`content-${slide.id}`} className="lg:text-left text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[0.8rem] font-semibold tracking-widest uppercase mb-5">
              <slide.badgeIcon size={12} className={slide.id === 1 ? 'text-yellow-300' : slide.id === 2 ? 'text-emerald-300' : 'text-rose-300'} />
              <span>{slide.badgeText}</span>
            </div>
            <h1 className="animate-fade-up animate-fade-up-delay-1 text-white font-black tracking-tighter leading-[1.1] text-[clamp(2.2rem,4vw,3.5rem)] mb-5">
              {slide.title}
            </h1>
            <p className="animate-fade-up animate-fade-up-delay-2 text-[1.1rem] text-white/70 leading-relaxed mb-9 max-w-[460px] lg:max-w-[460px] mx-auto lg:mx-0">
              {slide.desc}
            </p>
            <div className="animate-fade-up animate-fade-up-delay-2 flex gap-3.5 flex-wrap justify-center lg:justify-start">
              <Link to="/products">
                <button className="btn bg-white text-gray-900 border-none hover:bg-gray-100 btn-xl shadow-lg">
                  {slide.cta1} <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/products?tag=sale">
                <button className="btn btn-xl bg-white/[0.12] text-white border-[1.5px] border-white/25 hover:bg-white/20 backdrop-blur-sm">
                  {slide.cta2}
                </button>
              </Link>
            </div>
            <div className="animate-fade-up animate-fade-up-delay-2 flex gap-8 mt-12 pt-8 border-t border-white/10 justify-center lg:justify-start flex-wrap">
              {slide.stats.map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-white tracking-tight">{s.value}</div>
                  <div className="text-[0.8rem] text-white/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div key={`img-${slide.id}`} className="relative hidden lg:flex justify-center items-center h-full animate-fade-up">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] aspect-[4/3] w-full group/image">
              <img src={slide.img} alt={slide.badgeText} className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover/image:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
            {/* Floating 1 */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white flex items-center gap-3 animate-fade-up animate-fade-up-delay-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${slide.floating1.bg} ${slide.floating1.color}`}>
                <slide.floating1.Icon size={22} />
              </div>
              <div>
                <div className="text-[0.85rem] font-extrabold text-gray-900">{slide.floating1.title}</div>
                <div className="text-[0.75rem] text-gray-500 font-medium">{slide.floating1.desc}</div>
              </div>
            </div>
            {/* Floating 2 */}
            <div className="absolute -top-5 -right-5 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white flex items-center gap-3 animate-fade-up animate-fade-up-delay-2">
              <div className="text-[1.5rem] bg-yellow-50 w-12 h-12 rounded-xl flex items-center justify-center">🌟</div>
              <div>
                <div className="text-[0.85rem] font-extrabold text-gray-900">Top Rated</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#facc15" color="#facc15" />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-30 pointer-events-none">
          <div className="max-w-[1280px] mx-auto px-6 flex items-center gap-4">
            <div className="flex items-center gap-2 pointer-events-auto">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${currentSlide === i ? 'w-12 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <div className="flex gap-2 ml-auto pointer-events-auto opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <div className="bg-white border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Truck,       title: 'Free Shipping',  desc: 'On all orders over $50' },
            { Icon: ShieldCheck, title: 'Secure Payment', desc: '100% Protected checkout' },
            { Icon: RefreshCw,   title: '30-Day Returns', desc: 'Easy and hassle-free' },
            { Icon: Headphones,  title: '24/7 Support',   desc: 'Talk to us anytime' },
          ].map(({ Icon, title, desc }, i) => (
            <div key={title} className={`flex items-center gap-3.5 py-5 px-5 ${i < 3 ? 'border-r border-gray-100' : ''}`}>
              <div className="w-11 h-11 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Icon size={20} />
              </div>
              <div>
                <div className="text-[0.85rem] font-bold text-gray-800">{title}</div>
                <div className="text-[0.76rem] text-gray-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CATEGORIES — Bento Grid ─── */}
      <section className="py-[72px] bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-[1.875rem] font-extrabold tracking-tight text-gray-900">Shop by Category</h2>
              <p className="text-gray-500 mt-1.5 text-[0.95rem]">Explore our wide range of curated product categories</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-blue-600 flex items-center gap-1 whitespace-nowrap hover:gap-2 transition-all">
              All Categories <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map(cat => {
              const IconComp = CATEGORY_ICONS[cat.icon];
              return (
                <Link to={`/products?cat=${cat.name.toLowerCase()}`} key={cat.id} className="cat-card-wrap">
                  <div className="cat-card group relative rounded-3xl overflow-hidden cursor-pointer h-full min-h-[200px]">
                    {/* BG image */}
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 ease-out group-hover:scale-[1.08]" style={{ backgroundImage: `url(${cat.image})` }} />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 transition-opacity group-hover:opacity-[0.92]" style={{ background: cat.gradient }} />
                    {/* Icon top-left */}
                    <div className="absolute top-5 left-5 z-10 w-[52px] h-[52px] rounded-xl bg-white/15 backdrop-blur-lg border border-white/25 flex items-center justify-center text-white transition-all group-hover:scale-110 group-hover:-rotate-[4deg] group-hover:bg-white/25 group-hover:shadow-lg">
                      {IconComp && <IconComp size={24} />}
                    </div>
                    {/* Badge top-right */}
                    <div className="absolute top-5 right-5 z-10 bg-black/35 backdrop-blur-sm text-white text-[0.72rem] font-bold px-3 py-1 rounded-full tracking-wide border border-white/15">
                      {cat.count} items
                    </div>
                    {/* Bottom glassmorphism bar */}
                    <div className="absolute inset-0 z-[2] flex flex-col justify-end p-6 text-white">
                      <div className="relative bg-white/[0.12] backdrop-blur-[14px] rounded-xl px-5 py-4 border border-white/[0.18] translate-y-1.5 opacity-90 transition-all group-hover:translate-y-0 group-hover:opacity-100 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                        <div className="text-[1.05rem] font-extrabold tracking-tight mb-0.5">{cat.name}</div>
                        <div className="text-[0.78rem] opacity-75 leading-snug">{cat.desc}</div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-1 text-[0.72rem] font-bold tracking-widest uppercase opacity-0 transition-all group-hover:opacity-100 group-hover:right-0">
                          Explore <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-[72px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-[1.875rem] font-extrabold tracking-tight text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1.5 text-[0.95rem]">Hand-picked picks just for you</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-blue-600 flex items-center gap-1 whitespace-nowrap hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── PROMO BANNERS ─── */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blue promo */}
            <div className="relative rounded-3xl p-10 overflow-hidden min-h-[240px] flex flex-col text-white" style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)' }}>
              <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-white/[0.08]" />
              <div className="text-xs font-bold tracking-[0.1em] uppercase opacity-70 mb-2.5">Limited Offer</div>
              <div className="text-[1.6rem] font-extrabold tracking-tight leading-tight mb-2 relative z-10">Up to 40% Off<br/>Electronics</div>
              <div className="opacity-75 text-[0.9rem] mb-6 relative z-10">Don't miss our biggest tech sale of the season.</div>
              <Link to="/products?cat=electronics&tag=sale">
                <button className="btn bg-white text-blue-600 font-bold hover:bg-gray-50 hover:shadow-md w-fit">Shop Electronics</button>
              </Link>
            </div>
            {/* Yellow promo */}
            <div className="relative rounded-3xl p-10 overflow-hidden min-h-[240px] flex flex-col text-gray-900" style={{ background: 'linear-gradient(135deg, #92400e, #eab308)' }}>
              <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-white/[0.08]" />
              <div className="text-xs font-bold tracking-[0.1em] uppercase opacity-70 mb-2.5">New Collection</div>
              <div className="text-[1.6rem] font-extrabold tracking-tight leading-tight mb-2 relative z-10">Spring Fashion<br/>Is Here</div>
              <div className="opacity-75 text-[0.9rem] mb-6 relative z-10">Fresh styles for the new season, now available.</div>
              <Link to="/products?cat=fashion">
                <button className="btn bg-gray-900 text-white hover:bg-gray-800 w-fit">Explore Fashion</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="py-[72px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-[1.875rem] font-extrabold tracking-tight text-gray-900">New Arrivals</h2>
              <p className="text-gray-500 mt-1.5 text-[0.95rem]">Fresh additions to our catalog</p>
            </div>
            <Link to="/products?tag=new" className="text-sm font-semibold text-blue-600 flex items-center gap-1 whitespace-nowrap hover:gap-2 transition-all">
              See All New <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter(p => p.tag === 'new' || p.tag === 'hot').slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
