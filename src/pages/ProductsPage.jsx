import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, ChevronDown, ChevronRight, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'newest',     label: 'Newest' },
];

const BRANDS = ['Apple', 'Nike', 'LG', 'JBL', 'Keychron', 'Timex', 'Herman Miller', 'FlexiSpot'];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMax, setPriceMax] = useState(1100);
  const [view, setView] = useState('grid');

  const urlCat = searchParams.get('cat') || '';
  const urlTag = searchParams.get('tag') || '';

  const filtered = useMemo(() => {
    let list = [...products];
    if (urlTag)               list = list.filter(p => p.tag === urlTag);
    if (urlCat)               list = list.filter(p => p.category.toLowerCase().includes(urlCat.toLowerCase()));
    if (selectedCats.length)  list = list.filter(p => selectedCats.includes(p.category));
    if (selectedBrands.length)list = list.filter(p => selectedBrands.includes(p.brand));
    list = list.filter(p => p.price <= priceMax);
    switch (sort) {
      case 'price-asc':  list.sort((a,b) => a.price - b.price); break;
      case 'price-desc': list.sort((a,b) => b.price - a.price); break;
      case 'rating':     list.sort((a,b) => b.rating - a.rating); break;
      case 'newest':     list.sort((a,b) => b.id - a.id); break;
    }
    return list;
  }, [sort, selectedCats, selectedBrands, priceMax, urlCat, urlTag]);

  const toggleCat   = c => setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleBrand = b => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const clearFilters = () => { setSelectedCats([]); setSelectedBrands([]); setPriceMax(1100); };
  const hasFilters = selectedCats.length || selectedBrands.length || priceMax < 1100;

  const titleText = urlCat ? urlCat.charAt(0).toUpperCase() + urlCat.slice(1)
    : urlTag ? urlTag.charAt(0).toUpperCase() + urlTag.slice(1) + 's' : 'All Products';

  return (
    <>
      {/* Page Header */}
      <div className="bg-white py-5 border-b border-gray-100 mb-10">
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-[0.82rem] text-gray-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-700 font-semibold">{titleText}</span>
          </nav>
          <div className="flex items-center justify-between mt-2.5">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{titleText}</h1>
            <span className="text-[0.88rem] text-gray-400">{filtered.length} results</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* SIDEBAR */}
          <aside className="bg-white rounded-2xl border-[1.5px] border-gray-100 p-6 lg:sticky lg:top-[88px]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[0.95rem] text-gray-800">Filters</span>
              {hasFilters && (
                <button onClick={clearFilters} className="text-[0.78rem] text-blue-600 bg-transparent border-none font-semibold cursor-pointer">
                  Clear all
                </button>
              )}
            </div>

            <FilterSection title="Category">
              {categories.map(cat => (
                <FilterCheckbox key={cat.id} label={cat.name} count={cat.count}
                  checked={selectedCats.includes(cat.name)} onChange={() => toggleCat(cat.name)} />
              ))}
            </FilterSection>

            <FilterSection title="Price Range">
              <div className="flex justify-between text-[0.82rem] text-gray-500 mb-2.5">
                <span>$0</span>
                <span className="font-bold text-blue-600">${priceMax}</span>
              </div>
              <input type="range" min={0} max={1100} step={10} value={priceMax}
                onChange={e => setPriceMax(+e.target.value)} className="w-full accent-blue-600" />
            </FilterSection>

            <FilterSection title="Brand">
              {BRANDS.map(b => (
                <FilterCheckbox key={b} label={b}
                  checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
              ))}
            </FilterSection>

            <FilterSection title="Min Rating">
              {[4, 3, 2].map(r => (
                <div key={r} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                  <input type="radio" name="rating" id={`r${r}`} className="accent-blue-600" />
                  <label htmlFor={`r${r}`} className="text-sm text-gray-600 cursor-pointer flex-1 flex items-center justify-between">
                    <span>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={`text-[0.85rem] ${i < r ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                      ))}
                    </span>
                    <span className="ml-1">& up</span>
                  </label>
                </div>
              ))}
            </FilterSection>
          </aside>

          {/* PRODUCTS */}
          <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b-[1.5px] border-gray-100">
              <span className="text-[0.88rem] text-gray-500">
                Showing <span className="font-semibold text-gray-800">{filtered.length}</span> results
              </span>
              <div className="flex items-center gap-3">
                <select className="h-10 px-3.5 pr-9 border-[1.5px] border-gray-200 rounded-lg text-sm text-gray-700 bg-white appearance-none cursor-pointer outline-none focus:border-blue-600 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2012%2012%27%3E%3Cpath%20fill=%27%2364748b%27%20d=%27M6%208L1%203h10z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center]"
                  value={sort} onChange={e => setSort(e.target.value)}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="flex gap-1">
                  {[
                    { v: 'grid', Icon: LayoutGrid },
                    { v: 'list', Icon: List },
                  ].map(({ v, Icon }) => (
                    <button key={v}
                      className={`w-9 h-9 rounded-lg border-[1.5px] flex items-center justify-center transition-all ${view === v ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-200 text-gray-500 bg-white hover:border-blue-600 hover:text-blue-600'}`}
                      onClick={() => setView(v)} aria-label={`${v} view`}>
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCats.map(c => <FilterChip key={c} label={c} onRemove={() => toggleCat(c)} />)}
                {selectedBrands.map(b => <FilterChip key={b} label={b} onRemove={() => toggleBrand(b)} />)}
                {priceMax < 1100 && <FilterChip label={`Under $${priceMax}`} onRemove={() => setPriceMax(1100)} />}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-base font-semibold text-gray-600">No products found</p>
                <p className="text-sm mt-1.5">Try adjusting your filters</p>
                <button className="btn btn-outline mt-5" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                {filtered.map(p =>
                  view === 'grid'
                    ? <ProductCard key={p.id} product={p} />
                    : <ProductListCard key={p.id} product={p} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Sub-components ── */

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="py-5 border-b border-gray-100 last:border-b-0">
      <h3 className="text-[0.85rem] font-bold tracking-wider uppercase text-gray-700 mb-3.5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(o => !o)}>
        {title}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </h3>
      {open && <div>{children}</div>}
    </div>
  );
}

function FilterCheckbox({ label, count, checked, onChange }) {
  return (
    <div className="flex items-center gap-2.5 py-[7px] cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} id={`cb-${label}`}
        className="w-4 h-4 accent-blue-600 cursor-pointer" />
      <label htmlFor={`cb-${label}`} className="text-sm text-gray-600 cursor-pointer flex-1 flex items-center justify-between">
        {label}
        {count && <span className="text-[0.72rem] text-gray-400 bg-gray-100 px-2 py-px rounded-full">{count}</span>}
      </label>
    </div>
  );
}

function FilterChip({ label, onRemove }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[0.78rem] font-semibold">
      {label}
      <button onClick={onRemove} className="bg-transparent border-none text-blue-600 cursor-pointer p-0 leading-none flex">
        <X size={12} />
      </button>
    </div>
  );
}

function ProductListCard({ product }) {
  const [added, setAdded] = useState(false);
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white border-[1.5px] border-gray-100 rounded-2xl p-4 flex gap-5 items-center transition-all hover:shadow-md">
        <div className="w-[100px] h-[100px] rounded-xl overflow-hidden shrink-0 bg-gray-50">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-blue-600 font-semibold">{product.brand}</div>
          <div className="text-[0.95rem] font-semibold text-gray-800 mt-1 mb-1 line-clamp-2">{product.name}</div>
          <div className="flex items-center gap-1.5 text-[0.78rem] text-gray-400">
            <span className="text-yellow-400">★</span> {product.rating} ({product.reviews.toLocaleString()} reviews)
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[1.1rem] font-extrabold text-gray-900">${product.price}</div>
          {product.originalPrice > product.price && (
            <div className="text-[0.8rem] text-gray-400 line-through">${product.originalPrice}</div>
          )}
          <button className={`btn btn-sm mt-2.5 ${added ? 'btn-accent' : 'btn-primary'}`}
            onClick={e => { e.preventDefault(); setAdded(true); setTimeout(() => setAdded(false), 1500); }}>
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
