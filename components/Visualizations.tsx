import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, RotateCcw, Play, Pause, FastForward, Rewind } from 'lucide-react';

// --- Types ---
interface NodeData {
  id: number;
  val: number | string;
  highlight?: boolean;
  color?: string; // 'default' | 'accent' | 'success' | 'danger' | 'warning'
}

// --- Constants ---
// Pre-calculated positions for a 3-level binary heap (indices 0-6)
const NODE_POSITIONS = [
  { x: 50, y: 10 },    // 0
  { x: 25, y: 40 },    // 1
  { x: 75, y: 40 },    // 2
  { x: 12.5, y: 75 },  // 3
  { x: 37.5, y: 75 },  // 4
  { x: 62.5, y: 75 },  // 5
  { x: 87.5, y: 75 },  // 6
];

const LINES = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 6 },
];

const getColorClass = (type?: string) => {
  switch (type) {
    case 'accent': return 'bg-indigo-600 ring-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]';
    case 'success': return 'bg-emerald-600 ring-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
    case 'danger': return 'bg-rose-600 ring-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]';
    case 'warning': return 'bg-amber-600 ring-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
    case 'ghost': return 'bg-slate-700/50 ring-slate-600 opacity-50';
    default: return 'bg-slate-800 ring-slate-600 shadow-lg';
  }
};

// --- Components ---

