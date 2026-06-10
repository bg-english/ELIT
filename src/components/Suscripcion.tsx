import React from 'react';
import { Language, LANGUAGES } from '../types';
import { Check, ShieldCheck, CreditCard, Sparkles, HelpCircle } from 'lucide-react';

interface SuscripcionProps {
  currentLang: Language;
  onSelectPlan: (plan: string) => void;
  activePlan: string;
}

export default function Suscripcion({ currentLang, onSelectPlan, activePlan }: SuscripcionProps) {
  const copy = LANGUAGES[currentLang];
  const [selectedPayMethod, setSelectedPayMethod] = React.useState('Visa');

  const methods = ['Visa', 'Mastercard', 'American Express', 'PayPal', 'PSE / Local'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative z-10 font-sans">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
          {copy.subTitle}
        </h1>
        <p className="font-sans text-xs text-[#bbcbbb] uppercase tracking-widest leading-loose">
          {copy.subSubtitle}
        </p>
      </div>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* GRATUITO */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all ${
          activePlan === 'Gratuito'
            ? 'bg-[#131e17] border-[#2ecc71] shadow-[0_0_15px_rgba(46,204,113,0.15)]'
            : 'bg-[#0b1f17]/80 border-[#1a3a2a] hover:border-[#2ecc71]/20'
        }`}>
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#bbcbbb] text-center">
              {currentLang === 'ES' ? 'GRATUITO' : 'FREE'}
            </h3>
            
            <div className="text-center space-y-1">
              <span className="font-display text-4xl font-black text-[#2ecc71]">$0</span>
              <span className="text-xs text-[#bbcbbb] block">/ {currentLang === 'ES' ? 'siempre' : 'forever'}</span>
            </div>

            <ul className="space-y-2.5 text-xs text-[#d8e6da]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Plan básico 5 ejercicios/sesión' : 'Basic 5 drills per session'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Dashboard de progreso' : 'Outcome historical chart'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Semáforo de riesgo' : 'IA safety signal'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Calendario básico' : 'Standard weekly timeline'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Gratuito')}
            className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider select-none transition-colors ${
              activePlan === 'Gratuito'
                ? 'bg-[#1a3a2a] text-[#2ecc71] border border-[#2ecc71]/40 cursor-default'
                : 'bg-[#131e17] hover:bg-[#2ecc71]/10 text-[#2ecc71] border border-[#2ecc71]/40'
            }`}
          >
            {activePlan === 'Gratuito' ? copy.activePlan : copy.btnStartFree}
          </button>
        </div>

        {/* FORMATIVO (MAS POPULAR) */}
        <div className={`p-6 rounded-2xl border relative flex flex-col justify-between space-y-6 transition-all ${
          activePlan === 'Formativo'
            ? 'bg-[#131e17] border-2 border-[#2ecc71] shadow-[0_0_30px_rgba(46,204,113,0.3)] scale-[1.03]'
            : 'bg-[#0b1f17]/95 border-2 border-[#2ecc71]/60 shadow-[0_0_20px_rgba(46,204,113,0.15)] hover:border-[#2ecc71] scale-[1.01]'
        }`}>
          {/* Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2ecc71] text-[#020a05] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
            {copy.popular}
          </div>

          <div className="space-y-4 pt-1">
            <h3 className="font-display text-xl font-black uppercase tracking-wide text-white text-center">
              {currentLang === 'ES' ? 'FORMATIVO' : 'DEVELOPMENT'}
            </h3>
            
            <div className="text-center space-y-1">
              <span className="font-display text-4xl font-black text-[#2ecc71]">$4.99</span>
              <span className="text-xs text-[#bbcbbb] block">/ {currentLang === 'ES' ? 'mes' : 'month'}</span>
            </div>

            <ul className="space-y-2.5 text-xs text-[#d8e6da]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span className="font-semibold">{currentLang === 'ES' ? 'Plan completo 8 ejercicios' : 'Complete 8 drills plan'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Videos YouTube integrados HD' : 'HD Masterclasses'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Temporizadores interactivos' : 'Interactive play clock timers'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Nutrición por posición' : 'Positional customized bio'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span className="font-bold">{currentLang === 'ES' ? 'Scouting con IA' : 'AI Scouting Diagnostics'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Formativo')}
            className={`w-full py-3 rounded-lg text-xs font-black uppercase tracking-wider select-none transition-all shadow-[0_0_15px_rgba(46,204,113,0.3)] ${
              activePlan === 'Formativo'
                ? 'bg-[#1a3a2a] text-[#2ecc71] border border-[#2ecc71] cursor-default'
                : 'bg-[#2ecc71] hover:bg-[#54e98a] text-[#020a05]'
            }`}
          >
            {activePlan === 'Formativo' ? copy.activePlan : copy.btnSubscribe}
          </button>
        </div>

        {/* ELITE */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all ${
          activePlan === 'Élite'
            ? 'bg-[#131e17] border-[#2ecc71] shadow-[0_0_15px_rgba(46,204,113,0.15)]'
            : 'bg-[#0b1f17]/80 border-[#1a3a2a] hover:border-[#2ecc71]/20'
        }`}>
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#bbcbbb] text-center">
              {currentLang === 'ES' ? 'ÉLITE' : 'ELITE'}
            </h3>
            
            <div className="text-center space-y-1">
              <span className="font-display text-4xl font-black text-[#2ecc71]">$9.99</span>
              <span className="text-xs text-[#bbcbbb] block">/ {currentLang === 'ES' ? 'mes' : 'month'}</span>
            </div>

            <ul className="space-y-2.5 text-xs text-[#d8e6da]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? '12 ejercicios/sesión' : '12 drill volume session'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Especialización diaria' : 'Targeted daily specialties'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span className="font-semibold">{currentLang === 'ES' ? 'Análisis biomecánico' : 'Biomechanical posture reports'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Prioridad actualizaciones' : 'Priority update patches'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2ecc71] shrink-0" />
                <span>{currentLang === 'ES' ? 'Soporte directo' : '1-on-1 feedback support'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectPlan('Élite')}
            className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider select-none transition-colors ${
              activePlan === 'Élite'
                ? 'bg-[#1a3a2a] text-[#2ecc71] border border-[#2ecc71]/40 cursor-default'
                : 'bg-[#131e17] hover:bg-[#2ecc71]/10 text-[#2ecc71] border border-[#2ecc71]/40'
            }`}
          >
            {activePlan === 'Élite' ? copy.activePlan : copy.btnSubscribe}
          </button>
        </div>

      </div>

      {/* Payment methods row display */}
      <div className="space-y-4 pt-6 border-t border-[#1a3a2a]/60">
        <h3 className="font-display text-xs font-bold tracking-wider text-center uppercase text-[#bbcbbb]">
          {copy.payMethods}
        </h3>

        <div className="flex flex-wrap justify-center gap-3">
          {methods.map((m) => {
            const isSel = selectedPayMethod === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedPayMethod(m)}
                className={`px-4.5 py-2 rounded-lg border text-xs font-extrabold uppercase font-mono tracking-wider select-none transition-all ${
                  isSel
                    ? 'bg-[#131e17] border-[#2ecc71] text-white shadow-[0_0_12px_rgba(46,204,113,0.3)]'
                    : 'bg-[#020a05]/75 border-[#1a3a2a] text-[#bbcbbb] hover:border-[#1a3a2a]/80'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-[#bbcbbb] font-sans italic text-center max-w-sm mx-auto leading-normal">
          {copy.securePay}
        </p>
      </div>

    </div>
  );
}
