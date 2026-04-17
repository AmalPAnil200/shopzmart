import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ChevronRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax      = subtotal * 0.08;
  const total    = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-[120px] px-6">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-7">Looks like you haven't added anything yet.</p>
        <Link to="/products"><button className="btn btn-primary btn-lg"><ShoppingBag size={18} /> Explore Products</button></Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white py-4 sm:py-5 border-b border-gray-100 mb-6 sm:mb-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-[0.78rem] sm:text-[0.82rem] text-gray-400">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={11} className="text-gray-300" />
            <span className="text-gray-700 font-semibold">Shopping Cart</span>
          </nav>
          <div className="flex items-center justify-between mt-2 sm:mt-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
            <span className="text-[0.82rem] sm:text-[0.88rem] text-gray-400">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
          {/* Items */}
          <div>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-[0.85rem] text-blue-600 font-semibold mb-5">
              <ArrowLeft size={14} /> Continue Shopping
            </Link>

            <div className="flex flex-col gap-3 sm:gap-4">
              {cartItems.map(item => (
                <div key={item.key} className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex gap-3.5 sm:gap-5 border-[1.5px] border-gray-100 transition-shadow hover:shadow-sm">
                  {/* ── Image ── */}
                  <Link to={`/product/${item.product.id}`} className="w-[84px] h-[84px] sm:w-[100px] sm:h-[100px] rounded-lg sm:rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* ── Details Area ── */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Top: Title & Respective Trailing Items */}
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <Link to={`/product/${item.product.id}`} className="text-[0.9rem] sm:text-[0.95rem] font-semibold text-gray-800 hover:text-blue-600 leading-snug line-clamp-2 sm:truncate">
                        {item.product.name}
                      </Link>
                      
                      {/* Desktop Price */}
                      <div className="hidden sm:block text-right whitespace-nowrap">
                        <div className="text-[1.05rem] font-extrabold text-gray-900">${(item.product.price * item.qty).toFixed(2)}</div>
                      </div>
                      
                      {/* Mobile Trash */}
                      <button className="sm:hidden bg-transparent border-none text-gray-400 p-1 -mt-1 -mr-1 hover:text-red-500 transition-colors shrink-0" onClick={() => removeFromCart(item.key)}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Brand / Variant */}
                    <div className="text-[0.75rem] sm:text-[0.8rem] text-gray-400 mb-3 truncate">
                      {item.product.brand}{item.variant ? ` · Size: ${item.variant}` : ''}
                    </div>

                    {/* Bottom: Controls & Price */}
                    <div className="flex items-end sm:items-center justify-between mt-auto">
                      {/* Quantity & Desktop Trash */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border-[1.5px] border-gray-200 rounded-lg overflow-hidden h-8 sm:h-10">
                          <button className="w-8 sm:w-10 h-full bg-gray-50 text-gray-600 flex items-center justify-center border-none hover:bg-gray-100" onClick={() => updateQty(item.key, item.qty - 1)}>
                            <Minus size={14} />
                          </button>
                          <span className="w-8 sm:w-9 text-center font-bold text-[0.85rem] sm:text-[0.9rem]">{item.qty}</span>
                          <button className="w-8 sm:w-10 h-full bg-gray-50 text-gray-600 flex items-center justify-center border-none hover:bg-gray-100" onClick={() => updateQty(item.key, item.qty + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button className="hidden sm:block bg-transparent border-none text-gray-400 hover:text-red-500 transition-colors" onClick={() => removeFromCart(item.key)}>
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Mobile Price */}
                      <div className="sm:hidden text-right whitespace-nowrap">
                        <div className="text-[0.95rem] font-extrabold text-gray-900">${(item.product.price * item.qty).toFixed(2)}</div>
                        {item.qty > 1 && <div className="text-[0.65rem] text-gray-400 font-normal">${item.product.price}/ea</div>}
                      </div>

                      {/* Desktop 'Each' Price */}
                      {item.qty > 1 && (
                        <div className="hidden sm:block text-xs text-gray-400 font-normal ml-auto">
                          ${item.product.price} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-7 border-[1.5px] border-gray-100 lg:sticky lg:top-[88px]">
            <h3 className="text-[1.1rem] font-bold mb-5 text-gray-900">Order Summary</h3>

            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Coupon code" className="form-input flex-1 h-[42px] text-sm" />
              <button className="btn btn-ghost btn-sm">Apply</button>
            </div>

            <div className="flex justify-between items-center py-2.5 text-[0.9rem] border-b border-gray-100">
              <span className="text-gray-500">Subtotal ({cartItems.reduce((s,i) => s + i.qty, 0)} items)</span>
              <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 text-[0.9rem] border-b border-gray-100">
              <span className="text-gray-500">Shipping</span>
              <span className={`font-semibold ${shipping === 0 ? 'text-emerald-500' : 'text-gray-800'}`}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5 text-[0.9rem]">
              <span className="text-gray-500">Tax (8%)</span>
              <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-200 font-extrabold text-[1.1rem] text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="block mt-5">
              <button className="btn btn-primary btn-full btn-lg">Proceed to Checkout</button>
            </Link>

            {shipping > 0 && (
              <p className="text-[0.78rem] text-gray-400 text-center mt-3">
                Add ${(50 - subtotal).toFixed(2)} more for <strong>free shipping</strong>
              </p>
            )}

            <div className="border-t border-gray-100 mt-5 pt-4 flex gap-2 flex-wrap">
              {['🔒 Secure Checkout', '🔄 Easy Returns', '🚚 Fast Delivery'].map(t => (
                <span key={t} className="text-[0.72rem] text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>

            <div className="flex gap-1.5 justify-center mt-4">
              {['Visa', 'MC', 'PayPal', 'Amex', 'Apple Pay'].map(p => (
                <span key={p} className="px-2 py-1 border border-gray-200 rounded text-[0.65rem] font-bold text-gray-500 bg-white">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
