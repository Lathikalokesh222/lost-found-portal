import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

// Assets
import studentUsingLaptop from '../../assets/illustrations/student-using-laptop.png';
import softLoginGradientBackground from '../../assets/backgrounds/soft-login-gradient-background.png';
import loginPageRadarNetwork from '../../assets/backgrounds/login-page-radar-network.png';
import blueBackpack from '../../assets/items/blue-backpack.png';
import blueWaterBottle from '../../assets/items/blue-water-bottle.png';
import blackWallet from '../../assets/items/black-wallet.png';
import carKeysWithKeychain from '../../assets/items/car-keys-with-keychain.png';
import smartphoneShowingFoundItem from '../../assets/items/smartphone-showing-found-item.png';
import secureLoginFloatingCard from '../../assets/ui/secure-login-floating-card.png';
import floatingSearchIconCard from '../../assets/ui/floating-search-icon-card.png';
import itemMatchedSuccessCard from '../../assets/ui/item-matched-success-card.png';
import securityFeaturesCard from '../../assets/ui/security-features-card.png';
import heroDecorativeLeaves from '../../assets/decorative/hero-decorative-leaves.png';

// ----------------------------------------------------
// 1. NavbarLogo Component
// ----------------------------------------------------
export function NavbarLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 select-none group mb-8">
      <img
        src="/findly-logo.svg"
        alt="Findly Logo"
        className="w-11 h-11 transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-wider text-slate-900 leading-none">
          FINDLY
        </span>
        <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-1">
          Lost & Found Portal
        </span>
      </div>
    </Link>
  );
}

// ----------------------------------------------------
// 2. InputField Component
// ----------------------------------------------------
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export function InputField({ label, icon, error, type = 'text', className = '', ...props }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col w-full text-left gap-1.5 ${className}`}>
      <label className="text-sm font-semibold text-slate-700 tracking-wide">{label}</label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          className={`w-full h-14 ${icon ? 'pl-11' : 'px-4'} ${isPassword ? 'pr-12' : 'pr-4'} rounded-2xl border ${
            error ? 'border-red-500 bg-red-50/5' : 'border-slate-200 bg-white'
          } text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-xs font-semibold text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}

