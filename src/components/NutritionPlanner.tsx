import React from 'react';
import { Language, LANGUAGES, AthleticProfile } from '../types';
import { Apple, Scale, HelpCircle, Utensils, ArrowUpRight, ShieldCheck, ArrowDown } from 'lucide-react';

interface NutritionPlannerProps {
  currentLang: Language;
  profile: AthleticProfile;
}

export default function NutritionPlanner({ currentLang, profile }: NutritionPlannerProps) {
  const copy = LANGUAGES[currentLang];
  const [isRestDay, setIsRestDay] = React.useState(false);

  // Mifflin-St Jeor BMR calculator
  // Male BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
  const bmr = 10 * profile.peso + 6.25 * profile.altura - 5 * profile.edad + 5;
  // Activity factor x 1.725 (Elite training)
  const tdee = Math.round(bmr * 1.725);

  // Dynamic macronutrient distribution based on weight and position
  let proteinPerKg = 2.0; 
  let fatPerKg = 1.0;

  // Custom descriptions based on position
  let positionSloganEs = '';
  let positionSloganEn = '';

  const posLower = profile.posicion.toLowerCase();
  if (posLower.startsWith('del') || posLower.startsWith('str')) {
    proteinPerKg = 2.2;
    positionSloganEs = 'Los delanteros requieren potencia explosiva de corta duración. Mayor síntesis de proteína muscular.';
    positionSloganEn = 'Strikers require raw explosive sprint bursts. Increased protein synthesis and lean recovery prioritised.';
  } else if (posLower.startsWith('vol') || posLower.startsWith('mid')) {
    proteinPerKg = 1.9;
    positionSloganEs = 'Los volantes recorren 11-13 km/partido. Mayor demanda metabólica y de glucógeno muscular.';
    positionSloganEn = 'Midfielders cover 11-13 km per matchup. Increased carbohydrate and glycogen storage is paramount.';
  } else if (posLower.startsWith('def') || posLower.startsWith('def')) {
    proteinPerKg = 2.1;
    positionSloganEs = 'Los defensores exigen rigidez en duelos físicos y salto. Balance óptimo de Proteínas y Grasas de alta densidad.';
    positionSloganEn = 'Defenders prioritize high body density and physical toughness. Optimal protein & healthy fat balance.';
  } else {
    // Goalkeeper / Arquero
    proteinPerKg = 1.8;
    positionSloganEs = 'Los arqueros requieren alta reacción de fibras rápidas. Menor volumen calórico pero alto foco en micronutrientes.';
    positionSloganEn = 'Goalkeepers require lightning reflex fast-twitch muscle fibers. Balanced caloric index with mineral focus.';
  }

  // Calculate grams
  const proteinGram = Math.round(profile.peso * proteinPerKg);
  const fatGram = Math.round(profile.peso * fatPerKg);
  
  // Calculate remaining calories for carbs
  // Protein = 4 kcal/g, Fat = 9 kcal/g, Carbs = 4 kcal/g
  const proteinCalories = proteinGram * 4;
  const fatCalories = fatGram * 9;
  const remainingCalories = tdee - (proteinCalories + fatCalories);
  
  let carbsGramRaw = Math.round(remainingCalories / 4);
  if (carbsGramRaw < 100) carbsGramRaw = 300; // safe fallback

  const carbsGram = isRestDay ? Math.round(carbsGramRaw * 0.8) : carbsGramRaw;
  const activeCalories = isRestDay ? Math.round(tdee - (carbsGramRaw * 0.2 * 4)) : tdee;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 relative z-10">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
          {copy.nutriTitle}
        </h1>
        <p className="font-sans text-xs text-[#bbcbbb] uppercase tracking-widest leading-loose">
          {copy.nutriSubtitle}
        </p>
      </div>

      {/* Main Header Board */}
      <div className="bg-[#0b1f17]/90 border border-[#2ecc71]/40 p-5 sm:p-6 rounded-2xl relative overflow-hidden text-center shadow-[0_0_20px_rgba(46,204,113,0.1)]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#2ecc71]/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131e17] rounded-full border border-[#1a3a2a]">
            <Apple className="w-4 h-4 text-[#2ecc71]" />
            <span className="font-display text-xs font-bold text-[#2ecc71] tracking-wider uppercase">
              {copy.planNutri} • {profile.posicion.toUpperCase()}
            </span>
          </div>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#bbcbbb] font-sans italic leading-relaxed">
            {currentLang === 'ES' ? positionSloganEs : positionSloganEn}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 border-t border-[#1a3a2a]/60 text-xs text-[#bbcbbb] font-mono">
            <span>{profile.peso}kg</span>
            <span className="text-[#1a3a2a]">•</span>
            <span>{profile.altura}cm</span>
            <span className="text-[#1a3a2a]">•</span>
            <span>{profile.edad} {currentLang === 'ES' ? 'años' : 'years'}</span>
            <span className="text-[#1a3a2a]">•</span>
            <span className="text-[#2ecc71] font-bold">TDEE: {activeCalories} kcal</span>
          </div>
        </div>
      </div>

      {/* 3 Grid Macros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PROTEINS */}
        <div className="bg-[#0b1f17]/80 border border-[#1a3a2a] p-5 rounded-2xl text-center space-y-4">
          <span className="font-sans text-[11px] font-black uppercase text-[#bbcbbb] tracking-widest block">
            {copy.proteins}
          </span>
          <div className="space-y-1">
            <span className="font-display text-5xl font-black text-white">{proteinGram}g</span>
            <span className="text-xs text-[#bbcbbb] font-mono block">/ {currentLang === 'ES' ? 'día' : 'day'}</span>
          </div>
          <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
            {/* full bar */}
            <div className="bg-[#2ecc71] h-full rounded-full w-full" />
          </div>
        </div>

        {/* CARBS */}
        <div className="bg-[#0b1f17]/80 border border-[#1a3a2a] p-5 rounded-2xl text-center space-y-4">
          <span className="font-sans text-[11px] font-black uppercase text-[#bbcbbb] tracking-widest block">
            {copy.carbs}
          </span>
          <div className="space-y-1">
            <span className="font-display text-5xl font-black text-white">{carbsGram}g</span>
            <span className="text-xs text-[#bbcbbb] font-mono block">/ {currentLang === 'ES' ? 'día' : 'day'}</span>
          </div>
          <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
            {/* dynamic bar representing reduced carbs if rest day */}
            <div 
              className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-300" 
              style={{ width: isRestDay ? '80%' : '100%' }}
            />
          </div>
        </div>

        {/* FATS */}
        <div className="bg-[#0b1f17]/80 border border-[#1a3a2a] p-5 rounded-2xl text-center space-y-4">
          <span className="font-sans text-[11px] font-black uppercase text-[#bbcbbb] tracking-widest block">
            {copy.fats}
          </span>
          <div className="space-y-1">
            <span className="font-display text-5xl font-black text-white">{fatGram}g</span>
            <span className="text-xs text-[#bbcbbb] font-mono block">/ {currentLang === 'ES' ? 'día' : 'day'}</span>
          </div>
          <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
            <div className="bg-[#2ecc71] h-full rounded-full w-11/12" />
          </div>
        </div>

      </div>

      {/* REST DAY SWITCH ROW */}
      <button
        onClick={() => setIsRestDay(!isRestDay)}
        className={`w-full p-4.5 rounded-2xl border transition-all duration-300 flex items-center justify-between text-left select-none cursor-pointer ${
          isRestDay
            ? 'bg-[#131e17] border-[#2ecc71]/50 text-white'
            : 'bg-[#0b1f17]/70 border-[#1a3a2a] text-[#bbcbbb] hover:border-[#2ecc71]/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${isRestDay ? 'bg-[#2ecc71] text-[#020a05]' : 'bg-[#020a05] text-[#bbcbbb]'}`}>
            <ArrowDown className={`w-4 h-4 transition-transform ${isRestDay ? 'rotate-180' : ''}`} />
          </div>
          <div>
            <span className="font-display text-base font-extrabold uppercase block text-[#d8e6da]">
              {copy.restDay}
            </span>
            <p className="text-xs text-[#bbcbbb] font-sans">
              {copy.restDayDesc}
            </p>
          </div>
        </div>

        <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${isRestDay ? 'bg-[#2ecc71]' : 'bg-[#1a3a2a]'}`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${isRestDay ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </button>

      {/* Footer disclaimer */}
      <div className="p-4 bg-[#06100a]/80 border border-[#1a3a2a] rounded-xl text-center">
        <span className="text-[10px] uppercase font-bold text-[#bbcbbb] tracking-widest font-mono">
          {copy.calculatedMifflin}
        </span>
      </div>

    </div>
  );
}
