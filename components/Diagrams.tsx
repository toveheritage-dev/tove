
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Cpu, BarChart2 } from 'lucide-react';

// --- SURFACE CODE DIAGRAM ---
export const SurfaceCodeDiagram: React.FC = () => {
  const [errors, setErrors] = useState<number[]>([]);
  
  const adjacency: Record<number, number[]> = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 3],
    4: [0, 1, 2, 3],
  };

  const toggleError = (id: number) => {
    setErrors(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const activeStabilizers = [0, 1, 2, 3].filter(stabId => {
    let errorCount = 0;
    Object.entries(adjacency).forEach(([dataId, stabs]) => {
        if (errors.includes(parseInt(dataId)) && stabs.includes(stabId)) {
            errorCount++;
        }
    });
    return errorCount % 2 !== 0;
  });

  return (
    <div className="flex flex-col items-center p-10 bg-stone-900/50 rounded-2xl shadow-2xl border border-stone-800 my-8">
      <h3 className="font-serif text-2xl mb-4 text-white">Surface Code Detection</h3>
      <p className="text-sm text-stone-500 mb-10 text-center max-w-md font-light">
        Inject errors into <strong>Data Qubits</strong> and observe parity violations.
      </p>
      
      <div className="relative w-72 h-72 bg-black/40 rounded-xl border border-stone-800 p-6 flex flex-wrap justify-between content-between">
         {/* Grid Lines */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-2/3 h-2/3 border border-stone-500"></div>
            <div className="absolute w-full h-[1px] bg-stone-500"></div>
            <div className="absolute h-full w-[1px] bg-stone-500"></div>
         </div>

         {/* Stabilizers */}
         {[
             {id: 0, x: '50%', y: '20%', type: 'Z', color: 'bg-blue-600'},
             {id: 1, x: '20%', y: '50%', type: 'X', color: 'bg-red-600'},
             {id: 2, x: '80%', y: '50%', type: 'X', color: 'bg-red-600'},
             {id: 3, x: '50%', y: '80%', type: 'Z', color: 'bg-blue-600'},
         ].map(stab => (
             <motion.div
                key={`stab-${stab.id}`}
                className={`absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center text-white text-sm font-bold rounded-md shadow-xl transition-all duration-300 ${activeStabilizers.includes(stab.id) ? stab.color + ' opacity-100 scale-110 ring-4 ring-nobel-gold/20' : 'bg-stone-800 opacity-20'}`}
                style={{ left: stab.x, top: stab.y }}
             >
                 {stab.type}
             </motion.div>
         ))}

         {/* Data Qubits */}
         {[
             {id: 0, x: '20%', y: '20%'}, {id: 1, x: '80%', y: '20%'},
             {id: 4, x: '50%', y: '50%'},
             {id: 2, x: '20%', y: '80%'}, {id: 3, x: '80%', y: '80%'},
         ].map(q => (
             <button
                key={`data-${q.id}`}
                onClick={() => toggleError(q.id)}
                className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 ${errors.includes(q.id) ? 'bg-nobel-gold border-white text-stone-950 scale-110 shadow-[0_0_20px_rgba(197,160,89,0.4)]' : 'bg-stone-950 border-stone-700 hover:border-nobel-gold text-stone-600'}`}
                style={{ left: q.x, top: q.y }}
             >
                <Activity size={16} className={errors.includes(q.id) ? 'opacity-100' : 'opacity-20'} />
             </button>
         ))}
      </div>

      <div className="mt-10 flex items-center gap-6 text-[10px] font-bold tracking-widest text-stone-500 uppercase">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-nobel-gold"></div> Error</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-blue-600"></div> Z-Check</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-red-600"></div> X-Check</div>
      </div>
    </div>
  );
};

// --- TRANSFORMER DECODER DIAGRAM ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-10 bg-stone-900/30 rounded-2xl border border-stone-800 my-8">
      <h3 className="font-serif text-2xl mb-4 text-white">Tove Neural Engine</h3>
      <p className="text-sm text-stone-500 mb-10 text-center max-w-md font-light">
        Sequence prediction using a recurrent transformer architecture.
      </p>

      <div className="relative w-full max-w-lg h-64 bg-black/60 rounded-xl shadow-2xl overflow-hidden mb-8 border border-stone-800 flex items-center justify-center gap-10 p-6">
        
        {/* Input Stage */}
        <div className="flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${step === 0 ? 'border-nobel-gold bg-nobel-gold/10 scale-110' : 'border-stone-800 bg-stone-900/40'}`}>
                <div className="grid grid-cols-3 gap-1.5">
                    {[...Array(9)].map((_, i) => <div key={i} className={`w-2.5 h-2.5 rounded-full ${Math.random() > 0.6 ? 'bg-nobel-gold' : 'bg-stone-700'}`}></div>)}
                </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-600">Syndrome</span>
        </div>

        {/* Arrows */}
        <div className={`transition-opacity duration-500 ${step >= 1 ? 'opacity-100 text-nobel-gold' : 'opacity-20 text-stone-800'}`}>
            <Activity size={20} className="animate-pulse" />
        </div>

        {/* Transformer Stage */}
        <div className="flex flex-col items-center gap-4">
             <div className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden ${step === 1 || step === 2 ? 'border-nobel-gold bg-nobel-gold/5 scale-110' : 'border-stone-800 bg-stone-900/40'}`}>
                <Cpu size={32} className={step === 1 || step === 2 ? 'text-nobel-gold animate-pulse' : 'text-stone-700'} />
                {step === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-[1px] bg-nobel-gold/30 absolute top-1/3 animate-ping"></div>
                        <div className="w-full h-[1px] bg-nobel-gold/30 absolute top-2/3 animate-ping delay-150"></div>
                    </div>
                )}
             </div>
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-600">Transformer</span>
        </div>

        {/* Arrows */}
        <div className={`transition-opacity duration-500 ${step >= 3 ? 'opacity-100 text-nobel-gold' : 'opacity-20 text-stone-800'}`}>
            <Activity size={20} className="animate-pulse" />
        </div>

        {/* Output Stage */}
        <div className="flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${step === 3 ? 'border-white bg-white/5 scale-110' : 'border-stone-800 bg-stone-900/40'}`}>
                {step === 3 ? (
                    <span className="text-4xl font-serif text-white">X</span>
                ) : (
                    <span className="text-4xl font-serif text-stone-800">?</span>
                )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-600">Correction</span>
        </div>

      </div>

      <div className="flex gap-4">
          {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-10 bg-nobel-gold' : 'w-3 bg-stone-800'}`}></div>
          ))}
      </div>
    </div>
  );
};

// --- PERFORMANCE CHART ---
export const PerformanceMetricDiagram: React.FC = () => {
    const [distance, setDistance] = useState<3 | 5 | 11>(5);
    
    const data = {
        3: { mwpm: 3.5, alpha: 2.9 },
        5: { mwpm: 3.6, alpha: 2.75 },
        11: { mwpm: 0.0041, alpha: 0.0009 } 
    };

    const currentData = data[distance];
    const maxVal = Math.max(currentData.mwpm, currentData.alpha) * 1.25;
    
    const formatValue = (val: number) => {
        if (val < 0.01) return val.toFixed(4) + '%';
        return val.toFixed(2) + '%';
    }

    return (
        <div className="flex flex-col md:flex-row gap-12 items-center p-12 bg-black text-stone-300 rounded-2xl my-8 border border-stone-800 shadow-2xl">
            <div className="flex-1 min-w-[280px]">
                <h3 className="font-serif text-3xl mb-4 text-white">Superior Precision</h3>
                <p className="text-stone-500 text-lg mb-8 leading-relaxed font-light">
                    Our methodologies consistently achieve lower logical error rates than standard decoders.
                </p>
                <div className="flex gap-3 mt-8">
                    {[3, 5, 11].map((d) => (
                        <button 
                            key={d}
                            onClick={() => setDistance(d as any)} 
                            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 border uppercase ${distance === d ? 'bg-nobel-gold text-stone-950 border-nobel-gold' : 'bg-transparent text-stone-500 border-stone-800 hover:border-stone-600 hover:text-white'}`}
                        >
                            D-{d}
                        </button>
                    ))}
                </div>
                <div className="mt-10 font-bold text-[10px] text-stone-700 flex items-center gap-3 tracking-[0.3em]">
                    <BarChart2 size={16} className="text-nobel-gold" /> 
                    <span>LOGICAL ERROR RATE (LOWER IS BETTER)</span>
                </div>
            </div>
            
            <div className="relative w-72 h-80 bg-stone-900/20 rounded-2xl border border-stone-800/50 p-8 flex justify-around items-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-5">
                   <div className="w-full h-[1px] bg-white"></div>
                   <div className="w-full h-[1px] bg-white"></div>
                   <div className="w-full h-[1px] bg-white"></div>
                   <div className="w-full h-[1px] bg-white"></div>
                </div>

                {/* Standard Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                    <div className="flex-1 w-full flex items-end justify-center relative mb-4">
                        <div className="absolute -top-8 w-full text-center text-xs font-bold text-stone-500 bg-stone-950/80 py-1 rounded border border-stone-800">{formatValue(currentData.mwpm)}</div>
                        <motion.div 
                            className="w-full bg-stone-800 rounded-t-lg"
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentData.mwpm / maxVal) * 100}%` }}
                            transition={{ type: "spring", stiffness: 60, damping: 20 }}
                        />
                    </div>
                    <div className="h-6 flex items-center text-[10px] font-bold text-stone-600 uppercase tracking-widest">Standard</div>
                </div>

                {/* Tove Bar */}
                <div className="w-20 flex flex-col justify-end items-center h-full z-10">
                     <div className="flex-1 w-full flex items-end justify-center relative mb-4">
                        <div className="absolute -top-8 w-full text-center text-xs font-bold text-nobel-gold bg-stone-950/80 py-1 rounded border border-nobel-gold/30">{formatValue(currentData.alpha)}</div>
                        <motion.div 
                            className="w-full bg-nobel-gold rounded-t-lg shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                            initial={{ height: 0 }}
                            animate={{ height: Math.max(2, (currentData.alpha / maxVal) * 100) + '%' }}
                            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.1 }}
                        />
                    </div>
                     <div className="h-6 flex items-center text-[10px] font-bold text-nobel-gold uppercase tracking-widest">Tove</div>
                </div>
            </div>
        </div>
    )
}
