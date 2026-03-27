import React from 'react';
import { Slide } from './types';
import { 
  Server, 
  Activity, 
  Plane, 
  Mail, 
  ArrowDown, 
  ArrowUp, 
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2, 
  Layers, 
  Database,
  GitMerge,
  Trash2,
  Cpu,
  Trophy,
  Zap,
  Ban,
  Check,
  Calendar,
  Clock,
  Sliders,
  TrendingUp,
  Search,
  List,
  GitCommit
} from 'lucide-react';
import { HeapTree, InteractiveStep, ArrayVisualizer } from './components/Visualizations';

// --- Data for Interactive Slides ---

// IDs must be consistent for animation to work.
// Nodes: 10(id:1), 20(id:2), 15(id:3), 30(id:4), 40(id:5), 18(id:6), 12(id:7)
const INSERT_STEPS_REVISED = [
  {
    data: [
      { id: 1, val: 10, color: 'default' },
      { id: 2, val: 20, color: 'default' },
      { id: 3, val: 15, color: 'default' },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
    ],
    desc: "Initial Min-Heap state. We want to insert the value '12'.",
    highlightIndices: [],
    comparing: []
  },
  {
    data: [
      { id: 1, val: 10, color: 'default' },
      { id: 2, val: 20, color: 'default' },
      { id: 3, val: 15, color: 'default' },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
      { id: 7, val: 12, color: 'accent', highlight: true }, // New Node
    ],
    desc: "1. Add '12' to the next available position (Index 6) to maintain the Complete Tree property.",
    highlightIndices: [6],
    comparing: []
  },
  {
    data: [
      { id: 1, val: 10, color: 'default' },
      { id: 2, val: 20, color: 'default' },
      { id: 3, val: 15, color: 'warning' }, 
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
      { id: 7, val: 12, color: 'accent', highlight: true },
    ],
    desc: "2. Compare '12' with its parent '15' (at index 2).",
    highlightIndices: [6, 2],
    comparing: [6, 2]
  },
  {
    data: [
      { id: 1, val: 10, color: 'default' },
      { id: 2, val: 20, color: 'default' },
      { id: 7, val: 12, color: 'accent', highlight: true }, // Swapped
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
      { id: 3, val: 15, color: 'warning' }, // Swapped
    ],
    desc: "3. Since 12 < 15, we SWAP them. '12' bubbles up.",
    highlightIndices: [2, 6],
    comparing: []
  },
  {
    data: [
      { id: 1, val: 10, color: 'warning' }, // Parent
      { id: 2, val: 20, color: 'default' },
      { id: 7, val: 12, color: 'accent', highlight: true }, // Child
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
      { id: 3, val: 15, color: 'default' }, 
    ],
    desc: "4. Compare '12' with its new parent '10' (at index 0).",
    highlightIndices: [2, 0],
    comparing: [2, 0]
  },
  {
    data: [
      { id: 1, val: 10, color: 'success' },
      { id: 2, val: 20, color: 'default' },
      { id: 7, val: 12, color: 'success' }, 
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
      { id: 3, val: 15, color: 'default' }, 
    ],
    desc: "5. 12 is greater than 10. Heap order is satisfied. Insertion Complete!",
    highlightIndices: [],
    comparing: []
  }
];

