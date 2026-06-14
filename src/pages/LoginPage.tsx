import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import './LoginPage.css';

export function LoginPage() {
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signIn(email, password);
      addToast('Welcome back to Findly!', 'success');
      navigate('/');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Failed to sign in. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page page-container">
      <div className="login-page__container container container--narrow animate-scale-in">
        <div className="glass-card login-page__card">
          <div className="login-page__header">
            <div className="login-page__logo">📍</div>
            <h1 className="login-page__title">Welcome Back</h1>
            <p className="login-page__subtitle">Sign in to report and track items</p>
          </div>

          <form onSubmit={handleSubmit} className="login-page__form">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@college.edu"
              error={errors.email}
              icon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              icon={<Lock size={18} />}
              required
            />

            <div className="login-page__form-options">
              <Link to="/signup" className="login-page__link">
                Don't have an account? Sign up
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="login-page__submit"
              loading={loading}
              icon={<LogIn size={18} />}
            >
              Sign In
            </Button>
          </form>

          <div className="login-page__divider">
            <span>or continue with</span>
          </div>

          <Button
            variant="secondary"
            className="login-page__google"
            onClick={() => {
              addToast('Google Auth integration is prepared. Check Supabase setup.', 'info');
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" className="google-icon">
              <path
                fill="#EA4335"
                d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.65 1.58 15.02 1 12 1 7.37 1 3.41 3.65 1.5 7.51l3.79 2.94c.89-2.67 3.39-4.41 6.71-4.41z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.87c2.16-1.99 3.74-4.92 3.74-8.54z"
              />
              <path
                fill="#FBBC05"
                d="M5.29 14.51c-.23-.68-.36-1.42-.36-2.18s.13-1.5.36-2.18L1.5 7.21C.54 9.15 0 11.24 0 13.43s.54 4.28 1.5 6.22l3.79-2.94c-.23-.68-.36-1.42-.36-2.18z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.69-2.87c-1.02.68-2.33 1.09-3.95 1.09-3.32 0-5.82-2.16-6.71-4.83l-3.79 2.94C3.41 20.35 7.37 23 12 23z"
              />
            </svg>
            Google Credentials
          </Button>
        </div>
      </div>
    </div>
  );
}
