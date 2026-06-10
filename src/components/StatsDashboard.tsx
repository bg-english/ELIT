import React from 'react';
import { Language, LANGUAGES, INITIAL_KPI_HISTORY, MetricLog, AthleticProfile } from '../types';
import { Circle, CheckCircle, TrendingUp, Zap, HelpCircle, Activity, Save } from 'lucide-react';

interface StatsDashboardProps {
  currentLang: Language;
  profile: AthleticProfile;
  onLogNewMark: (category: string, value: number) => void;
  recentLogs: MetricLog[];
}

export default function StatsDashboard({ currentLang, profile, onLogNewMark, recentLogs }: StatsDashboardProps) {
  const copy = LANGUAGES[currentLang];
  
  // Local state for checkboxes
  const [showVelocidad, setShowVelocidad] = React.useState(true);
  const [showResistencia, setShowResistencia] = React.useState(true);
  
  // Registration state
  const [category, setCategory] = React.useState('Velocidad 30m (seg)');
  const [valInput, setValInput] = React.useState('');
  const [alertMsg, setAlertMsg] = React.useState(false);

  // Stats mapped from profile
  const velocityScore = Math.round(Math.min(99, Math.max(40, (5.5 - profile.sprints30m) * 30 + 40)));
  const technicalScore = 75; // dynamic relative base
  const strengthScore = Math.round(profile.horasPersonal * 5 + 47); // dynamic relative
  const mentalScore = Math.round(profile.motivacion * 10 - profile.estres * 5); // motivation and stress relative
  const staminaScore = 68; // based on resist

  const averageScore = Math.round((velocityScore + technicalScore + strengthScore + mentalScore + staminaScore) / 5);

  const handleSaveMark = (e: React.FormEvent) => {
    e.preventDefault();
    const valNum = parseFloat(valInput);
    if (!isNaN(valNum) && valNum > 0) {
      onLogNewMark(category, valNum);
      setValInput('');
      setAlertMsg(true);
      setTimeout(() => setAlertMsg(false), 3000);
    }
  };

  // Chart data setup based on Ene to Ago
  const rawChartData = INITIAL_KPI_HISTORY;
  
  // Scale dimensions for a beautiful, responsive custom SVG line chart
  const padding = 40;
  const chartHeight = 220;
  const chartWidth = 520;

  // Render SVG points based on toggle settings
  const generatePoints = (key: 'velocidad' | 'resistencia') => {
    return rawChartData.map((data, idx) => {
      const x = padding + (idx / (rawChartData.length - 1)) * (chartWidth - padding * 2);
      const val = data[key];
      // Map score 50-100 to height
      const y = chartHeight - padding - ((val - 50) / 50) * (chartHeight - padding * 2);
      return { x, y, val, label: data.mes };
    });
  };

  const velPoints = generatePoints('velocidad');
  const resPoints = generatePoints('resistencia');

  const createPathString = (points: {x: number, y: number}[]) => {
    if (points.length === 0) return '';
    return points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 relative z-10">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
          {copy.dashTitle}
        </h1>
        <p className="font-sans text-xs text-[#bbcbbb] uppercase tracking-widest">
          {copy.dashSubtitle}
        </p>
      </div>

      {/* Traffic Light IA */}
      <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-4 rounded-xl text-center flex flex-col items-center justify-center space-y-1.5 shadow-[inset_0_1px_2px_rgba(26,58,42,0.5)]">
        <span className="font-sans text-[10px] uppercase tracking-wider text-[#bbcbbb] font-bold">
          {copy.semaforo}
        </span>
        <div className="flex items-center gap-2">
          <span className="w-4.5 h-4.5 rounded-full bg-[#2ecc71] animate-ping absolute opacity-50" />
          <span className="relative w-4.5 h-4.5 rounded-full bg-[#2ecc71] border-2 border-[#020a05]" />
          <span className="font-display text-2xl font-black italic tracking-tight text-[#2ecc71]">
            {copy.optimo}
          </span>
        </div>
        <p className="font-sans text-[11px] text-[#bbcbbb]">
          {currentLang === 'ES' 
            ? `Carga óptima • ${profile.horasEquipo + profile.horasPersonal}h/sem • estrés ${profile.estres}/10.`
            : `Optimal load • ${profile.horasEquipo + profile.horasPersonal}h/week • stress ${profile.estres}/10.`
          }
        </p>
      </div>

      {/* Main Grid: Evaluation vs History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* EVALUACION IA MODULE */}
        <div className="lg:col-span-5 bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-[#1a3a2a] pb-3">
            <span className="font-display text-base font-bold text-[#d8e6da] tracking-wide uppercase">
              {copy.evalTitle}
            </span>
            <Activity className="w-5 h-5 text-[#2ecc71]" />
          </div>

          {/* Radial potential score arc */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* background circle */}
              <svg className="absolute w-full h-full rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#1a3a2a"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#2ecc71"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * averageScore) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Inner score */}
              <div className="text-center z-10">
                <span className="font-display text-4xl font-extrabold text-[#d8e6da]">
                  {averageScore}
                </span>
                <span className="text-[#bbcbbb] font-display text-xl">/100</span>
              </div>
            </div>
            
            <div className="text-center mt-3">
              <span className="block font-sans text-[10px] uppercase tracking-widest text-[#bbcbbb] font-bold">
                {copy.potencialLabel}
              </span>
              <span className="block font-display text-sm font-semibold tracking-wide text-[#2ecc71] mt-0.5">
                {profile.posicion} ({copy.potencialNivel})
              </span>
            </div>
          </div>

          {/* Vertical progress metrics */}
          <div className="space-y-3 font-sans text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[#bbcbbb]">Velocidad</span>
                <span className="text-white font-mono">{velocityScore}</span>
              </div>
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${velocityScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[#bbcbbb]">Resistencia</span>
                <span className="text-white font-mono">{staminaScore}</span>
              </div>
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${staminaScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[#bbcbbb]">Fuerza</span>
                <span className="text-white font-mono">{strengthScore}</span>
              </div>
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${strengthScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[#bbcbbb]">Mental</span>
                <span className="text-white font-mono">{mentalScore}</span>
              </div>
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${mentalScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[#bbcbbb]">Técnica</span>
                <span className="text-white font-mono">{technicalScore}</span>
              </div>
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${technicalScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* HISTORIAL INTERACTIVE GRAPH MODULE */}
        <div className="lg:col-span-7 bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 sm:p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a3a2a] pb-3 gap-2">
            <span className="font-display text-base font-bold text-[#d8e6da] tracking-wide uppercase">
              {copy.historialChart}
            </span>
            
            {/* Custom Checkbox controls */}
            <div className="flex items-center gap-4 text-xs font-sans font-semibold">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#bbcbbb] hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={showVelocidad}
                  onChange={(e) => setShowVelocidad(e.target.checked)}
                  className="rounded bg-[#020a05] border-[#1a3a2a] text-[#2ecc71] focus:ring-0 focus:ring-offset-0 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2ecc71] inline-block" />
                  {currentLang === 'ES' ? 'Velocidad' : 'Speed'}
                </span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#bbcbbb] hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={showResistencia}
                  onChange={(e) => setShowResistencia(e.target.checked)}
                  className="rounded bg-[#020a05] border-[#1a3a2a] text-[#006d37] focus:ring-0 focus:ring-offset-0 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006d37] inline-block" />
                  {currentLang === 'ES' ? 'Resistencia' : 'Stamina'}
                </span>
              </label>
            </div>
          </div>

          {/* SVG Custom Render Graph */}
          <div className="relative overflow-x-auto select-none pt-4">
            <div className="min-w-[480px]">
              <svg className="w-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} fill="none">
                
                {/* Horizontal reference lines */}
                {[50, 60, 70, 80, 90, 100].map((level, i) => {
                  const y = chartHeight - padding - ((level - 50) / 50) * (chartHeight - padding * 2);
                  return (
                    <g key={level} className="opacity-40">
                      <line
                        x1={padding}
                        y1={y}
                        x2={chartWidth - padding}
                        y2={y}
                        stroke="#1a3a2a"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padding - 10}
                        y={y + 4}
                        fill="#bbcbbb"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="end"
                      >
                        {level}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical months tags */}
                {rawChartData.map((data, idx) => {
                  const x = padding + (idx / (rawChartData.length - 1)) * (chartWidth - padding * 2);
                  return (
                    <text
                      key={data.mes}
                      x={x}
                      y={chartHeight - padding + 18}
                      fill="#bbcbbb"
                      fontSize="10"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      {data.mes}
                    </text>
                  );
                })}

                {/* Draw Velocidad Line & Points */}
                {showVelocidad && (
                  <>
                    <path
                      d={createPathString(velPoints)}
                      stroke="#2ecc71"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {velPoints.map((p, i) => (
                      <g key={i} className="group">
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="5"
                          fill="#020a05"
                          stroke="#2ecc71"
                          strokeWidth="2.5"
                        />
                        <text
                          x={p.x}
                          y={p.y - 10}
                          fill="#2ecc71"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="middle"
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-black"
                        >
                          {p.val}
                        </text>
                      </g>
                    ))}
                  </>
                )}

                {/* Draw Resistencia Line & Points */}
                {showResistencia && (
                  <>
                    <path
                      d={createPathString(resPoints)}
                      stroke="#006d37"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {resPoints.map((p, i) => (
                      <g key={i} className="group">
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="4"
                          fill="#020a05"
                          stroke="#005228"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                  </>
                )}

              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* RECORD ATLETHIC MARK */}
      <div className="bg-[#0b1f17]/90 border border-[#1a3a2a]/80 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="block font-display text-base font-black uppercase text-[#d8e6da] tracking-wide">
            {copy.cardRegistrar}
          </span>
          <p className="text-xs text-[#bbcbbb] font-sans">
            {currentLang === 'ES' 
              ? 'Registra tus marcas actuales en entrenamientos de campo para recalcular biotipo.'
              : 'Add your raw workout metrics to instantly calibrate athletic bio stats.'
            }
          </p>
        </div>

        <form onSubmit={handleSaveMark} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:max-w-xl w-full">
          {/* Category Dropdown */}
          <div className="flex-1 flex flex-col gap-1 text-[10px] font-bold text-[#bbcbbb] uppercase font-sans">
            <span>{copy.labelCategoria}</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#2ecc71] transition-colors"
            >
              <option value="Velocidad 30m (seg)">{currentLang === 'ES' ? 'Velocidad 30m (seg)' : 'Speed 30m (sec)'}</option>
              <option value="Resistencia (min)">{currentLang === 'ES' ? 'Resistencia (min)' : 'Stamina (min)'}</option>
              <option value="Fuerza (Sentadillas kg)">{currentLang === 'ES' ? 'Fuerza (Sentadillas kg)' : 'Squat Strength (kg)'}</option>
              <option value="Técnica (Pases exitosos)">{currentLang === 'ES' ? 'Técnica (Pases exitosos)' : 'Passing Accuracy %'}</option>
            </select>
          </div>

          {/* Value input */}
          <div className="flex-1 sm:max-w-[120px] flex flex-col gap-1 text-[10px] font-bold text-[#bbcbbb] uppercase font-sans">
            <span>{copy.labelValor}</span>
            <input
              type="number"
              step="0.01"
              required
              placeholder="e.g. 4.1"
              value={valInput}
              onChange={(e) => setValInput(e.target.value)}
              className="bg-[#020a05] text-[#d8e6da] border border-[#1a3a2a] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#2ecc71]"
            />
          </div>

          <div className="sm:self-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#2ecc71] hover:bg-[#54e98a] text-[#020a05] font-display text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(46,204,113,0.2)]"
            >
              <Save className="w-3.5 h-3.5" />
              {copy.btnGuardar}
            </button>
          </div>
        </form>
      </div>

      {/* Alert toast */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#06100a] border-l-4 border-[#2ecc71] text-[#2ecc71] p-4 rounded-lg shadow-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span>{copy.alertMarcaGuardada}</span>
        </div>
      )}

      {/* Recent history list if any custom metrics exist */}
      {recentLogs.length > 0 && (
        <div className="bg-[#0b1f17]/60 border border-[#1a3a2a] p-4.5 rounded-2xl">
          <h4 className="font-display text-xs font-bold uppercase text-[#bbcbbb] tracking-wider mb-2">
            {currentLang === 'ES' ? 'HISTORIAL RECIENTE REGISTRADO' : 'RECENT REGISTERED MARKS'}
          </h4>
          <div className="space-y-1.5">
            {recentLogs.slice().reverse().map((log, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-[#1a3a2a]/30 pb-1.5 last:border-0 font-mono">
                <span className="text-[#bbcbbb] text-[11px] font-sans font-semibold">{log.categoria}</span>
                <span className="text-[#2ecc71] font-bold">{log.valor} <span className="text-[10px] text-gray-500 font-sans font-normal">{log.fecha}</span></span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
