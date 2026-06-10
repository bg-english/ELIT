import React from 'react';
import { Language, LANGUAGES } from '../types';
import { Award, CheckCircle2, Share2, ArrowLeft, Twitter, Send, Instagram, PlayCircle, Shield } from 'lucide-react';

interface RoutineSuccessProps {
  currentLang: Language;
  onGoBack: () => void;
}

export default function RoutineSuccess({ currentLang, onGoBack }: RoutineSuccessProps) {
  const copy = LANGUAGES[currentLang];
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleShare = (channel: string) => {
    setCopied(channel);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-12 px-4 sm:px-6 relative z-10 text-center font-sans overflow-hidden">
      
      {/* Absolute Decorative Grid Elements */}
      <div className="absolute inset-x-0 top-1/4 -translate-y-1/2 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] border-2 border-dashed border-[#2ecc71] rounded-full animate-spin-slow" />
      </div>

      <div className="max-w-3xl mx-auto my-auto space-y-8 relative z-10 pt-4">
        
        {/* Animated Trophy / Achievement Circle Badge */}
        <div className="relative inline-flex items-center justify-center">
          {/* Pulsing Outer Neon Circle */}
          <div className="absolute -inset-2 bg-[#2ecc71]/10 blur-xl rounded-full scale-125 animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-[#0b1f17]/80 border-4 border-[#2ecc71] rounded-full flex flex-col items-center justify-center shadow-[0_0_35px_rgba(46,204,113,0.3)] select-none">
            
            {/* Custom vector-like athletic shield icon representation */}
            <Award className="w-20 h-20 text-[#2ecc71] filter drop-shadow-[0_0_15px_rgba(46,204,113,0.4)]" />
            
            {/* small green check */}
            <div className="absolute -bottom-2 -right-1 bg-[#2ecc71] text-[#020a05] rounded-full p-1 border-4 border-[#020a05]">
              <CheckCircle2 className="w-5 h-5 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Header Texts */}
        <div className="space-y-3">
          <h1 className="font-display text-[44px] sm:text-[64px] font-black italic uppercase tracking-tighter text-glow text-[#2ecc71] leading-none">
            {copy.logroHeading}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#bbcbbb] uppercase tracking-widest font-semibold">
            {currentLang === 'ES' ? 'SISTEMA DE PREPARACIÓN IA ATLÉTICA' : 'ATHLETIC AI PERFORMANCE SYSTEM'}
          </p>
          <p className="font-sans text-sm sm:text-base text-[#d8e6da] max-w-xl mx-auto leading-relaxed">
            {copy.logroText}
          </p>
        </div>

        {/* 3 Grid Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mx-auto pt-2">
          
          <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 rounded-xl backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
            <span className="block text-[9px] font-bold text-[#bbcbbb] uppercase tracking-wider mb-1.5 font-mono">
              {copy.timeTotal}
            </span>
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#2ecc71] tracking-tight">
              54:20
            </span>
          </div>

          <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 rounded-xl backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
            <span className="block text-[9px] font-bold text-[#bbcbbb] uppercase tracking-wider mb-1.5 font-mono">
              {copy.calories}
            </span>
            <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#2ecc71] tracking-tight">
              642 KCAL
            </span>
          </div>

          <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 rounded-xl backdrop-blur-sm col-span-2 md:col-span-1 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
            <span className="block text-[9px] font-bold text-[#bbcbbb] uppercase tracking-wider mb-1.5 font-mono">
              {copy.intensity}
            </span>
            <span className="block font-display text-2xl sm:text-3xl font-black italic text-[#2ecc71] tracking-tight text-glow">
              ELITE
            </span>
          </div>

        </div>

        {/* Share Section with custom feedback toast */}
        <div className="space-y-3 pt-4">
          <span className="block text-[10px] font-black text-[#bbcbbb] uppercase tracking-[0.25em] font-mono">
            {copy.shareOn}
          </span>
          
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleShare('Instagram')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#2ecc71]/40 text-xs font-bold uppercase tracking-wider text-[#d8e6da] hover:bg-[#2ecc71]/10 transition-colors select-none"
            >
              <Instagram className="w-4 h-4 text-[#2ecc71]" />
              Instagram
            </button>
            
            <button
              onClick={() => handleShare('WhatsApp')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#2ecc71]/40 text-xs font-bold uppercase tracking-wider text-[#d8e6da] hover:bg-[#2ecc71]/10 transition-colors select-none"
            >
              <Send className="w-4 h-4 text-[#2ecc71]" />
              WhatsApp
            </button>

            <button
              onClick={() => handleShare('X')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#2ecc71]/40 text-xs font-bold uppercase tracking-wider text-[#d8e6da] hover:bg-[#2ecc71]/10 transition-colors select-none"
            >
              <Twitter className="w-4 h-4 text-[#2ecc71]" />
              X
            </button>
          </div>

          {copied && (
            <p className="text-[10px] text-[#2ecc71] uppercase tracking-widest font-mono animate-fade-in">
              {currentLang === 'ES' 
                ? `¡Enlace de logro generado para ${copied}! Copiado al portapapeles.` 
                : `Achievement shared on ${copied}! Copied to clipboard.`
              }
            </p>
          )}
        </div>

        {/* Volver al Calendario CTA */}
        <div className="pt-6">
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#2ecc71] hover:bg-[#54e98a] active:scale-95 text-[#020a05] font-display text-base font-black uppercase tracking-widest shadow-[0_0_25px_rgba(46,204,113,0.3)] hover:shadow-[0_0_35px_rgba(46,204,113,0.5)] transition-all"
          >
            {copy.btnBackCalendar}
          </button>
        </div>

      </div>

      {/* Sport Telemetry Footer margins */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl w-full mx-auto border-t border-[#1a3a2a]/40 pt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono z-20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full animate-bounce" />
          <span>Telemetry System v4.2 Active</span>
        </div>
        <div>
          <span>User: Elite_Athlete_01 // Sess_ID: 9823-X</span>
        </div>
      </div>

    </div>
  );
}
