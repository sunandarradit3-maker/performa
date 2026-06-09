import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Cpu, 
  Thermometer, 
  Smartphone, 
  Gauge, 
  Settings, 
  ShieldCheck,
  RefreshCw,
  Wind
} from 'lucide-react';

// Simulated Metrics Component
const MetricCard = ({ icon: Icon, label, value, unit, color, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between"
  >
    <div>
      <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">{label}</h2>
      <div className="flex justify-between items-end mb-2">
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <span className="text-4xl font-mono font-bold text-white tabular-nums">
          {value}<span className="text-lg text-blue-500 ml-1">{unit}</span>
        </span>
      </div>
    </div>
    <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${trend}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

export default function App() {
  const [isBoosting, setIsBoosting] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 120,
    temp: 32.4,
    touch: 240,
    ram: 4.2
  });

  // Simulated metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        fps: Math.max(90, Math.min(144, prev.fps + (Math.random() * 4 - 2))),
        temp: Math.max(30, Math.min(38, prev.temp + (Math.random() * 0.2 - 0.1))),
        touch: prev.touch,
        ram: Math.max(3.5, Math.min(6.2, prev.ram + (Math.random() * 0.2 - 0.1)))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBoost = () => {
    setIsBoosting(true);
    setTimeout(() => setIsBoosting(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col overflow-x-hidden">
      {/* Mesh Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AXERON <span className="text-blue-400">PRO</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Engine Active</span>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Device Temperature</p>
            <p className="text-xl font-mono text-blue-400">
              {metrics.temp.toFixed(1)}°C <span className="text-xs text-slate-500 italic">Steady</span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Control Dashboard */}
      <main className="relative flex-1 p-8 grid grid-cols-1 md:grid-cols-12 gap-6 z-10 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Real-time Stats */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <MetricCard 
            icon={Gauge} 
            label="Frame Rate" 
            value={Math.round(metrics.fps)} 
            unit="fps" 
            color="bg-blue-500"
            trend={((metrics.fps - 60) / 84) * 100}
          />
          <MetricCard 
            icon={Smartphone} 
            label="Touch Response" 
            value="1.2" 
            unit="ms" 
            color="bg-purple-500"
            trend={98}
          />
          <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center gap-2 backdrop-blur-sm">
             <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-400" />
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider">Dynamic Cooling</p>
             </div>
             <p className="text-xs text-blue-300/80 leading-relaxed">
              Thermal throttling disabled. Cooling active via Axeron Thermal Bridge.
             </p>
          </div>
        </div>

        {/* Right Column: Plugin Config & Module Info */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Top: Optimization Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-xs">CPU</div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Turbo Mode</p>
                <p className="text-sm font-bold text-white">Enabled</p>
              </div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">GPU</div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Clock Lock</p>
                <p className="text-sm font-bold text-white">High Profile</p>
              </div>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs">RAM</div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Compression</p>
                <p className="text-sm font-bold text-white">ZRAM Off</p>
              </div>
            </div>
          </div>

          {/* Module Configuration Editor */}
          <div className="flex-1 bg-black/40 border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6 z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-4 text-[10px] font-mono text-slate-500 tracking-widest uppercase">module.prop editor</span>
              </div>
              <button 
                onClick={() => window.location.href = '/api/download-module'}
                className="text-[10px] px-4 py-2 bg-blue-500 rounded-lg border border-blue-400/30 hover:bg-blue-600 uppercase tracking-widest font-bold transition-all text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <RefreshCw className="w-3 h-3" />
                Download Module
              </button>
              <button 
                onClick={handleBoost}
                className="text-[10px] px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 uppercase tracking-widest font-bold transition-all text-white flex items-center gap-2"
              >
                {isBoosting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                {isBoosting ? 'Optimizing...' : 'Sync Config'}
              </button>
            </div>
            
            <div className="flex-1 font-mono text-sm leading-relaxed overflow-auto z-10 custom-scrollbar">
              <div className="flex gap-4">
                <div className="text-slate-700 text-right select-none pr-4 border-r border-white/5 space-y-1">
                  {['01','02','03','04','05','06','07','08','09','10','11'].map(n => <div key={n}>{n}</div>)}
                </div>
                <div className="text-blue-300 space-y-1">
                  <span className="text-slate-500 italic block"># Axeron Performance Module Configuration</span>
                  <div>id=axeron_perf_pro</div>
                  <div>name=Axeron Pro Performance Hub</div>
                  <div>version=v14.6.0-stable</div>
                  <div>versionCode=14600</div>
                  <div>author=Axeron Dev Team</div>
                  <div className="text-slate-400">description=Extreme FPS & Touch optimization module.</div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500/20 text-blue-400 px-1 rounded font-bold border border-blue-500/30">axeronPlugin=14600</span>
                    <span className="text-[9px] text-green-500 font-bold bg-green-500/10 px-1 rounded">ACTIVE</span>
                  </div>
                  <div>thermalEngine=disabled</div>
                  <div>touchSampling=max</div>
                  <div>vsyncBypass=true</div>
                </div>
              </div>
            </div>

            {/* Decorative Overlay */}
            <div className="absolute bottom-4 right-8 pointer-events-none select-none">
              <p className="text-[40px] font-black text-white/5 tracking-tighter">CONFIG_READY</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="relative px-8 py-4 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 z-10 gap-4">
        <div className="flex gap-8 group">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>ROOT: <span className="text-green-400 uppercase font-bold">Authorized</span></span>
          </div>
          <div className="flex items-center gap-2">
             <Cpu className="w-3 h-3" />
             <span>KERNEL: <span className="text-blue-400 uppercase font-bold text-[9px]">Custom-X v4.1</span></span>
          </div>
        </div>
        <div className="flex gap-6 uppercase tracking-widest text-[9px] items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-blue-400" />
            <span>Axeron Engine v14.6.0</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-600">Build ID: 20260609-PRO</span>
        </div>
      </footer>
    </div>
  );
}
