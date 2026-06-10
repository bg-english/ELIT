import React from 'react';
import { Language, LANGUAGES } from '../types';
import { Sparkles, Play, ShieldAlert, Award, ChevronRight, Zap } from 'lucide-react';

interface InicioProps {
  currentLang: Language;
  onNavigateToTab: (tab: string) => void;
  onOpenLogin: () => void;
}

export default function Inicio({ currentLang, onNavigateToTab, onOpenLogin }: InicioProps) {
  const copy = LANGUAGES[currentLang];

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Neon Atmospheric Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#2ecc71]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-[#2ecc71]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center my-auto space-y-8 relative z-10">
        
        {/* IA Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b1f17] border border-[#2ecc71]/40 text-[#2ecc71] shadow-[0_0_15px_rgba(46,204,113,0.15)] animate-bounce">
          <Zap className="w-3.5 h-3.5 fill-[#2ecc71]" />
          <span className="font-display text-xs font-bold uppercase tracking-widest">
            {copy.plataformaIA}
          </span>
        </div>

        {/* Brand Title with custom sport-grade tracking and italic skew */}
        <div className="space-y-2">
          <h1 className="font-display text-[72px] sm:text-[100px] md:text-[120px] font-black italic tracking-tighter leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 selection:bg-[#2ecc71]">
            <span className="font-sans text-glow text-[#2ecc71] block sm:inline drop-shadow-[0_0_35px_rgba(46,204,113,0.5)]">
              ELIT
            </span>
          </h1>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
            {copy.slogan}
          </p>
        </div>

        {/* Description brief */}
        <p className="font-sans text-[#bbcbbb] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {currentLang === 'ES' 
            ? 'Monitorea fatigas, optimiza marcas y potencia tu biotipo con análisis tactico, planes nutricionales e IA de nivel profesional.'
            : 'Track fatigue, optimize athletic metrics, and power your body composition with real-time sports AI & professional-grade guidelines.'
          }
        </p>

        {/* Buttons / CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigateToTab('mi-perfil')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2ecc71] hover:bg-[#54e98a] active:scale-95 text-[#020a05] font-display text-base font-black uppercase tracking-wider shadow-[0_0_20px_rgba(46,204,113,0.4)] transition-all duration-300"
          >
            {copy.heroButton}
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
          
          <button
            onClick={() => onNavigateToTab('quienes-somos')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#2ecc71] hover:bg-[#2ecc71]/10 active:scale-95 text-[#2ecc71] font-display text-base font-bold uppercase tracking-wider transition-all duration-300"
          >
            <Play className="w-4.5 h-4.5 fill-[#2ecc71] stroke-none" />
            {copy.demoButton}
          </button>
        </div>
      </div>

      {/* Stats Bottom Bar */}
      <div className="w-full max-w-5xl mx-auto pt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 py-8 rounded-2xl bg-[#0b1f17]/60 border border-[#1a3a2a] backdrop-blur-sm shadow-[inset_0_1px_3px_rgba(26,58,42,0.3)]">
          
          <div className="text-center group border-r border-[#1a3a2a]/40 last:border-0">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-[#2ecc71] filter drop-shadow-[0_0_10px_rgba(46,204,113,0.3)] group-hover:scale-110 transition-transform duration-300">
              2,400+
            </span>
            <span className="block font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#bbcbbb] mt-1">
              {copy.statPlayers}
            </span>
          </div>

          <div className="text-center group border-r border-[#1a3a2a]/40 last:border-0">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-[#2ecc71] filter drop-shadow-[0_0_10px_rgba(46,204,113,0.3)] group-hover:scale-110 transition-transform duration-300">
              87%
            </span>
            <span className="block font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#bbcbbb] mt-1">
              {copy.statImprovement}
            </span>
          </div>

          <div className="text-center group border-r border-[#1a3a2a]/40 last:border-0">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-[#2ecc71] filter drop-shadow-[0_0_10px_rgba(46,204,113,0.3)] group-hover:scale-110 transition-transform duration-300">
              15K+
            </span>
            <span className="block font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#bbcbbb] mt-1">
              {copy.statRoutines}
            </span>
          </div>

          <div className="text-center group last:border-0">
            <span className="block font-display text-3xl sm:text-4xl font-extrabold text-[#2ecc71] filter drop-shadow-[0_0_10px_rgba(46,204,113,0.3)] group-hover:scale-110 transition-transform duration-300">
              99%
            </span>
            <span className="block font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#bbcbbb] mt-1">
              {copy.statPrecision}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
