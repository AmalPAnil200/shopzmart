import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Check,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { cartItems, subtotal } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Logic like API calls would go here
    alert("Order placed! Thank you for shopping at ShpozMart.");

    // Redirect to home page
    navigate("/");
  };

  const shippingFee = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingFee + tax;

  const validateShipping = () => {
    const errs = {};
    ["firstName", "lastName", "email", "address", "city", "zip"].forEach(
      (f) => {
        if (!shipping[f]) errs[f] = "Required";
      },
    );
    if (shipping.email && !/^[^@]+@[^@]+\.[^@]+$/.test(shipping.email))
      errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && !validateShipping()) return;
    setCurrentStep((s) => Math.min(s + 1, 2));
  };
  const handleChange = (f, v) => {
    setShipping((prev) => ({ ...prev, [f]: v }));
    if (errors[f])
      setErrors((prev) => {
        const e = { ...prev };
        delete e[f];
        return e;
      });
  };

  return (
    <>
      <div className="bg-white py-5 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex items-center gap-1.5 text-[0.82rem] text-gray-400">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <Link to="/cart" className="hover:text-blue-600">
              Cart
            </Link>
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-700 font-semibold">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-20">
        {/* Steps */}
        <div className="flex items-center max-w-[480px] mb-10 mt-8">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-2.5 flex-1 relative  ${i < currentStep ? "done" : ""}`}
            >
              {i > 0 && (
                <div
                  className={`absolute right-[calc(100%-18px)]  top-1/2 -translate-y-1/2 w-[calc(100%-36px)] h-0.5 ${i <= currentStep ? "bg-blue-600" : "bg-gray-200"}`}
                />
              )}
              <div
                className={`w-9 h-9 rounded-full text-[0.82rem] font-bold flex items-center justify-center shrink-0 relative z-10 transition-all
                ${i < currentStep ? "bg-emerald-500 text-white" : i === currentStep ? "bg-blue-600 text-white shadow-blue" : "bg-gray-200 text-gray-500"}`}
              >
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-[0.8rem] z-50 bg-white mb-1 font-semibold ${i === currentStep ? "text-blue-600" : i < currentStep ? "text-emerald-500" : "text-gray-400"}`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Left */}
          <div>
            {/* STEP 0 */}
            {currentStep === 0 && (
              <div className="bg-white rounded-2xl p-8 border-[1.5px] border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    id="firstName"
                    value={shipping.firstName}
                    onChange={(v) => handleChange("firstName", v)}
                    error={errors.firstName}
                  />
                  <FormField
                    label="Last Name"
                    id="lastName"
                    value={shipping.lastName}
                    onChange={(v) => handleChange("lastName", v)}
                    error={errors.lastName}
                  />
                  <FormField
                    label="Email"
                    id="email"
                    type="email"
                    value={shipping.email}
                    onChange={(v) => handleChange("email", v)}
                    error={errors.email}
                  />
                  <FormField
                    label="Phone (optional)"
                    id="phone"
                    type="tel"
                    value={shipping.phone}
                    onChange={(v) => handleChange("phone", v)}
                  />
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[0.8rem] font-semibold text-gray-600 tracking-wide">
                      Street Address
                    </label>
                    <input
                      className={`form-input ${errors.address ? "error" : ""}`}
                      type="text"
                      placeholder="123 Main St Apt 4B"
                      value={shipping.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                    {errors.address && (
                      <span className="text-xs text-red-500 mt-0.5">
                        {errors.address}
                      </span>
                    )}
                  </div>
                  <FormField
                    label="City"
                    id="city"
                    value={shipping.city}
                    onChange={(v) => handleChange("city", v)}
                    error={errors.city}
                  />
                  <FormField
                    label="ZIP / Postal Code"
                    id="zip"
                    value={shipping.zip}
                    onChange={(v) => handleChange("zip", v)}
                    error={errors.zip}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-gray-600 tracking-wide">
                      State / Province
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="CA"
                      value={shipping.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-gray-600 tracking-wide">
                      Country
                    </label>
                    <select
                      className="form-input"
                      value={shipping.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-8 border-[1.5px] border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    {
                      id: "card",
                      Icon: CreditCard,
                      name: "Credit / Debit Card",
                      desc: "Visa, Mastercard, Amex",
                      icons: ["Visa", "MC", "Amex"],
                    },
                    {
                      id: "paypal",
                      Icon: Smartphone,
                      name: "PayPal",
                      desc: "Fast & secure checkout",
                      icons: ["PayPal"],
                    },
                    {
                      id: "bank",
                      Icon: Building2,
                      name: "Bank Transfer",
                      desc: "Direct bank payment",
                      icons: ["Bank"],
                    },
                  ].map(({ id, Icon, name, desc, icons }) => (
                    <div
                      key={id}
                      className={`border-2 rounded-xl px-5 py-4 flex items-center gap-3.5 cursor-pointer transition-all ${paymentMethod === id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                      onClick={() => setPaymentMethod(id)}
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${paymentMethod === id ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}
                      >
                        {paymentMethod === id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <Icon
                        size={20}
                        className={
                          paymentMethod === id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }
                      />
                      <div>
                        <div className="font-semibold text-[0.9rem] text-gray-800">
                          {name}
                        </div>
                        <div className="text-[0.78rem] text-gray-400">
                          {desc}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        {icons.map((i) => (
                          <span
                            key={i}
                            className="h-6 px-1.5 border border-gray-200 rounded text-[0.7rem] font-bold text-gray-600 flex items-center bg-white"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-gray-600">
                        Card Number
                      </label>
                      <input
                        className="form-input"
                        placeholder="•••• •••• •••• ••••"
                        maxLength={19}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-gray-600">
                        Cardholder Name
                      </label>
                      <input className="form-input" placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold text-gray-600">
                          Expiry Date
                        </label>
                        <input
                          className="form-input"
                          placeholder="MM / YY"
                          maxLength={7}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold text-gray-600">
                          CVV
                        </label>
                        <input
                          className="form-input"
                          placeholder="•••"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "paypal" && (
                  <div className="text-center py-8 bg-gray-50 rounded-2xl border-[1.5px] border-gray-100">
                    <div className="text-3xl mb-2">🅿️</div>
                    <p className="text-gray-600 text-[0.9rem]">
                      You'll be redirected to PayPal to complete payment.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-emerald-500/[0.06] rounded-lg border border-emerald-500/20">
                  <Lock size={14} className="text-emerald-500" />
                  <span className="text-[0.78rem] text-emerald-500 font-semibold">
                    Secured by 256-bit SSL encryption
                  </span>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-8 border-[1.5px] border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Review Your Order
                </h2>

                <div className="bg-gray-50 rounded-2xl p-5 mb-5">
                  <div className="flex justify-between mb-2.5">
                    <span className="font-bold text-sm text-gray-800">
                      Shipping To
                    </span>
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="text-[0.78rem] text-blue-600 bg-transparent border-none font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {shipping.firstName || "John"} {shipping.lastName || "Doe"}
                    <br />
                    {shipping.address || "123 Main St"},{" "}
                    {shipping.city || "San Francisco"},{" "}
                    {shipping.zip || "94105"}
                    <br />
                    {shipping.email || "john@example.com"}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-3.5 items-center p-3 bg-white border border-gray-100 rounded-xl"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-[60px] h-[60px] object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-800">
                          {item.product.name}
                        </div>
                        <div className="text-[0.78rem] text-gray-400">
                          Qty: {item.qty}
                          {item.variant ? ` · ${item.variant}` : ""}
                        </div>
                      </div>
                      <div className="font-bold text-gray-900">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-primary btn-full btn-lg mt-7"
                  onClick={handlePlaceOrder}
                >
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            )}

            {currentStep < 2 && (
              <div className="flex justify-between mt-5">
                {currentStep > 0 ? (
                  <button
                    className="btn btn-ghost"
                    onClick={() => setCurrentStep((s) => s - 1)}
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
                <button className="btn btn-primary btn-lg" onClick={handleNext}>
                  {currentStep === 1
                    ? "Review Order →"
                    : "Continue to Payment →"}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          <div className="bg-white rounded-2xl p-7 border-[1.5px] border-gray-100 lg:sticky lg:top-[88px]">
            <h3 className="text-[1.1rem] font-bold mb-5 text-gray-900">
              Order Summary
            </h3>
            {cartItems.slice(0, 3).map((item) => (
              <div
                key={item.key}
                className="flex gap-3 items-center pb-3 mb-3 border-b border-gray-100"
              >
                <div className="relative">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-[52px] h-[52px] object-cover rounded-lg"
                  />
                  <span className="absolute -top-1.5 -right-1.5 bg-gray-700 text-white w-[18px] h-[18px] rounded-full text-[0.65rem] font-bold flex items-center justify-center">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.82rem] font-semibold text-gray-800 line-clamp-1">
                    {item.product.name}
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-900 shrink-0">
                  ${(item.product.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
            {cartItems.length > 3 && (
              <p className="text-[0.78rem] text-gray-400 mb-3">
                +{cartItems.length - 3} more items
              </p>
            )}

            <div className="flex justify-between py-2.5 text-[0.9rem] border-b border-gray-100">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-800">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-2.5 text-[0.9rem] border-b border-gray-100">
              <span className="text-gray-500">Shipping</span>
              <span
                className={`font-semibold ${shippingFee === 0 ? "text-emerald-500" : "text-gray-800"}`}
              >
                {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between py-2.5 text-[0.9rem]">
              <span className="text-gray-500">Tax</span>
              <span className="font-semibold text-gray-800">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-4 mt-2 border-t-2 border-gray-200 font-extrabold text-[1.1rem] text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FormField({ label, id, type = "text", value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[0.8rem] font-semibold text-gray-600 tracking-wide"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`form-input ${error ? "error" : value ? "success" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
