import React from 'react';
import { Language, LANGUAGES, REFERENCE_VIDEOS, VideoReference } from '../types';
import { Video, Sparkles, Film, PlayCircle, Trophy, Check, RefreshCw, X } from 'lucide-react';

interface ScoutingIAProps {
  currentLang: Language;
}

export default function ScoutingIA({ currentLang }: ScoutingIAProps) {
  const copy = LANGUAGES[currentLang];
  
  // Simulated analysis state
  const [analyzing, setAnalyzing] = React.useState(false);
  const [analysisCompleted, setAnalysisCompleted] = React.useState(false);
  const [percent, setPercent] = React.useState(0);
  const [dragActive, setDragActive] = React.useState(false);
  const [activeVideo, setActiveVideo] = React.useState<VideoReference | null>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setAnalysisCompleted(false);
    setPercent(0);
  };

  // Run progress loading simulation
  React.useEffect(() => {
    let interval: any;
    if (analyzing) {
      interval = setInterval(() => {
        setPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setAnalyzing(false);
            setAnalysisCompleted(true);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [analyzing]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startAnalysis();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysis();
    }
  };

  // Mock results
  const speedScore = 85;
  const techScore = 92;
  const strengthScore = 78;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 relative z-10 font-sans">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-[#d8e6da]">
          {copy.navScouting}
        </h1>
        <div className="w-12 h-1 bg-[#2ecc71] mx-auto mt-2 rounded" />
      </div>

      {/* DRAG AND DROP ZONE */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 relative overflow-hidden backdrop-blur-sm ${
          dragActive
            ? 'border-[#2ecc71] bg-[#131e17]/80 scale-[1.01]'
            : 'border-[#1a3a2a] bg-[#0b1f17]/70 hover:border-[#2ecc71]/40'
        }`}
      >
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#131e17] text-[#2ecc71] border border-[#2ecc71]/30">
            <Video className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase text-[#d8e6da] tracking-wide">
              {copy.subeVideoTitle}
            </h3>
            <p className="text-xs text-[#bbcbbb] mt-1 font-semibold">
              {copy.subeVideoDesc}
            </p>
          </div>

          {/* Trigger button input */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#131e17] hover:bg-[#2ecc71]/10 text-[#2ecc71] border border-[#2ecc71]/40 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-md select-none">
              <Film className="w-3.5 h-3.5" />
              <span>{currentLang === 'ES' ? 'Seleccionar Archivo' : 'Browse File'}</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* LOADING PROGRESS SCAN */}
        {analyzing && (
          <div className="absolute inset-0 bg-[#020a05]/95 flex flex-col items-center justify-center p-6 space-y-4 animate-fade-in">
            <span className="text-xs font-bold text-[#2ecc71] uppercase tracking-[0.2em] animate-pulse">
              {copy.analyzingVideo}
            </span>
            <div className="w-full max-w-sm bg-[#131e17] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
              <div 
                className="bg-gradient-to-r from-[#2ecc71] to-[#54e98a] h-full rounded-full transition-all duration-300" 
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs font-bold font-mono text-white">{percent}%</span>
          </div>
        )}
      </div>

      {/* SCOUTING DIAGNOSTICS BLOCKS */}
      {(analysisCompleted || !analyzing) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a3a2a] pb-2">
            <span className="font-display text-base font-bold text-[#d8e6da] tracking-wide uppercase flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[#2ecc71]" />
              {copy.scoutingTitle}
            </span>
            
            {analysisCompleted && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2ecc71] bg-[#131e17] px-2.5 py-1 rounded-full border border-[#2ecc71]/20">
                <Check className="w-3 h-3 stroke-[3]" />
                {copy.analysisDone}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* VELOCIDAD */}
            <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="font-display text-base font-extrabold text-[#d8e6da] tracking-wide uppercase">
                  {copy.lblVelocidad}
                </span>
                <span className="font-display text-xl font-bold text-[#2ecc71] font-mono">
                  {analysisCompleted ? speedScore : 0}/100
                </span>
              </div>
              
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-[#2ecc71] h-full rounded-full transition-all duration-1000" 
                  style={{ width: analysisCompleted ? `${speedScore}%` : '0%' }}
                />
              </div>

              <ul className="space-y-1.5 text-[11px] text-[#bbcbbb] font-sans">
                {copy.scoutingDetailsVel.map((det, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full" />
                    <span>{det}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TECNICA */}
            <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="font-display text-base font-extrabold text-[#d8e6da] tracking-wide uppercase">
                  {copy.lblTecnica}
                </span>
                <span className="font-display text-xl font-bold text-[#2ecc71] font-mono">
                  {analysisCompleted ? techScore : 0}/100
                </span>
              </div>
              
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-[#2ecc71] h-full rounded-full transition-all duration-1000" 
                  style={{ width: analysisCompleted ? `${techScore}%` : '0%' }}
                />
              </div>

              <ul className="space-y-1.5 text-[11px] text-[#bbcbbb] font-sans">
                {copy.scoutingDetailsTec.map((det, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full" />
                    <span>{det}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FUERZA */}
            <div className="bg-[#0b1f17]/90 border border-[#1a3a2a] p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="font-display text-base font-extrabold text-[#d8e6da] tracking-wide uppercase">
                  {copy.lblFuerza}
                </span>
                <span className="font-display text-xl font-bold text-[#2ecc71] font-mono">
                  {analysisCompleted ? strengthScore : 0}/100
                </span>
              </div>
              
              <div className="w-full bg-[#020a05] h-2.5 rounded-full overflow-hidden border border-[#1a3a2a]">
                <div 
                  className="bg-[#2ecc71] h-full rounded-full transition-all duration-1000" 
                  style={{ width: analysisCompleted ? `${strengthScore}%` : '0%' }}
                />
              </div>

              <ul className="space-y-1.5 text-[11px] text-[#bbcbbb] font-sans">
                {copy.scoutingDetailsFue.map((det, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full" />
                    <span>{det}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {analysisCompleted && (
            <div className="text-center pt-2">
              <button
                onClick={startAnalysis}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#bbcbbb] hover:text-[#2ecc71] uppercase tracking-wider"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{currentLang === 'ES' ? 'Analizar otro Video' : 'Re-run analysis'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* REFERENCE CLINICAL CLINICS VIDEOS */}
      <div className="space-y-4">
        <h3 className="font-display text-base font-bold text-[#d8e6da] uppercase tracking-wider border-b border-[#1a3a2a] pb-2">
          {copy.refVideos}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {REFERENCE_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-[#0b1f17]/90 border border-[#1a3a2a] rounded-2xl overflow-hidden cursor-pointer group hover:border-[#2ecc71]/40 transition-colors"
            >
              {/* Thumbnail with overlay icon */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black flex items-center justify-center">
                <img
                  referrerPolicy="no-referrer"
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Floating pill badge tag */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#020a05]/95 text-[#2ecc71] text-[9px] font-black uppercase font-mono tracking-wider border border-[#2ecc71]/20">
                  {vid.tag}
                </span>

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <PlayCircle className="w-11 h-11 text-[#2ecc71] filter drop-shadow-[0_0_8px_rgba(46,204,113,0.4)] opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="p-3">
                <h4 className="font-display text-xs font-bold text-[#d8e6da] uppercase tracking-tight group-hover:text-white transition-colors">
                  {vid.id === 'vid1' ? copy.refVelTitle : vid.id === 'vid2' ? copy.refTecTitle : copy.refFueTitle}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP VIDEO CLIPS PLAYER DIALOG */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0b1f17]/95 border border-[#2ecc71] max-w-xl w-full rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(46,204,113,0.3)]">
            
            <div className="flex justify-between items-center bg-[#131e17] px-4.5 py-3 border-b border-[#1a3a2a]">
              <span className="font-display text-xs font-black uppercase text-[#2ecc71] tracking-wider">
                {activeVideo.tag} • {activeVideo.title}
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-[#bbcbbb] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 text-center">
              <button
                onClick={() => setActiveVideo(null)}
                className="px-6 py-2 rounded-lg bg-[#2ecc71] text-[#020a05] text-xs font-black uppercase tracking-wider"
              >
                {currentLang === 'ES' ? 'Cerrar Video' : 'Close Video'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
