import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) errs.email = 'Invalid email address';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) alert('Login successful! Demo only.');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Visual side */}
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)' }}>
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-md text-center text-white">
          <div className="text-5xl mb-5">🛒</div>
          <h2 className="text-[1.875rem] font-extrabold tracking-tight mb-4">Welcome Back to ShpozMart</h2>
          <p className="text-white/70 text-[0.95rem] leading-relaxed mb-10">
            Access your account, track orders, and explore deals. Your next great find is just a login away.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: '50K+', l: 'Products' },
              { v: '99%',  l: 'Satisfaction' },
              { v: '24/7', l: 'Support' },
              { v: '120K', l: 'Happy Users' },
            ].map(s => (
              <div key={s.l} className="bg-white/[0.08] rounded-xl py-3 px-4 border border-white/10">
                <div className="text-lg font-extrabold text-white">{s.v}</div>
                <div className="text-[0.72rem] text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600 mb-2 block text-center lg:text-left">
            Shpoz<span className="text-yellow-600">Mart</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 text-center lg:text-left">Sign in to your account</h1>
          <p className="text-gray-400 text-sm mb-7 text-center lg:text-left">
            New here?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold">Create an account →</Link>
          </p>

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
            <span className="text-[0.78rem] text-gray-400 font-medium">or continue with email</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="login-email">Email Address</label>
              <input id="login-email" type="email"
                className={`form-input w-full ${errors.email ? 'error' : email ? 'success' : ''}`}
                placeholder="you@example.com" value={email}
                onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[0.8rem] font-semibold text-gray-600" htmlFor="login-password">Password</label>
                <a href="#" className="text-[0.78rem] text-blue-600 font-semibold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input id="login-password"
                  type={showPw ? 'text' : 'password'}
                  className={`form-input w-full pr-11 ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••" value={password}
                  onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: '' })); }}
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer flex">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="accent-blue-600" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">Remember me for 30 days</label>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg mt-1">Sign In</button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold">Sign up for free →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
