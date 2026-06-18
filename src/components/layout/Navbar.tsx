import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Search, Menu, X, LogOut, User, LayoutDashboard, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import './Navbar.css';

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search', icon: <Search size={16} /> },
    { path: '/report/lost', label: 'Report Lost' },
    { path: '/report/found', label: 'Report Found' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login');
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
              <div className="navbar__user-container">
                <button
                  className="navbar__user"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  <span className="navbar__user-avatar">
                    <User size={16} />
                  </span>
                  <span className="navbar__username">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </button>
                {dropdownOpen && (
                  <>
                    <div className="navbar__dropdown-overlay" onClick={() => setDropdownOpen(false)} />
                    <div className="navbar__dropdown glass">
                      <div className="navbar__dropdown-header">
                        <p className="navbar__dropdown-name">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="navbar__dropdown-email">{user.email}</p>
                      </div>
                      <div className="navbar__dropdown-divider" />
                      <Link
                        to="/my-reports"
                        className="navbar__dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FileText size={14} />
                        My Reports
                      </Link>
                      <Link
                        to="/admin"
                        className="navbar__dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={14} />
                        Admin Dashboard
                      </Link>
                      <div className="navbar__dropdown-divider" />
                      <button
                        className="navbar__dropdown-item navbar__dropdown-item--danger"
                        onClick={() => {
                          setDropdownOpen(false);
                          handleSignOut();
                        }}
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
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
