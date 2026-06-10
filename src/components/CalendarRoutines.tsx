import React from 'react';
import { Language, LANGUAGES, DailyRoutine, TrainingItem } from '../types';
import { Calendar, CheckSquare, Square, Check, ArrowRight, Zap, Play, PlayCircle, Loader } from 'lucide-react';

interface CalendarRoutinesProps {
  currentLang: Language;
  routines: DailyRoutine[];
  onToggleExercise: (dayNum: number, exerciseId: string) => void;
  onConfirmDayRoutine: (dayNum: number) => void;
}

export default function CalendarRoutines({
  currentLang,
  routines,
  onToggleExercise,
  onConfirmDayRoutine
}: CalendarRoutinesProps) {
  const copy = LANGUAGES[currentLang];
  const [selectedDay, setSelectedDay] = React.useState<number>(8); // LUN (8) as default

  const currentDayRoutine = routines.find(r => r.dayNum === selectedDay);

  // Calculate live weekly progress based on total completed sub-exercises
  const allExercises = routines.flatMap(r => r.exercises);
  const totalExercisesCount = allExercises.length;
  const completedExercisesCount = allExercises.filter(ex => ex.completed).length;
  const weeklyProgressPercent = totalExercisesCount > 0 
    ? Math.round((completedExercisesCount / totalExercisesCount) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 relative z-10 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
          {copy.calTitle}
        </h1>
        <p className="font-sans text-xs text-[#bbcbbb] uppercase tracking-widest max-w-lg mx-auto">
          {copy.calSubtitle}
        </p>
      </div>

      {/* Progress tracker */}
      <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-4.5 rounded-2xl space-y-3 shadow-[inset_0_1px_2px_rgba(26,58,42,0.3)]">
        <div className="flex justify-between items-center text-xs font-bold font-mono">
          <span className="text-[#bbcbbb] uppercase tracking-wider">{copy.weeklyProg}</span>
          <span className="text-[#2ecc71] font-extrabold">{weeklyProgressPercent}%</span>
        </div>
        
        {/* Progress Bar with neon green glow gradient */}
        <div className="w-full bg-[#020a05] h-3.5 rounded-full border border-[#1a3a2a] p-0.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(46,204,113,0.4)]"
            style={{ width: `${weeklyProgressPercent}%` }}
          />
        </div>
      </div>

      {/* Grid: Calendar Days vs Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Days selector list (Left col) */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-[#bbcbbb] uppercase tracking-widest">
            <span>{copy.week} 1</span>
            <Calendar className="w-4 h-4 text-[#2ecc71]" />
          </div>

          <div className="space-y-1.5 max-h-[360px] overflow-y-auto">
            {routines.map((item) => {
              const isSelected = item.dayNum === selectedDay;
              // calculate sub-exercise completions for active badges
              const dayTotal = item.exercises.length;
              const dayDone = item.exercises.filter(e => e.completed).length;
              const isFullyDone = dayTotal > 0 && dayDone === dayTotal;

              return (
                <button
                  key={item.dayNum}
                  onClick={() => setSelectedDay(item.dayNum)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between select-none transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#131e17] border-[#2ecc71] text-white shadow-[0_0_15px_rgba(46,204,113,0.15)]'
                      : 'bg-[#0b1f17]/80 border-[#1a3a2a] text-[#bbcbbb] hover:border-[#2ecc71]/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Circle badge date */}
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="font-display text-lg font-black italic tracking-tighter leading-none">
                        {item.dayNum}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5">
                        {item.dayLabel}
                      </span>
                    </div>

                    <div className="border-l border-[#1a3a2a]/60 pl-3">
                      <span className="font-display text-sm font-bold uppercase block tracking-tight">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#bbcbbb] font-sans truncate block max-w-[160px]">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.isToday && (
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase bg-[#2ecc71] text-[#020a05] tracking-widest">
                        {currentLang === 'ES' ? 'HOY' : 'TODAY'}
                      </span>
                    )}

                    {isFullyDone ? (
                      <span className="w-5 h-5 rounded-full bg-[#2ecc71] text-[#020a05] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    ) : item.exercises.length > 0 ? (
                      <span className="text-[9px] font-bold text-[#2ecc71] font-mono">
                        {dayDone}/{dayTotal}
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-gray-500 tracking-wider">
                        {copy.descanso}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed exercises card (Right col) */}
        <div className="md:col-span-7">
          {currentDayRoutine ? (
            <div className="bg-[#0b1f17]/95 border border-[#2ecc71]/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden shadow-[0_0_20px_rgba(46,204,113,0.1)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#2ecc71]/5 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Header detail */}
                <div className="flex items-start justify-between border-b border-[#1a3a2a]/60 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#bbcbbb] font-mono">
                      {currentLang === 'ES' ? 'DETALLES DE RUTINA' : 'ROUTINE DETAILS'}
                    </span>
                    <h3 className="font-display text-2xl font-black italic tracking-tighter uppercase text-[#2ecc71] mt-0.5">
                      {currentDayRoutine.title}
                    </h3>
                    <p className="text-xs text-[#bbcbbb] font-sans">
                      {currentDayRoutine.description}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-md bg-[#131e17] text-[#2ecc71] border border-[#2ecc71]/20 font-display text-xs font-black uppercase tracking-widest">
                    {currentDayRoutine.difficulty}
                  </span>
                </div>

                {/* Sub-exercises check off */}
                {currentDayRoutine.exercises.length > 0 ? (
                  <div className="space-y-2.5 py-2">
                    {currentDayRoutine.exercises.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onToggleExercise(currentDayRoutine.dayNum, item.id)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-colors select-none ${
                          item.completed
                            ? 'bg-[#131e17]/80 border-[#2ecc71]/40 text-white'
                            : 'bg-[#020a05] border-[#1a3a2a] text-[#bbcbbb] hover:border-[#2ecc71]/10'
                        }`}
                      >
                        {item.completed ? (
                          <div className="w-5 h-5 rounded-full bg-[#2ecc71] text-[#020a05] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#1a3a2a] hover:border-[#2ecc71]" />
                        )}
                        <span className="text-xs font-bold leading-none">{item.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#bbcbbb] font-sans text-xs">
                    {currentLang === 'ES' 
                      ? 'No hay ejercicios agendados. ¡Día de recuperación y descanso planificado!'
                      : 'No exercises scheduled. Active rest and recovery day planned!'
                    }
                  </div>
                )}
              </div>

              {/* Confirm Bottom Action */}
              {currentDayRoutine.exercises.length > 0 && (
                <div className="pt-5 border-t border-[#1a3a2a]/60 relative z-10">
                  <button
                    onClick={() => onConfirmDayRoutine(currentDayRoutine.dayNum)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#2ecc71] hover:bg-[#54e98a] text-[#020a05] font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(46,204,113,0.3)] transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-[#020a05] stroke-none" />
                    <span>{copy.confirmRoutine}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="border border-dashed border-[#1a3a2a] rounded-2xl p-12 text-center text-[#bbcbbb] text-xs font-sans">
              No day selected.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