// Delete Steps
// Nodes: 10(id:1), 20(id:2), 15(id:3), 30(id:4), 40(id:5), 18(id:6), 25(id:7)
const DELETE_STEPS = [
  {
    data: [
      { id: 1, val: 10, color: 'danger', highlight: true }, // Root
      { id: 2, val: 20, color: 'default' },
      { id: 3, val: 15, color: 'default' },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
      { id: 7, val: 25, color: 'accent' }, // Last
    ],
    desc: "Initial State. We want to delete the minimum element (Root: 10).",
    highlightIndices: [0],
    comparing: []
  },
  {
    data: [
      { id: 7, val: 25, color: 'accent', highlight: true }, // Moved to root
      { id: 2, val: 20, color: 'default' },
      { id: 3, val: 15, color: 'default' },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
    ],
    desc: "1. Remove '10' and move the last element '25' to the root position.",
    highlightIndices: [0],
    comparing: []
  },
  {
    data: [
      { id: 7, val: 25, color: 'accent', highlight: true },
      { id: 2, val: 20, color: 'warning' },
      { id: 3, val: 15, color: 'warning' },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
    ],
    desc: "2. Identify children of '25' (20 and 15). '15' is the smaller child.",
    highlightIndices: [1, 2],
    comparing: [0, 2] // Comparing root with smaller child
  },
  {
    data: [
      { id: 7, val: 25, color: 'accent', highlight: true },
      { id: 2, val: 20, color: 'default' },
      { id: 3, val: 15, color: 'warning' },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
    ],
    desc: "3. Compare '25' with smaller child '15'.",
    highlightIndices: [0, 2],
    comparing: [0, 2]
  },
  {
    data: [
      { id: 3, val: 15, color: 'default' }, // Swapped
      { id: 2, val: 20, color: 'default' },
      { id: 7, val: 25, color: 'accent', highlight: true }, // Swapped down
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'default' },
    ],
    desc: "4. Since 25 > 15, SWAP them. '25' bubbles down.",
    highlightIndices: [0, 2],
    comparing: []
  },
  {
    data: [
      { id: 3, val: 15, color: 'default' },
      { id: 2, val: 20, color: 'default' },
      { id: 7, val: 25, color: 'accent', highlight: true },
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 6, val: 18, color: 'warning' }, // New child
    ],
    desc: "5. Compare '25' with its new child '18' (at index 5).",
    highlightIndices: [2, 5],
    comparing: [2, 5]
  },
  {
    data: [
      { id: 3, val: 15, color: 'default' },
      { id: 2, val: 20, color: 'default' },
      { id: 6, val: 18, color: 'default' }, // Swapped
      { id: 4, val: 30, color: 'default' },
      { id: 5, val: 40, color: 'default' },
      { id: 7, val: 25, color: 'success', highlight: true }, // Settled
    ],
    desc: "6. Since 25 > 18, SWAP them. Heap order is restored!",
    highlightIndices: [2, 5],
    comparing: []
  }
];

// --- Helper Components ---

const ArrowRightIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500/50"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const ExampleCard = ({ icon, title, desc, color, delay, image }: any) => {
  const textColors: Record<string, string> = {
    rose: 'text-rose-200 group-hover:text-rose-100',
    blue: 'text-blue-200 group-hover:text-blue-100',
    emerald: 'text-emerald-200 group-hover:text-emerald-100',
    amber: 'text-amber-200 group-hover:text-amber-100',
  };
  
  const bgColors: Record<string, string> = {
     rose: 'bg-rose-500/20 group-hover:bg-rose-500/30',
     blue: 'bg-blue-500/20 group-hover:bg-blue-500/30',
     emerald: 'bg-emerald-500/20 group-hover:bg-emerald-500/30',
     amber: 'bg-amber-500/20 group-hover:bg-amber-500/30',
  };

  const borderColors: Record<string, string> = {
     rose: 'border-rose-500/30',
     blue: 'border-blue-500/30',
     emerald: 'border-emerald-500/30',
     amber: 'border-amber-500/30',
  };

  return (
    <div className={`group relative rounded-3xl overflow-hidden border ${borderColors[color]} bg-slate-900/50 opacity-0 animate-scale ${delay} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-[340px] w-full`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-60 saturate-50 group-hover:saturate-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end">
        <div className={`mb-4 w-12 h-12 rounded-xl ${bgColors[color]} backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        <h3 className={`text-2xl font-bold ${textColors[color]} mb-3 tracking-tight`}>{title}</h3>
        
        <p className="text-slate-300 text-sm leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity">
          {desc}
        </p>
      </div>
    </div>
  );
};

const FormulaBox = ({ title, formula, delay }: any) => (
  <div className={`glass-panel p-8 rounded-2xl flex flex-col items-center opacity-0 animate-scale ${delay} hover:bg-slate-800/50 transition-colors`}>
     <span className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-semibold">{title}</span>
     <code className="text-2xl text-indigo-200 font-mono font-bold bg-indigo-950/40 px-6 py-3 rounded-lg border border-indigo-500/20 shadow-inner">{formula}</code>
  </div>
);

const ComplexityBadge = ({ value, type }: { value: string, type: 'good' | 'bad' | 'ok' }) => {
    const colors = {
        good: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
        bad: "text-rose-400 bg-rose-950/40 border-rose-500/30",
        ok: "text-amber-400 bg-amber-950/40 border-amber-500/30",
    };
    
    return (
        <div className={`flex items-center justify-center px-4 py-2 rounded-lg border ${colors[type]} font-mono font-bold shadow-sm min-w-[90px] transition-transform hover:scale-105`}>
            {value}
        </div>
    );
}

const ImplementationCard = ({ name, insert, del, find, isWinner, delay }: any) => {
    return (
        <div className={`relative p-6 rounded-2xl border transition-all duration-500 group flex flex-col h-full animate-enter ${delay} ${
            isWinner 
            ? 'bg-indigo-950/30 border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.15)] hover:shadow-[0_0_60px_rgba(79,70,229,0.3)] hover:border-indigo-400 z-10 scale-105' 
            : 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-800/40 opacity-80 hover:opacity-100'
        }`}>
            {isWinner && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-lg animate-bounce z-20">
                    <Trophy size={20} fill="currentColor" />
                </div>
            )}
            
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${isWinner ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800/50 text-slate-500'}`}>
                    {isWinner ? <Zap size={24} /> : <Layers size={24} />}
                </div>
                <h3 className={`text-xl font-bold ${isWinner ? 'text-white' : 'text-slate-400'}`}>{name}</h3>
            </div>
            
            <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30">
                    <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Insert</span>
                    <ComplexityBadge value={insert.val} type={insert.type} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30">
                    <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Delete Min</span>
                    <ComplexityBadge value={del.val} type={del.type} />
                </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30">
                    <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Find Min</span>
                    <ComplexityBadge value={find.val} type={find.type} />
                </div>
            </div>
            
            {isWinner && (
                <div className="mt-6 pt-4 border-t border-indigo-500/20 text-center">
                    <span className="text-sm text-indigo-300 font-medium flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} /> Best Balanced Choice
                    </span>
                </div>
            )}
        </div>
    )
}

