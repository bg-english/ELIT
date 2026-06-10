import React from 'react';
import { Language, LANGUAGES } from '../types';
import { Activity, Menu, X, User, Bell, Globe, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userEmail: string | null;
  userName: string | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  userEmail,
  userName,
  onLogout,
  onOpenLogin
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const copy = LANGUAGES[currentLang];

  const menuItems = [
    { id: 'inicio', label: copy.navInicio },
    { id: 'quienes-somos', label: copy.navAbout },
    { id: 'suscripcion', label: copy.navSuscripcion },
    { id: 'mi-perfil', label: copy.navProfile },
    { id: 'dashboard', label: copy.navDashboard },
    { id: 'calendario', label: copy.navCalendar },
    { id: 'nutricion', label: copy.navNutrition },
    { id: 'scouting-ia', label: copy.navScouting },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#020a05]/95 backdrop-blur-md border-b border-[#1a3a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => onTabChange('inicio')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-1.5 rounded-lg bg-[#0b1f17] border border-[#2ecc71]/30 group-hover:border-[#2ecc71] transition-colors">
              <Activity className="w-6 h-6 text-[#2ecc71] animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-black italic tracking-tighter text-[#2ecc71]">
                ELIT
              </span>
              <span className="hidden sm:inline font-sans text-[10px] tracking-widest text-[#bbcbbb] uppercase font-bold">
                Level
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-2 rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#2ecc71] bg-[#131e17] border-b-2 border-[#2ecc71]'
                      : 'text-[#bbcbbb] hover:text-[#d8e6da] hover:bg-[#0b1f17]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#131e17] p-0.5 rounded-full border border-[#1a3a2a]">
              <button
                onClick={() => onLanguageChange('ES')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currentLang === 'ES' 
                    ? 'bg-[#2ecc71] text-[#020a05]' 
                    : 'text-[#bbcbbb] hover:text-[#d8e6da]'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => onLanguageChange('EN')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currentLang === 'EN' 
                    ? 'bg-[#2ecc71] text-[#020a05]' 
                    : 'text-[#bbcbbb] hover:text-[#d8e6da]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Notification Bell */}
            <button className="relative p-1.5 rounded-full text-[#bbcbbb] hover:text-white hover:bg-[#0b1f17] transition-colors focus:outline-none">
              <span className="sr-only">Notifications</span>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#020a05]" />
            </button>

            {/* User Account state */}
            {userEmail ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#1a3a2a]">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-[#d8e6da]">{userName || 'Atleta Élite'}</span>
                  <span className="text-[10px] text-[#bbcbbb] font-mono">{userEmail}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-md border border-red-500/40 hover:bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {copy.navLogout}
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-[#2ecc71] hover:bg-[#54e98a] text-[#020a05] font-display text-xs font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(46,204,113,0.3)] transition-all"
              >
                <User className="w-3.5 h-3.5" />
                {copy.navLogin}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 xl:hidden">
            {/* Quick Language Toggle */}
            <button
              onClick={() => onLanguageChange(currentLang === 'ES' ? 'EN' : 'ES')}
              className="px-2 py-1 bg-[#131e17] rounded border border-[#1a3a2a] text-xs font-bold text-[#bbcbbb] hover:text-white"
            >
              {currentLang}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#bbcbbb] hover:text-white hover:bg-[#0b1f17] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#020a05] border-b border-[#1a3a2a] px-2 pt-2 pb-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left block px-3 py-2.5 rounded-md text-sm font-semibold uppercase tracking-wider ${
                  isActive
                    ? 'text-[#2ecc71] bg-[#131e17]'
                    : 'text-[#bbcbbb] hover:text-[#d8e6da] hover:bg-[#0b1f17]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-4 pb-2 border-t border-[#1a3a2a] px-3 space-y-2">
            {userEmail ? (
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#d8e6da]">{userName || 'Atleta Élite'}</span>
                  <span className="text-xs text-[#bbcbbb] font-mono">{userEmail}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-center py-2 rounded-md border border-red-500/40 text-red-400 text-xs font-bold uppercase"
                >
                  {copy.navLogout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setIsOpen(false);
                }}
                className="w-full text-center py-2 rounded-md bg-[#2ecc71] text-[#020a05] text-xs font-bold uppercase tracking-widest"
              >
                {copy.navLogin}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