// ----------------------------------------------------
// 3. PrimaryButton Component
// ----------------------------------------------------
interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function PrimaryButton({ children, loading, icon, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      type={props.type || 'button'}
      disabled={loading || props.disabled}
      className={`w-full h-14 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-400 text-white font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transform hover:-translate-y-[2px] ${className}`}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

// ----------------------------------------------------
// 4. SocialLoginButton Component
// ----------------------------------------------------
interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'microsoft';
  children: React.ReactNode;
}

export function SocialLoginButton({ provider, children, className = '', ...props }: SocialLoginButtonProps) {
  const isGoogle = provider === 'google';
  return (
    <button
      type="button"
      className={`w-full h-14 flex items-center justify-center gap-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all duration-200 hover:shadow-md active:scale-[0.99] ${className}`}
      {...props}
    >
      {isGoogle ? (
        <svg viewBox="0 0 24 24" width="20" height="20" className="flex-shrink-0">
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
      ) : (
        <svg viewBox="0 0 23 23" width="20" height="20" className="flex-shrink-0">
          <rect width="10.5" height="10.5" fill="#F25022" />
          <rect x="11.5" width="10.5" height="10.5" fill="#7FBA00" />
          <rect y="11.5" width="10.5" height="10.5" fill="#00A1F1" />
          <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
}

// ----------------------------------------------------
// 5. FloatingObject Component
// ----------------------------------------------------
interface FloatingObjectProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  animationClass?: string;
}

export function FloatingObject({ src, alt, style, className = '', animationClass = 'animate-float-slow' }: FloatingObjectProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none drop-shadow-2xl ${animationClass} ${className}`}
      style={style}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
}

// ----------------------------------------------------
// 6. FloatingCard Component
// ----------------------------------------------------
interface FloatingCardProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  animationClass?: string;
}

export function FloatingCard({ src, alt, style, className = '', animationClass = 'animate-float-medium' }: FloatingCardProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none drop-shadow-xl ${animationClass} ${className}`}
      style={style}
    >
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
}

// ----------------------------------------------------
// 7. HeroIllustration Component
// ----------------------------------------------------
export function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-screen flex flex-col justify-between overflow-hidden p-8 lg:p-16 select-none">
      {/* Background Gradient & Clouds */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${softLoginGradientBackground})` }}
      />

      {/* Radar Network Graphic behind student */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-80 mix-blend-multiply">
        <img 
          src={loginPageRadarNetwork} 
          alt="Radar network background" 
          className="w-[85%] max-w-[700px] object-contain animate-pulse-gentle"
        />
      </div>

      {/* Header Overlay Text */}
      <div className="relative z-30 self-start mt-4 max-w-md">
        {/* Trusted Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-slate-200/50 backdrop-blur-md shadow-sm mb-6 select-none">
          <CheckCircle2 size={14} className="text-blue-600" />
          <span className="text-[11px] font-bold text-slate-700 tracking-wide">
            Trusted by students, built for campuses
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
          Find Today.<br />
          <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
            Reunite Tomorrow.
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm lg:text-base font-semibold max-w-sm leading-relaxed">
          A smart platform to report, discover and recover lost items across campus.
        </p>
      </div>

      {/* Interactive Floating Items (Backpack, bottle, wallet, keys) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Secure Login Card (Top Center) */}
        <FloatingCard
          src={secureLoginFloatingCard}
          alt="Secure Login Card"
          style={{ top: '6%', left: '50%', width: '13%' }}
          animationClass="animate-float-slow"
        />

        {/* Blue Backpack (Upper Center) */}
        <FloatingObject
          src={blueBackpack}
          alt="Blue Backpack"
          style={{ top: '22%', left: '44%', width: '22%' }}
          animationClass="animate-float-slow"
        />

        {/* Floating Search Icon Card (Upper Right) */}
        <FloatingCard
          src={floatingSearchIconCard}
          alt="Floating Search Card"
          style={{ top: '15%', left: '70%', width: '10%' }}
          animationClass="animate-float-fast"
        />

        {/* Blue Water Bottle (Upper Right / Center Right) */}
        <FloatingObject
          src={blueWaterBottle}
          alt="Blue Water Bottle"
          style={{ top: '28%', left: '74%', width: '10%' }}
          animationClass="animate-float-medium"
        />

        {/* Black Wallet (Center) */}
        <FloatingObject
          src={blackWallet}
          alt="Black Wallet"
          style={{ top: '42%', left: '57%', width: '13%' }}
          animationClass="animate-float-fast"
        />

        {/* Car Keys with Keychain (Bottom Right) */}
        <FloatingObject
          src={carKeysWithKeychain}
          alt="Car Keys"
          style={{ top: '49%', left: '69%', width: '14%' }}
          animationClass="animate-float-slow"
        />

        {/* Smartphone Showing Found Item (Left - Near Hand) */}
        <FloatingObject
          src={smartphoneShowingFoundItem}
          alt="Smartphone Showing Found Item"
          style={{ top: '49%', left: '30%', width: '12%' }}
          animationClass="animate-float-medium"
        />

        {/* Item Matched Success Card (Below Magnifying Glass) */}
        <FloatingCard
          src={itemMatchedSuccessCard}
          alt="Item Matched Success Card"
          style={{ top: '61%', left: '46%', width: '30%' }}
          animationClass="animate-float-medium"
        />
      </div>

      {/* Main Student Character (Anchored to Bottom-Left) */}
      <div className="absolute left-[3%] bottom-0 z-20 w-[62%] max-w-[480px] pointer-events-none select-none">
        <img 
          src={studentUsingLaptop} 
          alt="Student using laptop" 
          className="w-full h-full object-contain object-bottom drop-shadow-3xl"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-25 pointer-events-none">
        {/* Security Features card (bottom left) */}
        <FloatingCard
          src={securityFeaturesCard}
          alt="Security Features Card"
          style={{ bottom: '4%', left: '4%', width: '56%' }}
          animationClass="animate-float-slow"
        />

        {/* Decorative Leaves (Bottom right) */}
        <div className="absolute right-0 bottom-0 w-[42%] max-w-[340px]">
          <img 
            src={heroDecorativeLeaves} 
            alt="Decorative Leaves" 
            className="w-full h-full object-contain object-right-bottom mix-blend-multiply opacity-90 animate-pulse-gentle"
          />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 8. AuthCard Component
// ----------------------------------------------------
interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <div className={`login-form-card ${className}`}>
      {children}
    </div>
  );
}

// ----------------------------------------------------
// 9. FooterLinks Component
// ----------------------------------------------------
export function FooterLinks() {
  return (
    <div className="flex items-center justify-center gap-4 mt-6 text-xs font-semibold text-slate-400 select-none">
      <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
      <span>&bull;</span>
      <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
      <span>&bull;</span>
      <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
    </div>
  );
}
