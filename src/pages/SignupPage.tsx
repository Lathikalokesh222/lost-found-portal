import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ui/Toast';
import './SignupPage.css';

export function SignupPage() {
  const { signUp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      addToast('Registration successful! Please sign in.', 'success');
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      addToast(err.message || 'Failed to sign up.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page page-container">
      <div className="signup-page__container container container--narrow animate-scale-in">
        <div className="glass-card signup-page__card">
          <div className="signup-page__header">
            <div className="signup-page__logo">📍</div>
            <h1 className="signup-page__title">Create Account</h1>
            <p className="signup-page__subtitle">Join Findly to start recovering misplaced belongings</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-page__form">
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              error={errors.fullName}
              icon={<User size={18} />}
              required
            />

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

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              error={errors.confirmPassword}
              icon={<Lock size={18} />}
              required
            />

            <div className="signup-page__form-options">
              <Link to="/login" className="signup-page__link">
                Already have an account? Log in
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="signup-page__submit"
              loading={loading}
              icon={<UserPlus size={18} />}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
