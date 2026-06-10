import React from 'react';
import { Language, LANGUAGES, AthleticProfile } from '../types';
import { ShieldCheck, Brain, Clock, Plus, Compass, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface ProfileSettingsProps {
  currentLang: Language;
  profile: AthleticProfile;
  onChangeProfile: (profile: AthleticProfile) => void;
}

export default function ProfileSettings({ currentLang, profile, onChangeProfile }: ProfileSettingsProps) {
  const copy = LANGUAGES[currentLang];
  const [loading, setLoading] = React.useState(false);
  const [aiReport, setAiReport] = React.useState<string | null>(null);

  const handleFieldChange = (key: keyof AthleticProfile, value: any) => {
    onChangeProfile({
      ...profile,
      [key]: value
    });
  };

  const handleGenerateAiPlan = () => {
    setLoading(true);
    setAiReport(null);
    setTimeout(() => {
      setLoading(false);
      // Generate a dynamic customized report text
      const positionText = profile.posicion;
      if (currentLang === 'ES') {
        setAiReport(`### DIAGNÓSTICO IA DE PREPARACIÓN FÍSICA PARA VOLANTE/DELANTERO
• **Biotipo**: Atlético de alta demanda metabólica. Teniendo en cuenta tu peso de **${profile.peso}kg** y altura de **${profile.altura}cm**, tu Índice de Masa Corporal (IMC) es excelente para la aceleración.
• **Potencial Atlético de Velocidad**: Tu sprint de **${profile.sprints30m}s** te sitúa en el percentil superior del nivel local intermedio.
• **Recomendación de Resistencia**: Tus **${profile.horasEquipo + profile.horasPersonal} horas semanales** acumuladas garantizan una base aeróbica sólida.
• **Foco Mental**: Presentas motivación alta (**${profile.motivacion}/10**). Recomendamos técnicas de respiración profunda para mitigar tu nivel de estrés de **${profile.estres}/10** previo al saque de banda.`);
      } else {
        setAiReport(`### SPORTS AI BIOTYPE DIAGNOSTIC FOR ${positionText.toUpperCase()}
• **Biotype**: High metabolic demand athletic build. Based on your body weight of **${profile.peso}kg** and height of **${profile.altura}cm**, your current BMI is optimal for sprints.
• **Sprint Mechanics**: Your sprint time of **${profile.sprints30m}s** positions you in the top tier of local intermediate level athletes.
• **Stamina Guidance**: Current training volume of **${profile.horasEquipo + profile.horasPersonal} hours/week** represents an excellent aerobic base.
• **Psychological Resilience**: Great motivation level (**${profile.motivacion}/10**). We suggest diaphragmatic pacing to decrease game-time pressure stress of **${profile.estres}/10**.`);
      }
    }, 1500);
  };

  const positions = currentLang === 'ES' 
    ? ['Delantero', 'Volante', 'Defensa', 'Arquero']
    : ['Striker', 'Midfielder', 'Defender', 'Goalkeeper'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 relative z-10">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
          {copy.profileTitle}
        </h1>
        <div className="w-12 h-1 bg-[#2ecc71] mx-auto mt-2 rounded" />
      </div>

      {/* Main Form Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* BLOCK 1: DATOS BASICOS */}
        <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1a3a2a] pb-2">
            <Compass className="w-4 h-4 text-[#2ecc71]" />
            <h3 className="font-display text-lg font-bold uppercase text-[#d8e6da] tracking-wide">
              {copy.catBasicos}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblEdad}</label>
              <input
                type="number"
                value={profile.edad}
                onChange={(e) => handleFieldChange('edad', parseInt(e.target.value) || 0)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-semibold focus:outline-none focus:border-[#2ecc71]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblPais}</label>
              <select
                value={profile.pais}
                onChange={(e) => handleFieldChange('pais', e.target.value)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-semibold focus:outline-none focus:border-[#2ecc71]"
              >
                <option value="Colombia">Colombia</option>
                <option value="España">España</option>
                <option value="Argentina">Argentina</option>
                <option value="México">México</option>
                <option value="Estados Unidos">Estados Unidos</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblPosicion}</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {positions.map((pos) => {
                const isSelected = profile.posicion.toLowerCase().startsWith(pos.substring(0, 3).toLowerCase());
                return (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => handleFieldChange('posicion', pos)}
                    className={`py-2 text-center rounded border font-semibold uppercase tracking-wider text-[11px] select-none transition-all ${
                      isSelected
                        ? 'bg-[#2ecc71] text-[#020a05] border-[#2ecc71] font-bold'
                        : 'bg-[#020a05] text-[#bbcbbb] border-[#1a3a2a] hover:border-[#2ecc71]/40'
                    }`}
                  >
                    {pos}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BLOCK 2: MEASUREMENTS / MEDIDAS */}
        <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1a3a2a] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#2ecc71]" />
            <h3 className="font-display text-lg font-bold uppercase text-[#d8e6da] tracking-wide">
              {copy.catMedidas}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblAltura}</label>
              <input
                type="number"
                value={profile.altura}
                onChange={(e) => handleFieldChange('altura', parseInt(e.target.value) || 0)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-[#2ecc71]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblPeso}</label>
              <input
                type="number"
                value={profile.peso}
                onChange={(e) => handleFieldChange('peso', parseInt(e.target.value) || 0)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-[#2ecc71]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblSprint}</label>
              <input
                type="number"
                step="0.01"
                value={profile.sprints30m}
                onChange={(e) => handleFieldChange('sprints30m', parseFloat(e.target.value) || 0)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-[#2ecc71]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblResistencia}</label>
              <input
                type="text"
                value={profile.resistencia}
                onChange={(e) => handleFieldChange('resistencia', e.target.value)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-[#2ecc71]"
              />
            </div>
          </div>
        </div>

        {/* BLOCK 3: TIMES / TIEMPOS */}
        <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1a3a2a] pb-2">
            <Clock className="w-4 h-4 text-[#2ecc71]" />
            <h3 className="font-display text-lg font-bold uppercase text-[#d8e6da] tracking-wide">
              {copy.catTiempos}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblHorasEquipo}</label>
              <input
                type="number"
                value={profile.horasEquipo}
                onChange={(e) => handleFieldChange('horasEquipo', parseInt(e.target.value) || 0)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-[#2ecc71]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblHorasPersonal}</label>
              <input
                type="number"
                value={profile.horasPersonal}
                onChange={(e) => handleFieldChange('horasPersonal', parseInt(e.target.value) || 0)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:border-[#2ecc71]"
              />
            </div>
          </div>

          <div className="p-3.5 bg-[#020a05] border border-[#1a3a2a] rounded-xl text-center">
            <span className="block text-[10px] font-bold text-[#bbcbbb] uppercase tracking-widest">
              {copy.lblTotalHoras}
            </span>
            <span className="block font-display text-xl sm:text-2xl font-black text-white mt-1">
              {profile.horasEquipo + profile.horasPersonal}h
            </span>
          </div>
        </div>

        {/* BLOCK 4: MENTAL */}
        <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1a3a2a] pb-2">
            <Brain className="w-4 h-4 text-[#2ecc71]" />
            <h3 className="font-display text-lg font-bold uppercase text-[#d8e6da] tracking-wide">
              {copy.catMental}
            </h3>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblMetaCorto}</label>
              <textarea
                rows={2}
                value={profile.metaCortoPlazo}
                onChange={(e) => handleFieldChange('metaCortoPlazo', e.target.value)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2ecc71] resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#bbcbbb] uppercase tracking-wider">{copy.lblMetaLargo}</label>
              <textarea
                rows={2}
                value={profile.metaLargoPlazo}
                onChange={(e) => handleFieldChange('metaLargoPlazo', e.target.value)}
                className="w-full bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#2ecc71] resize-none"
              />
            </div>

            {/* Motivation slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-[#bbcbbb] uppercase tracking-wider text-[11px]">
                <span>{copy.lblMotivacion}</span>
                <span className="text-white font-mono">{profile.motivacion}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={profile.motivacion}
                onChange={(e) => handleFieldChange('motivacion', parseInt(e.target.value))}
                className="w-full accent-[#2ecc71] bg-[#020a05]"
              />
            </div>

            {/* Stress slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-[#bbcbbb] uppercase tracking-wider text-[11px]">
                <span>{copy.lblEstres}</span>
                <span className="text-white font-mono">{profile.estres}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={profile.estres}
                onChange={(e) => handleFieldChange('estres', parseInt(e.target.value))}
                className="w-full accent-[#2ecc71] bg-[#020a05]"
              />
            </div>
          </div>
        </div>

      </div>

      {/* GENERATE ACTION BUTTON */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleGenerateAiPlan}
          disabled={loading}
          className="relative inline-flex items-center justify-center gap-2 group px-8 py-4 bg-[#2ecc71] hover:bg-[#54e98a] disabled:bg-[#131e17] disabled:text-[#bbcbbb] active:scale-95 text-[#020a05] font-display text-base font-black uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(46,204,113,0.3)] hover:shadow-[0_0_25px_rgba(46,204,113,0.5)] transition-all cursor-pointer w-full select-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{currentLang === 'ES' ? 'ANALIZANDO BIOTIPO...' : 'ANALYZING BIOTYPE...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-[#020a05]" />
              <span>{copy.btnGenerarPlan}</span>
            </>
          )}
        </button>
      </div>

      {/* AI PLAN MODAL RESULT POPUP */}
      {aiReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0b1f17]/95 border-2 border-[#2ecc71] max-w-2xl w-full p-6 sm:p-8 rounded-2xl relative shadow-[0_0_50px_rgba(46,204,113,0.3)] animate-pulse-slow">
            
            <div className="flex items-center gap-2 text-[#2ecc71] border-b border-[#1a3a2a] pb-4 mb-4">
              <Sparkles className="w-5 h-5 fill-[#2ecc71]" />
              <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                {currentLang === 'ES' ? 'ANÁLISIS TÁCTICO IA COMPLETADO' : 'AI ATHLETIC BIODATA REPORT'}
              </h3>
            </div>

            <div className="text-[#d8e6da] font-sans text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line py-2 max-h-[350px] overflow-y-auto">
              {aiReport}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setAiReport(null)}
                className="px-6 py-2.5 rounded-lg bg-[#2ecc71] hover:bg-[#54e98a] text-[#020a05] font-display text-xs font-black uppercase tracking-wider select-none"
              >
                {currentLang === 'ES' ? 'ACEPTAR RECOMENDACIONES' : 'CONFIRM IA INSIGHTS'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