export const HeapNode = ({ 
  val, 
  x, 
  y, 
  color, 
  highlight, 
  size = "md" 
}: { 
  val: number | string; 
  x: number; 
  y: number; 
  color?: string; 
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = size === "sm" ? "w-10 h-10 text-xs" : size === "lg" ? "w-16 h-16 text-xl" : "w-14 h-14 text-lg";
  
  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-bold transition-all duration-700 ease-in-out z-10
        ${sizeClasses}
        ${getColorClass(color)}
        ${highlight ? 'ring-4 scale-110 z-20' : 'ring-2'}
        text-white border border-white/10
      `}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {val}
    </div>
  );
};

export const HeapTree = ({ 
  data, 
  showIndices = false,
  comparingIndices = []
}: { 
  data: (NodeData | null)[]; 
  showIndices?: boolean;
  comparingIndices?: number[];
}) => {
  return (
    <div className="relative w-full h-full min-h-[300px] select-none">
      {/* Static Edges */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {LINES.map((line, i) => {
          if (!data[line.from] || !data[line.to]) return null;
          const start = NODE_POSITIONS[line.from];
          const end = NODE_POSITIONS[line.to];
          return (
            <line
              key={i}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="#475569"
              strokeWidth="2"
              className="opacity-40 transition-all duration-300"
            />
          );
        })}

        {/* Dynamic Comparison Line */}
        {comparingIndices.length === 2 && data[comparingIndices[0]] && data[comparingIndices[1]] && (
           <line 
             x1={`${NODE_POSITIONS[comparingIndices[0]].x}%`}
             y1={`${NODE_POSITIONS[comparingIndices[0]].y}%`}
             x2={`${NODE_POSITIONS[comparingIndices[1]].x}%`}
             y2={`${NODE_POSITIONS[comparingIndices[1]].y}%`}
             stroke="#f59e0b"
             strokeWidth="4"
             strokeLinecap="round"
             className="dash-draw opacity-80"
             filter="url(#glow)"
           />
        )}
      </svg>

      {/* Nodes - Using key=node.id for animation continuity */}
      {data.map((node, index) => {
        if (!node) return null;
        const pos = NODE_POSITIONS[index];
        if (!pos) return null; 
        
        return (
          <div key={node.id}>
            <HeapNode 
              val={node.val} 
              x={pos.x} 
              y={pos.y} 
              color={node.color} 
              highlight={node.highlight} 
            />
            {showIndices && (
              <div 
                className="absolute text-xs text-slate-500 font-mono font-semibold -translate-x-1/2 bg-slate-900/80 px-1.5 py-0.5 rounded transition-all duration-700 ease-in-out"
                style={{ left: `${pos.x}%`, top: `${pos.y + 14}%` }}
              >
                idx:{index}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ArrayVisualizer = ({ 
  data, 
  highlightIndices = [],
  comparingIndices = []
}: { 
  data: (number | string | null)[]; 
  highlightIndices?: number[];
  comparingIndices?: number[];
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {data.map((val, idx) => {
        if (val === null) return null;
        
        const isComparing = comparingIndices.includes(idx);
        const isHighlighted = highlightIndices.includes(idx);
        
        let borderClass = 'border-slate-700/50 bg-slate-800/50 text-slate-400';
        let containerClass = '';
        
        if (isComparing) {
          borderClass = 'border-amber-500/80 bg-amber-950/40 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-105';
        } else if (isHighlighted) {
           borderClass = 'border-indigo-400 bg-indigo-500/20 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110 -translate-y-1';
        }

        return (
          <div key={idx} className={`flex flex-col items-center group transition-all duration-500 ${containerClass}`}>
             <span className="text-xs text-slate-500 font-mono mb-1 transition-colors">{idx}</span>
             <div className={`
               w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl border-2 font-mono text-lg md:text-xl font-bold transition-all duration-500
               ${borderClass}
             `}>
               {val}
             </div>
          </div>
        );
      })}
    </div>
  );
};

export const InteractiveStep = ({ 
  steps, 
  title,
  description 
}: { 
  steps: { 
    data: (NodeData | null)[]; 
    desc: string; 
    highlightIndices?: number[];
    comparing?: number[];
  }[];
  title: string;
  description?: string;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return prev;
          }
        });
      }, 1500); // 1.5 seconds per step
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  const togglePlay = () => {
    if (currentStep === steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStep(Number(e.target.value));
    setIsPlaying(false);
  };

  const stepData = steps[currentStep];
  const simpleArrayData = stepData.data.map(n => n ? n.val : null);

  return (
    <div className="flex flex-col h-full gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 md:pb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            {title}
            {isPlaying && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>}
          </h3>
          <p className="text-base text-slate-400 mt-2 max-w-2xl">{description}</p>
        </div>
        
        {/* Playback Controls */}
        <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-xl border border-white/5 backdrop-blur-sm">
          <button 
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="p-2 hover:text-white text-slate-400 transition-colors"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
          
          <button 
             onClick={handlePrev}
             disabled={currentStep === 0}
             className="p-2 hover:text-white text-slate-400 disabled:opacity-30 transition-colors"
          >
            <Rewind size={20} fill="currentColor" className="opacity-50" />
          </button>

          <button 
            onClick={togglePlay}
            className="p-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <button 
             onClick={handleNext}
             disabled={currentStep === steps.length - 1}
             className="p-2 hover:text-white text-slate-400 disabled:opacity-30 transition-colors"
          >
             <FastForward size={20} fill="currentColor" className="opacity-50" />
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Tree View */}
        <div className="glass-panel rounded-2xl p-6 relative flex flex-col min-h-[350px]">
          <span className="absolute top-4 left-4 text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/30 px-2 py-1 rounded border border-indigo-500/20">Tree View</span>
          <div className="flex-1 mt-6">
             <HeapTree 
               data={stepData.data} 
               comparingIndices={stepData.comparing} 
             />
          </div>
        </div>

        {/* Info & Array View */}
        <div className="flex flex-col gap-6">
           <div className="glass-panel rounded-2xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden group">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full transition-all duration-1000 group-hover:bg-indigo-500/20"></div>
             
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</span>
                 <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-indigo-500 transition-all duration-300"
                     style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                   />
                 </div>
               </div>
               
               <p className="text-xl md:text-2xl text-slate-100 font-light leading-relaxed">
                 {stepData.desc}
               </p>

               {/* Seek Slider */}
               <div className="mt-8 flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
                 <input 
                   type="range" 
                   min="0" 
                   max={steps.length - 1} 
                   value={currentStep} 
                   onChange={handleSeek}
                   className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                 />
               </div>
             </div>
           </div>
           
           <div className="glass-panel rounded-2xl p-6">
             <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Array View</span>
                {stepData.comparing && (
                  <span className="text-xs text-amber-400 flex items-center gap-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Comparing
                  </span>
                )}
             </div>
             <ArrayVisualizer 
               data={simpleArrayData} 
               highlightIndices={stepData.highlightIndices}
               comparingIndices={stepData.comparing}
             />
           </div>
        </div>
      </div>
    </div>
  );
};