export const SLIDES: Slide[] = [
  {
    title: "Priority Queues",
    subtitle: "Section 9.1 - ADT & Implementation",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-16 animate-enter">
        <div className="relative group">
           <div className="absolute -inset-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
           <div className="p-16 bg-gradient-to-br from-slate-900 to-slate-950 rounded-full ring-1 ring-slate-700 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             <Layers size={120} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
           </div>
        </div>
        <div className="text-center space-y-8 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-slate-500 tracking-tight">
            Priority Data Structures
          </h2>
          <p className="text-2xl text-slate-400 leading-relaxed font-light">
            Standard queues treat everyone equally. <br/>
            <span className="text-indigo-400 font-semibold relative inline-block">
              Priority Queues
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500/50"></span>
            </span> know what matters most.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "What is a Priority Queue?",
    content: (
      <div className="space-y-12 animate-enter h-full flex flex-col justify-center">
        <div className="glass-panel p-10 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none"></div>
          <h3 className="text-2xl font-semibold text-indigo-300 mb-6 flex items-center gap-3">
            <Database className="w-6 h-6 text-indigo-400" /> Formal Definition
          </h3>
          <p className="text-3xl text-slate-200 font-light leading-relaxed">
            A collection where each element has a <span className="font-semibold text-white bg-indigo-600/80 px-4 py-1 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] backdrop-blur-sm border border-indigo-400/30">priority</span>.
            <br/><span className="text-slate-400 text-2xl mt-4 block">Elements are served based on priority, not insertion order.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-panel p-10 rounded-2xl hover:bg-slate-800/40 transition-all duration-300 group border-l-4 border-l-emerald-500/50">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-emerald-400 text-2xl">Regular Queue (FIFO)</span>
              <span className="text-xs px-3 py-1 bg-emerald-950/50 text-emerald-400 rounded-full border border-emerald-800/50 uppercase tracking-widest">Fair</span>
            </div>
            <div className="flex gap-4 items-center justify-center h-28 bg-slate-950/30 rounded-xl border border-slate-800/50">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-14 h-14 bg-emerald-900/20 border border-emerald-700/30 rounded-lg flex items-center justify-center text-lg text-emerald-400 font-mono shadow-sm">
                   Q{i}
                 </div>
               ))}
               <ArrowRightIcon />
            </div>
            <p className="text-slate-500 text-base mt-6 text-center font-mono">First In, First Out.</p>
          </div>

          <div className="glass-panel p-10 rounded-2xl hover:bg-slate-800/40 transition-all duration-300 group border-l-4 border-l-indigo-500/50">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-indigo-400 text-2xl">Priority Queue</span>
              <span className="text-xs px-3 py-1 bg-indigo-950/50 text-indigo-400 rounded-full border border-indigo-800/50 uppercase tracking-widest">Urgent</span>
            </div>
            <div className="flex gap-4 items-center justify-center h-28 bg-slate-950/30 rounded-xl border border-slate-800/50">
               <div className="w-14 h-14 bg-gradient-to-br from-rose-600 to-rose-700 border border-rose-400 rounded-lg flex items-center justify-center text-lg text-white font-bold shadow-lg shadow-rose-900/50 animate-bounce">!</div>
               <div className="w-14 h-14 bg-indigo-900/20 border border-indigo-700/30 rounded-lg flex items-center justify-center text-lg text-indigo-400 font-mono">P2</div>
               <div className="w-14 h-14 bg-indigo-900/20 border border-indigo-700/30 rounded-lg flex items-center justify-center text-lg text-indigo-400 font-mono">P3</div>
            </div>
             <p className="text-slate-500 text-base mt-6 text-center font-mono">Highest Priority Out First.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Real-World Examples",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full content-center animate-enter max-w-6xl mx-auto p-4">
        <ExampleCard 
          icon={<Activity className="text-rose-300 w-6 h-6" />}
          title="Hospital ER"
          color="rose"
          image="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800"
          desc="Critical patients (heart attack) treated before minor injuries (stubbed toe), regardless of arrival time."
          delay="delay-100"
        />
        <ExampleCard 
          icon={<Cpu className="text-blue-300 w-6 h-6" />}
          title="OS Scheduling"
          color="blue"
          image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
          desc="Kernel tasks & interrupts prioritized over user background processes to keep system stable."
          delay="delay-200"
        />
        <ExampleCard 
          icon={<Plane className="text-emerald-300 w-6 h-6" />}
          title="Airport Boarding"
          color="emerald"
          image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
          desc="First class & loyalty members board before economy class based on ticket priority."
          delay="delay-300"
        />
        <ExampleCard 
          icon={<Server className="text-amber-300 w-6 h-6" />}
          title="Network Traffic"
          color="amber"
          image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
          desc="Voice (VoIP) packets prioritized over email downloads to prevent lag during calls."
          delay="delay-500"
        />
      </div>
    )
  },
  {
    title: "Intro to Priority Queue Types",
    subtitle: "Single & Double Ended",
    content: (
       <div className="flex flex-col h-full animate-enter justify-center max-w-5xl mx-auto space-y-10">
         <div className="glass-panel p-10 rounded-2xl shadow-xl border-l-4 border-l-cyan-500">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-950/50 rounded-lg text-cyan-400 border border-cyan-500/20">
                    <ArrowRight size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white">Single Ended Priority Queues</h3>
            </div>
            <p className="text-xl text-slate-300 leading-relaxed font-light">
                Allow elements to be <span className="text-cyan-300 font-medium">inserted at one end</span> and <span className="text-cyan-300 font-medium">removed from the other end</span> based on their priority.
            </p>
         </div>

         <div className="glass-panel p-10 rounded-2xl shadow-xl border-l-4 border-l-purple-500">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-950/50 rounded-lg text-purple-400 border border-purple-500/20">
                    <ArrowLeftRight size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white">Double Ended Priority Queues</h3>
            </div>
            <p className="text-xl text-slate-300 leading-relaxed font-light">
                Allow elements to be <span className="text-purple-300 font-medium">inserted and removed from both ends</span> based on their priority.
            </p>
         </div>
       </div>
    )
  },
  {
    title: "Types of Priority Queues",
    subtitle: "Visual Comparison",
    content: (
      <div className="flex flex-col h-full animate-enter justify-center max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-4">
             <p className="text-2xl text-slate-300 font-light">
               Data structures used to store elements with assigned <span className="text-indigo-400 font-semibold">priorities</span>.
             </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Ended */}
            <div className="glass-panel p-10 rounded-3xl flex flex-col relative overflow-hidden group hover:bg-slate-800/40 transition-all border-t-4 border-t-cyan-500 h-full">
                 <div className="absolute top-0 right-0 p-24 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-all"></div>
                 
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
                        <ArrowRight size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Single-Ended</h3>
                 </div>
                 
                 <p className="text-lg text-slate-300 leading-relaxed font-light flex-1">
                    Elements processed in one direction based on priority order.
                 </p>
                 
                 <div className="mt-8 pt-6 border-t border-white/5 flex justify-center opacity-60">
                    <div className="flex items-center gap-2 text-sm font-mono text-cyan-400">
                        <span>Insert</span> <ArrowRight size={14} /> <span>[ PQ ]</span> <ArrowRight size={14} /> <span>Remove Min/Max</span>
                    </div>
                 </div>
            </div>

            {/* Double Ended */}
             <div className="glass-panel p-10 rounded-3xl flex flex-col relative overflow-hidden group hover:bg-slate-800/40 transition-all border-t-4 border-t-purple-500 h-full">
                 <div className="absolute top-0 right-0 p-24 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-all"></div>
                 
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-400">
                        <ArrowLeftRight size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Double-Ended</h3>
                 </div>

                 <p className="text-lg text-slate-300 leading-relaxed font-light flex-1">
                    Flexible access to both minimum and maximum priority elements.
                 </p>

                 <div className="mt-8 pt-6 border-t border-white/5 flex justify-center opacity-60">
                    <div className="flex items-center gap-2 text-sm font-mono text-purple-400">
                        <span>Remove Min</span> <ArrowLeftRight size={14} /> <span>[ DEPQ ]</span> <ArrowLeftRight size={14} /> <span>Remove Max</span>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    )
  },
  {
      title: "Structure & Operations",
      subtitle: "Single Ended Priority Queues",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-5xl mx-auto space-y-8">
             <div className="glass-panel p-8 rounded-2xl relative">
                  <div className="flex items-center gap-4 mb-6">
                       <div className="p-3 bg-indigo-950/50 rounded-lg text-indigo-400 border border-indigo-500/20">
                           <List size={30} />
                       </div>
                       <h3 className="text-2xl font-bold text-indigo-100">Implementation</h3>
                  </div>
                  <p className="text-xl text-slate-300 font-light">
                      Typically implemented using a <span className="text-indigo-300 font-semibold">Heap</span> (Binary Heap) or an Array.
                  </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass-panel p-8 rounded-2xl border-t-2 border-t-emerald-500/50">
                     <h4 className="text-lg font-bold text-emerald-400 mb-3 uppercase tracking-wider">Insertion</h4>
                     <p className="text-slate-300 leading-relaxed">
                         Involves placing the new element in the appropriate position to maintain the <span className="text-emerald-300">priority order</span>.
                     </p>
                 </div>
                 <div className="glass-panel p-8 rounded-2xl border-t-2 border-t-rose-500/50">
                     <h4 className="text-lg font-bold text-rose-400 mb-3 uppercase tracking-wider">Deletion</h4>
                     <p className="text-slate-300 leading-relaxed">
                         Removes the element with the <span className="text-rose-300">highest (or lowest) priority</span> from the specific end.
                     </p>
                 </div>
             </div>
          </div>
      )
  },
  {
      title: "Structure & Operations",
      subtitle: "Double Ended Priority Queues",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-5xl mx-auto space-y-8">
             <div className="glass-panel p-8 rounded-2xl relative">
                  <div className="flex items-center gap-4 mb-6">
                       <div className="p-3 bg-purple-950/50 rounded-lg text-purple-400 border border-purple-500/20">
                           <GitMerge size={30} />
                       </div>
                       <h3 className="text-2xl font-bold text-purple-100">Implementation</h3>
                  </div>
                  <p className="text-xl text-slate-300 font-light">
                      Typically implemented using a <span className="text-purple-300 font-semibold">Doubly-Linked List</span> or a Balanced Binary Search Tree (BST).
                  </p>
             </div>

             <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-purple-500">
                 <h4 className="text-lg font-bold text-purple-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                     <ArrowLeftRight size={20} />
                     Dual-End Operations
                 </h4>
                 <p className="text-slate-300 leading-relaxed text-lg">
                     Insertion and deletion of elements are supported from <span className="text-white font-medium">both ends</span> based on their priority.
                     <br/><br/>
                     <span className="text-slate-400 text-sm">Similar to single-ended, insertion requires placing the new element in the correct position to maintain order.</span>
                 </p>
             </div>
          </div>
      )
  },
  {
      title: "Use Cases",
      subtitle: "Where to use what?",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-10 rounded-3xl flex flex-col justify-between group hover:bg-slate-800/40 transition-all">
                   <div>
                       <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-8 border border-cyan-500/20 shadow-lg group-hover:scale-110 transition-transform">
                           <Calendar size={32} />
                       </div>
                       <h3 className="text-3xl font-bold text-white mb-4">Single Ended</h3>
                       <p className="text-lg text-slate-400 leading-relaxed">
                           Commonly used in <span className="text-cyan-300 font-medium">scheduling algorithms</span> where tasks are processed based strictly on their priority.
                       </p>
                   </div>
                   <div className="mt-8 p-4 bg-slate-950/30 rounded-xl border border-white/5">
                       <code className="text-sm text-cyan-200/70 font-mono">Process Scheduler, Printer Queue, Dijkstra's Algorithm</code>
                   </div>
              </div>

              <div className="glass-panel p-10 rounded-3xl flex flex-col justify-between group hover:bg-slate-800/40 transition-all">
                   <div>
                       <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20 shadow-lg group-hover:scale-110 transition-transform">
                           <TrendingUp size={32} />
                       </div>
                       <h3 className="text-3xl font-bold text-white mb-4">Double Ended</h3>
                       <p className="text-lg text-slate-400 leading-relaxed">
                           Used in scenarios such as managing <span className="text-purple-300 font-medium">event-driven systems</span> or maintaining a <span className="text-purple-300 font-medium">sliding window</span> of data.
                       </p>
                   </div>
                   <div className="mt-8 p-4 bg-slate-950/30 rounded-xl border border-white/5">
                       <code className="text-sm text-purple-200/70 font-mono">Interval Trees, Rectangular Range Search, External Sorting</code>
                   </div>
              </div>
          </div>
      )
  },
  {
      title: "Time Complexity: Single Ended",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div className="glass-panel p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
                     <div className="p-4 bg-amber-500/10 rounded-full text-amber-400 ring-1 ring-amber-500/30">
                         <Clock size={40} />
                     </div>
                     <div>
                         <h3 className="text-xl font-bold text-slate-200 mb-2">Insertion & Deletion</h3>
                         <p className="text-slate-400 text-sm">Logarithmic Time</p>
                     </div>
                     <code className="text-4xl font-bold text-amber-400 font-mono">O(log n)</code>
                     <p className="text-xs text-slate-500">where n is number of elements</p>
                 </div>

                 <div className="glass-panel p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
                     <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400 ring-1 ring-emerald-500/30">
                         <Search size={40} />
                     </div>
                     <div>
                         <h3 className="text-xl font-bold text-slate-200 mb-2">Find Highest Priority</h3>
                         <p className="text-slate-400 text-sm">Constant Time</p>
                     </div>
                     <code className="text-4xl font-bold text-emerald-400 font-mono">O(1)</code>
                     <p className="text-xs text-slate-500">Access directly from top of heap</p>
                 </div>
             </div>
          </div>
      )
  },
  {
      title: "Time Complexity: Double Ended",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-5xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div className="glass-panel p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
                     <div className="p-4 bg-amber-500/10 rounded-full text-amber-400 ring-1 ring-amber-500/30">
                         <Clock size={40} />
                     </div>
                     <div>
                         <h3 className="text-xl font-bold text-slate-200 mb-2">Insertion & Deletion</h3>
                         <p className="text-slate-400 text-sm">From either end</p>
                     </div>
                     <code className="text-4xl font-bold text-amber-400 font-mono">O(log n)</code>
                 </div>

                 <div className="glass-panel p-10 rounded-3xl flex flex-col items-center text-center space-y-6">
                     <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400 ring-1 ring-emerald-500/30">
                         <Search size={40} />
                     </div>
                     <div>
                         <h3 className="text-xl font-bold text-slate-200 mb-2">Find Min & Max</h3>
                         <p className="text-slate-400 text-sm">Both ends accessible</p>
                     </div>
                     <code className="text-4xl font-bold text-emerald-400 font-mono">O(1)</code>
                 </div>
             </div>
             <p className="text-center mt-12 text-slate-400 italic">
                * Note: Complexities assume optimal implementation (e.g., Interval Heap)
             </p>
          </div>
      )
  },
  {
      title: "Implementation Considerations",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-4xl mx-auto space-y-10">
              <p className="text-2xl text-center text-slate-300 font-light">
                  The choice between single and double ended priority queues depends on the <span className="text-indigo-400 font-medium">specific requirements</span> of the application.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                  <div className="glass-panel p-6 rounded-xl flex items-start gap-4">
                      <div className="p-2 bg-indigo-500/20 rounded text-indigo-300"><GitCommit size={24}/></div>
                      <div>
                          <h4 className="text-lg font-bold text-white mb-1">Expected Operations</h4>
                          <p className="text-slate-400">Do you need to remove only the max? Or both min and max?</p>
                      </div>
                  </div>
                   <div className="glass-panel p-6 rounded-xl flex items-start gap-4">
                      <div className="p-2 bg-blue-500/20 rounded text-blue-300"><Database size={24}/></div>
                      <div>
                          <h4 className="text-lg font-bold text-white mb-1">Data Access Patterns</h4>
                          <p className="text-slate-400">How frequently is data inserted versus queried?</p>
                      </div>
                  </div>
                   <div className="glass-panel p-6 rounded-xl flex items-start gap-4">
                      <div className="p-2 bg-rose-500/20 rounded text-rose-300"><Cpu size={24}/></div>
                      <div>
                          <h4 className="text-lg font-bold text-white mb-1">Space Complexity</h4>
                          <p className="text-slate-400">Memory overhead of pointers (BST/List) vs array indices (Heap).</p>
                      </div>
                  </div>
              </div>
              
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center text-yellow-200 text-sm">
                  ⚠️ It is important to ensure that the implementation maintains the priority order correctly to avoid incorrect results.
              </div>
          </div>
      )
  },
  {
      title: "Comparison Summary",
      content: (
          <div className="h-full flex flex-col justify-center animate-enter max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
                 <div className="glass-panel p-8 rounded-3xl flex flex-col border-t-8 border-t-cyan-500/80 bg-gradient-to-b from-slate-900/80 to-slate-900/40">
                     <h3 className="text-3xl font-bold text-white mb-8 text-center">Single Ended</h3>
                     <ul className="space-y-6 flex-1">
                         <li className="flex items-start gap-3">
                             <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" />
                             <span className="text-slate-300 text-lg">Simpler to implement</span>
                         </li>
                         <li className="flex items-start gap-3">
                             <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" />
                             <span className="text-slate-300 text-lg">More efficient for sequential processing</span>
                         </li>
                         <li className="flex items-start gap-3">
                             <CheckCircle2 className="text-cyan-500 shrink-0 mt-1" />
                             <span className="text-slate-300 text-lg">Lower memory overhead (Binary Heap)</span>
                         </li>
                     </ul>
                 </div>

                 <div className="glass-panel p-8 rounded-3xl flex flex-col border-t-8 border-t-purple-500/80 bg-gradient-to-b from-slate-900/80 to-slate-900/40">
                     <h3 className="text-3xl font-bold text-white mb-8 text-center">Double Ended</h3>
                     <ul className="space-y-6 flex-1">
                         <li className="flex items-start gap-3">
                             <CheckCircle2 className="text-purple-500 shrink-0 mt-1" />
                             <span className="text-slate-300 text-lg">Provides more flexibility</span>
                         </li>
                         <li className="flex items-start gap-3">
                             <CheckCircle2 className="text-purple-500 shrink-0 mt-1" />
                             <span className="text-slate-300 text-lg">Efficient access to both ends</span>
                         </li>
                         <li className="flex items-start gap-3">
                             <CheckCircle2 className="text-purple-500 shrink-0 mt-1" />
                             <span className="text-slate-300 text-lg">Can handle complex range queries</span>
                         </li>
                     </ul>
                 </div>
             </div>
             <p className="text-center mt-10 text-xl text-slate-300">
                 The choice depends on the specific use case and operations required.
             </p>
          </div>
      )
  },
  {
    title: "Min-Heap vs Max-Heap",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full animate-enter">
        <div className="glass-panel p-8 rounded-3xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
             <h4 className="text-3xl font-bold text-indigo-300">Min-Heap</h4>
             <span className="text-xs bg-indigo-950/50 border border-indigo-500/20 px-3 py-1.5 rounded-full text-indigo-200 font-mono">Parent ≤ Child</span>
          </div>
          <div className="flex-1 relative min-h-[400px]">
            <HeapTree 
              data={[
                { id: 1, val: 2, color: 'accent' },
                { id: 2, val: 8, color: 'default' },
                { id: 3, val: 5, color: 'default' },
                { id: 4, val: 12, color: 'default' },
                { id: 5, val: 14, color: 'default' },
                { id: 6, val: 18, color: 'default' },
                { id: 7, val: 9, color: 'default' },
              ]}
            />
          </div>
          <p className="text-center text-sm text-indigo-300/60 mt-6 font-mono uppercase tracking-widest">Smallest element at Root</p>
        </div>

        <div className="glass-panel p-8 rounded-3xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/5 blur-3xl rounded-full"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
             <h4 className="text-3xl font-bold text-rose-300">Max-Heap</h4>
             <span className="text-xs bg-rose-950/50 border border-rose-500/20 px-3 py-1.5 rounded-full text-rose-200 font-mono">Parent ≥ Child</span>
          </div>
          <div className="flex-1 relative min-h-[400px]">
            <HeapTree 
               data={[
                { id: 1, val: 95, color: 'danger' },
                { id: 2, val: 42, color: 'default' },
                { id: 3, val: 80, color: 'default' },
                { id: 4, val: 12, color: 'default' },
                { id: 5, val: 24, color: 'default' },
                { id: 6, val: 55, color: 'default' },
                { id: 7, val: 68, color: 'default' },
              ]}
            />
          </div>
          <p className="text-center text-sm text-rose-300/60 mt-6 font-mono uppercase tracking-widest">Largest element at Root</p>
        </div>
      </div>
    )
  },
  {
    title: "Array Representation",
    subtitle: "How to store a tree without pointers",
    content: (
      <div className="space-y-12 animate-enter h-full flex flex-col">
        <div className="glass-panel p-10 rounded-3xl flex flex-col items-center gap-10 flex-1 justify-center">
           <div className="w-full max-w-2xl h-64">
             <HeapTree 
               data={[
                { id: 1, val: 13, color: 'accent' },
                { id: 2, val: 21, color: 'default' },
                { id: 3, val: 16, color: 'default' },
                { id: 4, val: 24, color: 'ghost' },
                { id: 5, val: 31, color: 'ghost' },
                { id: 6, val: 19, color: 'ghost' },
                { id: 7, val: 68, color: 'ghost' },
               ]}
               showIndices
             />
           </div>
           
           <ArrowDown className="text-slate-500 animate-bounce w-8 h-8 opacity-50" />

           <div className="w-full bg-slate-950/40 p-8 rounded-2xl border border-slate-800/50 relative overflow-hidden">
             <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
             <ArrayVisualizer 
               data={[13, 21, 16, 24, 31, 19, 68]} 
               highlightIndices={[0]}
             />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <FormulaBox title="Left Child" formula="2i + 1" delay="delay-100" />
             <FormulaBox title="Right Child" formula="2i + 2" delay="delay-200" />
             <FormulaBox title="Parent" formula="floor((i-1)/2)" delay="delay-300" />
        </div>
      </div>
    )
  },
  {
    title: "Insert Operation",
    subtitle: "Percolate Up Strategy",
    content: (
      <div className="h-full animate-enter">
        <InteractiveStep 
          title="Insert '12'" 
          description="Strategy: Place at end, then bubble up until heap property is restored."
          steps={INSERT_STEPS_REVISED} 
        />
      </div>
    )
  },
  {
    title: "DeleteMin Operation",
    subtitle: "Percolate Down Strategy",
    content: (
      <div className="h-full animate-enter">
         <InteractiveStep 
          title="Delete Min (10)" 
          description="Strategy: Remove root, replace with last element, then bubble down."
          steps={DELETE_STEPS} 
        />
      </div>
    )
  },
  {
    title: "Implementation Efficiency",
    content: (
        <div className="h-full flex flex-col animate-enter gap-8 justify-center max-w-7xl mx-auto w-full">
            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end flex-1 md:max-h-[500px]">
                <ImplementationCard 
                    name="Unsorted Array"
                    delay="delay-100"
                    insert={{ val: 'O(1)', type: 'good' }}
                    del={{ val: 'O(n)', type: 'bad' }}
                    find={{ val: 'O(n)', type: 'bad' }}
                />
                <ImplementationCard 
                    name="Binary Heap"
                    isWinner
                    delay="delay-300"
                    insert={{ val: 'O(log n)', type: 'ok' }}
                    del={{ val: 'O(log n)', type: 'ok' }}
                    find={{ val: 'O(1)', type: 'good' }}
                />
                 <ImplementationCard 
                    name="Sorted Array"
                    delay="delay-200"
                    insert={{ val: 'O(n)', type: 'bad' }}
                    del={{ val: 'O(1)', type: 'good' }}
                    find={{ val: 'O(1)', type: 'good' }}
                />
            </div>

            {/* Conclusion Banner */}
            <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-950/30 to-transparent flex items-start gap-6 relative overflow-hidden group hover:bg-slate-800/30 transition-all">
                 <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                 
                 <div className="hidden md:flex p-4 bg-indigo-500/20 rounded-2xl text-indigo-300 shrink-0 border border-indigo-500/20 shadow-lg">
                    <Trophy size={40} />
                 </div>
                 
                 <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                       <span className="md:hidden"><Trophy size={24} className="text-indigo-400" /></span>
                       Why Binary Heap Wins
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-4xl font-light">
                        While arrays excel at specific operations, they fail at being balanced. 
                        <span className="text-indigo-300 font-semibold mx-1">Binary Heaps</span> 
                        guarantee <code className="font-mono bg-indigo-950/50 px-2 py-0.5 rounded text-indigo-200 border border-indigo-500/20">O(log n)</code> performance for both insertion and deletion, making them the standard choice for Priority Queues in operating systems, pathfinding algorithms, and network routing.
                    </p>
                 </div>
            </div>
        </div>
    )
  },
  {
      title: "Conclusion",
      content: (
          <div className="h-full flex flex-col justify-center items-center animate-enter text-center max-w-5xl mx-auto space-y-16">
              <div className="relative">
                  <div className="absolute -inset-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <CheckCircle2 size={100} className="text-emerald-400 relative z-10" />
              </div>
              
              <div className="space-y-8">
                  <h2 className="text-5xl font-bold text-white tracking-tight">
                      Mastering Priority Data Structures
                  </h2>
                  <p className="text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
                      Single and double ended priority queues are essential tools for managing elements based on priority.
                      <br/><br/>
                      Understanding their <span className="text-indigo-400 font-medium">structure</span>, <span className="text-indigo-400 font-medium">operations</span>, and <span className="text-indigo-400 font-medium">trade-offs</span> is key to selecting the right implementation for your application.
                  </p>
              </div>

              <div className="flex gap-4">
                  <div className="px-6 py-3 rounded-full bg-slate-800/50 border border-white/10 text-slate-400 text-sm font-mono">
                      Priority Queues
                  </div>
                   <div className="px-6 py-3 rounded-full bg-slate-800/50 border border-white/10 text-slate-400 text-sm font-mono">
                      Heaps
                  </div>
                   <div className="px-6 py-3 rounded-full bg-slate-800/50 border border-white/10 text-slate-400 text-sm font-mono">
                      Complexity
                  </div>
              </div>
          </div>
      )
  }
];