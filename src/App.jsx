import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from 'react';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

// ==================== AUTH CONTEXT ====================
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('vibe-user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = (email) => {
    const userData = { email, name: email.split('@')[0] };
    localStorage.setItem('vibe-user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('vibe-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// ==================== HEADER ====================
const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeClass = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header" style={{ height: '72px' }}>
      <div className="header-inner" style={{ height: '72px' }}>
        <Link to="/" className="logo">
          <div className="logo-icon">VC</div>
          VibeCode101
        </Link>

        <nav>
          <ul className="nav-links">
            <li><Link to="/" className={`nav-link ${activeClass('/')}`}>Home</Link></li>
            <li><Link to="/pricing" className={`nav-link ${activeClass('/pricing')}`}>Pricing</Link></li>
            <li><Link to="/contact" className={`nav-link ${activeClass('/contact')}`}>Contact</Link></li>
            <li><Link to="#" onClick={(e) => e.preventDefault()} className={`nav-link`}>Blog</Link></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Hi, {user.name}</span>
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '7px 14px', fontSize: '0.82rem' }}>Dashboard</Link>
              <button className="btn btn-ghost" onClick={logout} style={{ padding: '6px 10px' }}>Log out</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button className="btn btn-ghost" onClick={() => navigate('/login')} style={{ padding: '6px 10px' }}>Log in</button>
              <button className="btn btn-primary" onClick={() => navigate('/signup')} style={{ padding: '7px 14px', fontSize: '0.82rem' }}>Get Started</button>
            </div>
          )}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ padding: '8px 12px', borderRadius: '4px' }}>Home</Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ padding: '8px 12px', borderRadius: '4px' }}>Pricing</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ padding: '8px 12px', borderRadius: '4px' }}>Contact</Link>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ padding: '8px 12px', borderRadius: '4px' }}>Dashboard</Link>
        </div>
      )}
    </header>
  );
};

// ==================== FOOTER ====================
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>VibeCode101</h3>
            <p>Ship production-ready applications fast with AI-assisted workflows.</p>
          </div>
          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">API Docs</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 VibeCode101. All rights reserved.</span>
          <span>
            <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

// ==================== COOKIE BANNER ====================
const CookieBanner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="cookie-banner">
      <p>We use cookies to improve your experience. By continuing, you agree to our cookie policy.</p>
      <div className="cookie-buttons">
        <button className="btn btn-secondary" onClick={() => setVisible(false)}>Decline</button>
        <button className="btn btn-primary" onClick={() => setVisible(false)}>Accept All</button>
      </div>
    </div>
  );
};

// ==================== AUTH PAGE ====================
const AuthPage = ({ isSignup }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState('email');

  useEffect(() => {
    setPassword('');
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/' + (isSignup ? 'register' : 'login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        login(data.user.email);
        navigate('/dashboard');
      } else {
        alert('Something went wrong. Try again.');
      }
    } catch (err) {
      alert('Could not connect to server. Please try again.');
    }
  };

  return (
    <div style={{ padding: '60px 0', background: 'var(--color-bg-secondary)', minHeight: '60vh' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          padding: '36px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 4 }}>
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginBottom: 20 }}>
            {isSignup ? 'Start learning today. No credit card required.' : 'Log in to access your courses.'}
          </p>

          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {['Email', 'Google', 'GitHub'].map((name) => (
              <button
                key={name}
                className={`btn ${method === name.toLowerCase() ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMethod(name.toLowerCase())}
                style={{ flex: 1, padding: '8px 6px', fontSize: '0.82rem' }}
              >
                {name}
              </button>
            ))}
          </div>

          {method === 'email' && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 5 }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  id="email"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '0.88rem',
                    fontFamily: 'system-ui, sans-serif',
                    background: 'var(--color-bg)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 5 }}>Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  id="password"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '0.88rem',
                    fontFamily: 'system-ui, sans-serif',
                    background: 'var(--color-bg)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {isSignup && (
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: 20 }}>
                  Password must be at least 8 characters.
                </div>
              )}

              {/* BUG: no type="submit" — button is just a reset button */}
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                style={{ width: '100%', padding: '12px 20px', fontSize: '0.9rem', marginBottom: 14 }}
              >
                {isSignup ? 'Create account' : 'Log in'}
              </button>

              {/* BUG: anchor link just reloads page */}
              <div style={{ textAlign: 'center' }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.82rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
            </form>
          )}

          {method === 'google' && (
            <button
              className="social-btn"
              onClick={() => window.open('https://accounts.google.com', '_blank')}
            >
              Sign in with Google
            </button>
          )}

          {method === 'github' && (
            <button
              className="social-btn"
              onClick={() => window.open('https://github.com/login', '_blank')}
            >
              Sign in with GitHub
            </button>
          )}

          <div className="divider">or</div>

          <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <Link to={isSignup ? '/login' : '/signup'} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              {isSignup ? 'Log in' : 'Sign up'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== APP CONTENT ====================
const AppContent = () => {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<AuthPage isSignup={false} />} />
          <Route path="/signup" element={<AuthPage isSignup={true} />} />
        </Routes>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

console.log('vite:ready');
console.error('useEffect initialized');
console.error('auth state: checking localStorage');
console.error('TODO: implement login properly');

export default App;
