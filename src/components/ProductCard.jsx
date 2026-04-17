import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden border-[1.5px] border-gray-100 transition-all hover:border-gray-200 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
        />
        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
          <button
            className={`w-9 h-9 rounded-lg bg-white border-none flex items-center justify-center shadow-sm transition-all hover:text-blue-600 hover:shadow-blue ${wishlisted ? 'text-red-500' : 'text-gray-600'}`}
            onClick={e => { e.preventDefault(); setWishlisted(w => !w); }}
            aria-label="Wishlist"
          >
            <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            className="w-9 h-9 rounded-lg bg-white border-none text-gray-600 flex items-center justify-center shadow-sm transition-all hover:text-blue-600 hover:shadow-blue"
            onClick={e => e.preventDefault()}
            aria-label="Quick view"
          >
            <Eye size={15} />
          </button>
        </div>
        {/* Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3">
            <span className={`tag tag-${product.tag}`}>{product.tag}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[0.78rem] text-gray-400 mb-2">{product.brand}</p>
        <h3 className="text-[0.9rem] font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5 text-yellow-400">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} fill={i <= Math.round(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[1.1rem] font-extrabold text-gray-900 tracking-tight">${product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-[0.83rem] text-gray-400 line-through">${product.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-1.5 rounded-full">-{product.discount}%</span>
            </>
          )}
        </div>

        <button
          className={`btn btn-sm btn-full mt-3 ${added ? 'btn-accent' : 'btn-ghost'}`}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={14} />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
