import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { SLIDES } from '../constants';

const PresentationViewer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(p => p + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(p => p - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const progress = ((currentSlide + 1) / SLIDES.length) * 100;
  const slide = SLIDES[currentSlide];

  return (
    <div className="w-full h-screen bg-[#020617] text-slate-100 flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 pointer-events-none" />

      {/* Progress Bar */}
      <div className="w-full h-[3px] bg-slate-900/80 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(99,102,241,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Stage */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 z-10">
        
        {/* Slide Container - Increased size ratio */}
        <div className="w-[98vw] h-[94vh] max-w-[1800px] bg-slate-900/30 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden relative transition-all duration-500">
          
          {/* Header */}
          <div className="px-6 py-5 md:px-8 border-b border-white/5 flex justify-between items-center bg-slate-900/20">
            <div className="animate-slide">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 via-white to-cyan-100 tracking-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-indigo-400 mt-1 font-medium tracking-wide text-xs uppercase opacity-90">
                  {slide.subtitle}
                </p>
              )}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-slate-800/40 border border-white/5 text-xs font-mono text-slate-400">
                {String(currentSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar relative bg-gradient-to-b from-transparent to-slate-950/20">
             {/* Key changes trigger animation replay */}
            <div key={currentSlide} className="h-full w-full mx-auto">
              {slide.content}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 border-t border-white/5 bg-slate-950/30 flex items-center justify-between backdrop-blur-xl">
            <button 
                onClick={toggleFullscreen}
                className="p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95"
                title="Toggle Fullscreen"
            >
               {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/40 text-slate-300 hover:bg-slate-700/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/5 active:scale-95 backdrop-blur-md"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline font-medium tracking-wide">Prev</span>
              </button>

              <button
                onClick={nextSlide}
                disabled={currentSlide === SLIDES.length - 1}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95 border border-indigo-400/20"
              >
                <span className="hidden sm:inline font-medium tracking-wide">Next</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationViewer;