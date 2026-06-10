import React from 'react';
import { Language, LANGUAGES } from '../types';
import { User, Mail, ShieldAlert, Eye, EyeOff, Sparkles, LogIn, ChevronRight } from 'lucide-react';

interface RegistrationModalProps {
  currentLang: Language;
  onSuccess: (email: string, name: string) => void;
  onClose: () => void;
}

export default function RegistrationModal({ currentLang, onSuccess, onClose }: RegistrationModalProps) {
  const [tab, setTab] = React.useState<'register' | 'login'>('register');
  const [fullName, setFullName] = React.useState('Carlos Rodríguez');
  const [email, setEmail] = React.useState('edoardoortiz@redboston.edu.co');
  const [password, setPassword] = React.useState('••••••••••••');
  const [showPassword, setShowPassword] = React.useState(false);
  const copy = LANGUAGES[currentLang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'register') {
      onSuccess(email || 'carlos@redboston.edu.co', fullName || 'Carlos Rodríguez');
    } else {
      onSuccess(email || 'carlos@redboston.edu.co', 'Carlos Rodríguez');
    }
  };

  const handleGuest = () => {
    onSuccess('invitado@elite.ia', currentLang === 'ES' ? 'Invitado Élite' : 'Elite Guest');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 relative z-10">
      {/* Container Card */}
      <div className="bg-[#0b1f17]/90 border border-[#2ecc71]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(46,204,113,0.15)] relative overflow-hidden backdrop-blur-md">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#2ecc71]/10 rounded-full blur-2xl" />

        <div className="text-center space-y-2 mb-6">
          <h1 className="font-display text-3xl font-black uppercase text-[#2ecc71] tracking-tight">
            {copy.authTitle}
          </h1>
          <p className="font-sans text-[11px] sm:text-xs text-[#bbcbbb] uppercase tracking-wider">
            {copy.authSubtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[#020a05] p-1.5 rounded-lg border border-[#1a3a2a] mb-6">
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'register'
                ? 'bg-[#2ecc71] text-[#020a05]'
                : 'text-[#bbcbbb] hover:text-[#d8e6da]'
            }`}
          >
            {tab === 'register' && <Sparkles className="w-3.5 h-3.5 fill-[#020a05] stroke-none" />}
            {copy.tabRegister}
          </button>
          
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'login'
                ? 'bg-[#2ecc71] text-[#020a05]'
                : 'text-[#bbcbbb] hover:text-[#d8e6da]'
            }`}
          >
            {tab === 'login' && <LogIn className="w-3.5 h-3.5" />}
            {copy.tabLogin}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#bbcbbb]">
                {copy.lblFullName}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#020a05] border border-[#1a3a2a] rounded-lg px-3.5 py-2.5 text-xs text-[#d8e6da] focus:outline-none focus:border-[#2ecc71] transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#bbcbbb]">
              {copy.lblEmail}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020a05] border border-[#1a3a2a] rounded-lg px-3.5 py-2.5 text-xs text-[#d8e6da] focus:outline-none focus:border-[#2ecc71] transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#bbcbbb]">
              {copy.lblPassword}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020a05] border border-[#1a3a2a] rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-[#d8e6da] focus:outline-none focus:border-[#2ecc71] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bbcbbb] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-1.5 py-3.5 rounded-lg bg-[#2ecc71] hover:bg-[#54e98a] active:scale-95 text-[#020a05] font-display text-sm font-black uppercase tracking-wider shadow-[0_0_15px_rgba(46,204,113,0.3)] transition-all mt-2"
          >
            <span>{tab === 'register' ? copy.btnCreateFree : copy.btnSignIn}</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute w-full h-[1px] bg-[#1a3a2a]"></div>
          <span className="relative z-10 px-3 bg-[#0b1f17] text-[10px] font-bold text-[#bbcbbb] uppercase font-mono tracking-widest">
            {copy.or}
          </span>
        </div>

        {/* Explore Guest link */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleGuest}
            className="text-xs font-bold text-[#2ecc71] uppercase tracking-wider hover:underline focus:outline-none"
          >
            {copy.exploreGuest}
          </button>
        </div>
      </div>
    </div>
  );
}
