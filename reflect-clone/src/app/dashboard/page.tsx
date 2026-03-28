"use client";

import Link from "next/link";
import { ArrowLeft, Activity, Target, ShieldAlert, Database, Mic } from "lucide-react";

const SYSTEM_LOGS = [
  { timestamp: "[22:45:01]", channel: "[SYSTEM]", message: "System initialized successfully.", className: "text-zinc-600" },
  { timestamp: "[22:45:02]", channel: "[VISION]", message: "YOLOv26 Model loaded. Activating tensor cores...", className: "text-primary/70" },
  { timestamp: "[22:45:03]", channel: "[VISION]", message: "YOLOv26 Vision Loop Started. Frame stream active.", className: "text-primary/90" },
  { timestamp: "[22:45:05]", channel: "[ALICE]", message: "Synthesizing scene data... Evaluating depth map...", className: "text-purple-400/80" },
  { timestamp: "[22:45:07]", channel: "[ALERT]", message: "High probability obstacle detected in path.", className: "text-red-400" },
  { timestamp: "[22:45:07]", channel: "[MEMORY]", message: "Semantic state saved to ChromaDB index.", className: "text-blue-400/80" },
] as const;

const OBSERVED_ENTITIES = [
  { name: "Chair", confidence: "98%" },
  { name: "Table", confidence: "85%" },
  { name: "Door Frame", confidence: "95%" },
] as const;

function DashboardHeader() {
  return (
    <nav className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 shrink-0">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary hover:bg-primary/15 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <div className="flex items-center gap-3">
        <Activity className="w-5 h-5 text-primary" />
        <h1 className="text-lg font-bold tracking-tight text-white">SmartAV Live Dashboard</h1>
      </div>
      <div className="w-24" aria-hidden />
    </nav>
  );
}

function LiveLogConsole() {
  return (
    <div className="h-40 bg-[#000000] border-t border-white/10 p-4 shrink-0 overflow-y-auto font-mono text-[11px] sm:text-xs">
      <div className="flex flex-col gap-1.5 opacity-80">
        {SYSTEM_LOGS.map((entry) => (
          <p key={`${entry.timestamp}-${entry.channel}`} className={entry.className}>
            <span className="text-zinc-500">{entry.timestamp}</span> {entry.channel} {entry.message}
          </p>
        ))}
      </div>
    </div>
  );
}

function EntityCard({ name, confidence }: { name: string; confidence: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
      <span className="text-sm font-medium text-zinc-400">{name}</span>
      <span className="text-xs font-mono text-zinc-500">{confidence}</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white p-4 sm:p-6 flex flex-col font-sans">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full flex-1 min-h-0">
        <div className="col-span-1 lg:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10 shrink-0 relative z-10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Live</span>
              </div>
              <span className="text-xs font-mono text-primary/80 uppercase tracking-widest">YOLOv26 Active</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-500">RES: 1080p</span>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs font-mono text-primary font-semibold">
                60 FPS
              </span>
            </div>
          </div>

          <div className="flex-1 bg-[#020202] relative flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #36d1ff 1px, transparent 1px),
                  linear-gradient(to bottom, #36d1ff 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute w-12 h-12 border border-primary/30 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-1 h-1 bg-primary rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-3 opacity-50">
              <Target className="w-12 h-12 text-zinc-600" />
              <span className="text-sm font-mono text-zinc-600 tracking-widest uppercase">Awaiting Camera Feed</span>
            </div>
            <div className="absolute top-1/3 left-1/4 w-48 h-64 border-2 border-primary bg-primary/15 rounded-sm flex flex-col pointer-events-none">
              <span className="bg-primary text-white text-[10px] font-bold px-1 py-0.5 w-fit uppercase tracking-wider">
                Obstacle 92%
              </span>
            </div>
          </div>

          <LiveLogConsole />
        </div>

        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 overflow-y-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none" />

            <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-semibold tracking-wide text-zinc-100">Alice AI Voice</h3>
              <div className="ml-auto flex gap-1">
                <span className="w-1 h-3 bg-purple-400 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                <span className="w-1 h-5 bg-purple-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="w-1 h-2 bg-purple-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              </div>
            </div>

            <p className="text-zinc-300 text-lg leading-relaxed font-light">
              Approaching a door in 3 meters. <span className="text-red-400 font-medium">Caution:</span> sharp edge
              detected on the left.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 flex flex-col min-h-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-semibold tracking-wide text-zinc-100">Observed Entities</h3>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pr-2">
              {OBSERVED_ENTITIES.map((entity) => (
                <EntityCard key={entity.name} name={entity.name} confidence={entity.confidence} />
              ))}

              <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30 group">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-red-400">Obstacle</span>
                </div>
                <span className="text-xs font-mono font-bold text-red-500">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
