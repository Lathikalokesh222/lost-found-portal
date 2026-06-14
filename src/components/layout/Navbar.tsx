import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Menu, X, LogOut, User, LayoutDashboard, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import './Navbar.css';

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search', icon: <Search size={16} /> },
    { path: '/report/lost', label: 'Report Lost' },
    { path: '/report/found', label: 'Report Found' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="navbar glass">
      <nav className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">📍</span>
          <span className="navbar__logo-text gradient-text">Findly</span>
        </Link>

        {/* Desktop nav */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${isActive(link.path) ? 'navbar__link--active' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar__actions">
          {user ? (
            <>
              <Link
                to="/my-reports"
                className={`navbar__link ${isActive('/my-reports') ? 'navbar__link--active' : ''}`}
              >
                <FileText size={16} />
                My Reports
              </Link>
              <Link
                to="/admin"
                className={`navbar__link ${isActive('/admin') ? 'navbar__link--active' : ''}`}
              >
                <LayoutDashboard size={16} />
                Admin
              </Link>
              <div className="navbar__user">
                <span className="navbar__user-avatar">
                  <User size={16} />
                </span>
                <button className="navbar__signout" onClick={handleSignOut} title="Sign out">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="navbar__auth">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="navbar__mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="navbar__mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="navbar__mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`navbar__mobile-link ${isActive(link.path) ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to="/my-reports"
                    className="navbar__mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Reports
                  </Link>
                  <Link
                    to="/admin"
                    className="navbar__mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <button className="navbar__mobile-link navbar__mobile-signout" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </>
              )}
              {!user && (
                <div className="navbar__mobile-auth">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" size="md" className="navbar__mobile-btn">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" size="md" className="navbar__mobile-btn">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
