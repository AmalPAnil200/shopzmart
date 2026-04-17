import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';

const STRENGTH_LEVELS = ['', 'weak', 'fair', 'good', 'strong'];
const STRENGTH_COLORS = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '', agree: false });
  const [showPw, setShowPw]           = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors]           = useState({});

  const strength = getStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = 'Required';
    if (!form.lastName)  errs.lastName  = 'Required';
    if (!form.email)     errs.email = 'Required';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password)  errs.password = 'Required';
    else if (form.password.length < 8) errs.password = 'Min 8 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!form.agree) errs.agree = 'You must agree to the terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) alert('Account created! Welcome to ShpozMart 🎉');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Visual side */}
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)' }}>
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-md text-center text-white">
          <div className="text-5xl mb-5">✨</div>
          <h2 className="text-[1.875rem] font-extrabold tracking-tight mb-4">Join ShpozMart Today</h2>
          <p className="text-white/70 text-[0.95rem] leading-relaxed mb-9">
            Create your free account and start exploring thousands of products with exclusive member benefits.
          </p>
          <div className="text-left flex flex-col gap-3.5">
            {[
              'Exclusive member-only deals & early access',
              'Track orders and manage returns easily',
              'Personalized recommendations',
              'Save items to wishlists across devices',
            ].map(benefit => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-yellow-300" />
                </div>
                <span className="text-sm text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600 mb-2 block text-center lg:text-left">
            Shpoz<span className="text-yellow-600">Mart</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 text-center lg:text-left">Create your account</h1>
          <p className="text-gray-400 text-sm mb-6 text-center lg:text-left">Free forever. No credit card required.</p>

          <div className="flex gap-3 mb-5">
            <button className="flex-1 h-11 rounded-lg border-[1.5px] border-gray-200 bg-white text-sm font-semibold text-gray-600 flex items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-all">
              <span className="text-[1.1rem]">G</span> Google
            </button>
            <button className="flex-1 h-11 rounded-lg border-[1.5px] border-gray-200 bg-white text-sm font-semibold text-gray-600 flex items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-all">
              <span className="text-[1.1rem]">𝕏</span> Twitter
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-[0.78rem] text-gray-400 font-medium">or sign up with email</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="fn">First Name</label>
                <input id="fn" type="text" className={`form-input w-full ${errors.firstName ? 'error' : form.firstName ? 'success' : ''}`}
                  placeholder="John" value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="ln">Last Name</label>
                <input id="ln" type="text" className={`form-input w-full ${errors.lastName ? 'error' : form.lastName ? 'success' : ''}`}
                  placeholder="Doe" value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="signup-email">Email Address</label>
              <input id="signup-email" type="email" className={`form-input w-full ${errors.email ? 'error' : form.email ? 'success' : ''}`}
                placeholder="you@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="signup-password">Password</label>
              <div className="relative">
                <input id="signup-password" type={showPw ? 'text' : 'password'}
                  className={`form-input w-full pr-11 ${errors.password ? 'error' : ''}`}
                  placeholder="Min. 8 characters" value={form.password} onChange={e => handleChange('password', e.target.value)} />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer flex">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex-1 h-1 rounded" style={{ background: i <= strength ? STRENGTH_COLORS[strength] : '#e2e8f0', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <span className="text-[0.72rem] font-semibold capitalize mt-1 block" style={{ color: STRENGTH_COLORS[strength] }}>
                    {STRENGTH_LEVELS[strength]} password
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="signup-confirm">Confirm Password</label>
              <div className="relative">
                <input id="signup-confirm" type={showConfirm ? 'text' : 'password'}
                  className={`form-input w-full pr-11 ${errors.confirm ? 'error' : form.confirm && form.confirm === form.password ? 'success' : ''}`}
                  placeholder="Re-enter password" value={form.confirm} onChange={e => handleChange('confirm', e.target.value)} />
                <button type="button" onClick={() => setShowConfirm(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer flex">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm && <span className="text-xs text-red-500">{errors.confirm}</span>}
            </div>

            <div className="flex gap-2 items-start">
              <input type="checkbox" id="agree" className="accent-blue-600 mt-0.5 shrink-0"
                checked={form.agree} onChange={e => handleChange('agree', e.target.checked)} />
              <label htmlFor="agree" className="text-[0.82rem] text-gray-500 leading-6 cursor-pointer">
                I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600">Privacy Policy</a>
              </label>
            </div>
            {errors.agree && <span className="text-xs text-red-500 -mt-2">{errors.agree}</span>}

            <button type="submit" className="btn btn-primary btn-full btn-lg mt-1">Create Account</button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
