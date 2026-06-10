import React from 'react';
import { Language, LANGUAGES } from '../types';
import { BookOpen, Sparkles, Shield, Heart, Flag, Target } from 'lucide-react';

interface AboutUsProps {
  currentLang: Language;
}

export default function AboutUs({ currentLang }: AboutUsProps) {
  const copy = LANGUAGES[currentLang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 relative z-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-[#d8e6da]">
          {copy.aboutTitle}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#bbcbbb] uppercase tracking-widest font-semibold">
          {copy.aboutSubtitle}
        </p>
        <div className="w-16 h-1 bg-[#2ecc71] mx-auto mt-4 rounded" />
      </div>

      {/* Main Text Content */}
      <div className="bg-[#0b1f17]/70 border border-[#1a3a2a] p-6 sm:p-8 rounded-2xl space-y-6 backdrop-blur-sm">
        <div className="space-y-2">
          <span className="font-sans text-[11px] text-[#2ecc71] font-extrabold uppercase tracking-widest block">
            {copy.aboutGoal}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#d8e6da] tracking-tight">
            {copy.aboutGoalTitle}
          </h2>
        </div>
        
        <p className="text-[#bbcbbb] font-sans text-sm sm:text-base leading-relaxed">
          {copy.aboutGoalText1}
        </p>
        <p className="text-[#bbcbbb] font-sans text-sm sm:text-base leading-relaxed">
          {copy.aboutGoalText2}
        </p>
      </div>

      {/* Inspiration Quote Box */}
      <div className="relative border border-[#2ecc71]/40 bg-[#06100a]/90 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-[0_0_25px_rgba(46,204,113,0.1)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ecc71]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="text-center space-y-6 relative z-10">
          <span className="font-sans text-[10px] text-[#2ecc71] font-bold uppercase tracking-widest px-3 py-1 bg-[#131e17] rounded-full border border-[#2ecc71]/20">
            {currentLang === 'ES' ? 'INSPIRACIÓN Y FORTALEZA MENTAL' : 'INSPIRATION & MENTAL TOUGHNESS'}
          </span>
          
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#2ecc71] tracking-tight text-glow">
            {copy.inspirationQuoteTitle}
          </h3>

          <blockquote className="italic font-sans text-sm sm:text-base text-[#d8e6da] leading-relaxed max-w-2xl mx-auto">
            {copy.inspirationQuoteText}
          </blockquote>

          {/* Sub values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#1a3a2a]/60">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#131e17] text-[#2ecc71]">
                <Flag className="w-4 h-4" />
              </div>
              <h4 className="font-display text-sm font-bold uppercase tracking-tight text-[#d8e6da]">
                {copy.inspirationVal1Title}
              </h4>
              <p className="text-[11px] text-[#bbcbbb] font-sans leading-normal">
                {copy.inspirationVal1Text}
              </p>
            </div>

            <div className="space-y-2 border-y md:border-y-0 md:border-x border-[#1a3a2a]/60 py-4 md:py-0 md:px-4">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#131e17] text-[#2ecc71]">
                <Sparkles className="w-4 h-4 fill-[#2ecc71]" />
              </div>
              <h4 className="font-display text-sm font-bold uppercase tracking-tight text-[#d8e6da]">
                {copy.inspirationVal2Title}
              </h4>
              <p className="text-[11px] text-[#bbcbbb] font-sans leading-normal">
                {copy.inspirationVal2Text}
              </p>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#131e17] text-[#2ecc71]">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="font-display text-sm font-bold uppercase tracking-tight text-[#d8e6da]">
                {copy.inspirationVal3Title}
              </h4>
              <p className="text-[11px] text-[#bbcbbb] font-sans leading-normal">
                {copy.inspirationVal3Text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Universal pillars */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold text-[#d8e6da] uppercase tracking-wider text-center">
          {copy.coreValues}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#131e17]/80 border border-[#1a3a2a] p-4.5 rounded-xl space-y-2 text-center group hover:border-[#2ecc71]/40 transition-colors">
            <span className="block font-display text-sm font-bold text-[#2ecc71] tracking-wider uppercase">
              {copy.valCiencia}
            </span>
            <p className="text-[11px] text-[#bbcbbb] font-sans">
              {copy.valCienciaDesc}
            </p>
          </div>

          <div className="bg-[#131e17]/80 border border-[#1a3a2a] p-4.5 rounded-xl space-y-2 text-center group hover:border-[#2ecc71]/40 transition-colors">
            <span className="block font-display text-sm font-bold text-[#2ecc71] tracking-wider uppercase">
              {copy.valIA}
            </span>
            <p className="text-[11px] text-[#bbcbbb] font-sans">
              {copy.valIADesc}
            </p>
          </div>

          <div className="bg-[#131e17]/80 border border-[#1a3a2a] p-4.5 rounded-xl space-y-2 text-center group hover:border-[#2ecc71]/40 transition-colors">
            <span className="block font-display text-sm font-bold text-[#2ecc71] tracking-wider uppercase">
              {copy.valAcceso}
            </span>
            <p className="text-[11px] text-[#bbcbbb] font-sans">
              {copy.valAccesoDesc}
            </p>
          </div>

          <div className="bg-[#131e17]/80 border border-[#1a3a2a] p-4.5 rounded-xl space-y-2 text-center group hover:border-[#2ecc71]/40 transition-colors">
            <span className="block font-display text-sm font-bold text-[#2ecc71] tracking-wider uppercase">
              {copy.valResultados}
            </span>
            <p className="text-[11px] text-[#bbcbbb] font-sans">
              {copy.valResultadosDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
