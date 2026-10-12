"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Radio,
  UserCheck,
  Star,
  Activity,
  Zap,
  Play,
  RotateCcw,
  Crosshair,
  Volume2,
  VolumeX,
  Compass,
  Award,
  CheckCircle2,
} from "lucide-react";

/* ─── Mission Types for Gamified Dispatch ─── */
interface Mission {
  id: string;
  name: string;
  icon: string;
  target: string;
  eta: string;
  distance: string;
  xp: number;
  progress: number;
}

const MISSIONS: Mission[] = [
  {
    id: "checkin",
    name: "Elder Well-Being Check",
    icon: "🍵",
    target: "Model Town Residence",
    eta: "03:15",
    distance: "0.6 km",
    xp: 150,
    progress: 75,
  },
  {
    id: "medicine",
    name: "Express Medicine Run",
    icon: "💊",
    target: "Apollo Pharmacy Hub",
    eta: "05:40",
    distance: "1.2 km",
    xp: 220,
    progress: 40,
  },
  {
    id: "clinic",
    name: "Hospital Accompaniment",
    icon: "🩺",
    target: "Civil Hospital Escort",
    eta: "08:10",
    distance: "2.4 km",
    xp: 300,
    progress: 20,
  },
];

/* ─── 3D Gamified Radar & City Grid Engine ─── */
function Gamified3DWorld({
  activeMission,
  isScanning,
  dispatchProgress,
  onNodeClick,
}: {
  activeMission: Mission;
  isScanning: boolean;
  dispatchProgress: number; // 0 to 1
  onNodeClick: (nodeName: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    // Mouse tilt tracking
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = x * 0.45;
      targetTiltX = -y * 0.45;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", onResize);

    // Nodes on isometric grid
    const nodes = [
      { id: "hub", name: "HB Command Hub", x: -140, y: 70, color: "#34d399", icon: "🏢" },
      { id: "pharmacy", name: "Apollo Pharmacy", x: -40, y: -90, color: "#a67c52", icon: "💊" },
      { id: "home", name: "Elder Residence", x: 130, y: 30, color: "#10b981", icon: "🏡" },
      { id: "clinic", name: "Metro Care Center", x: 90, y: -120, color: "#f59e0b", icon: "🏥" },
    ];

    // Floating ambient particles
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 450,
      y: (Math.random() - 0.5) * 350,
      z: (Math.random() - 0.5) * 150,
      size: 1 + Math.random() * 2.2,
      speed: 0.2 + Math.random() * 0.5,
    }));

    let time = 0;
    let scanAngle = 0;

    // 3D Isometric Projection Helper
    const project3D = (x: number, y: number, z: number, rx: number, ry: number) => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 420;
      const scale = fov / (fov + z2 + 250);
      return {
        px: width / 2 + x1 * scale,
        py: height / 2 + y1 * scale,
        scale,
      };
    };

    const render = () => {
      time += 0.02;
      scanAngle += 0.04;
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // ── 1. Cyber Ambient Atmosphere Glow ──
      const ambientGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      ambientGrad.addColorStop(0, "rgba(46, 58, 47, 0.25)");
      ambientGrad.addColorStop(0.5, "rgba(166, 124, 82, 0.12)");
      ambientGrad.addColorStop(1, "rgba(250, 249, 246, 0)");
      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. Isometric 3D Grid Lines ──
      const gridSize = 7;
      const step = 42;
      ctx.strokeStyle = "rgba(46, 58, 47, 0.15)";
      ctx.lineWidth = 1;

      for (let i = -gridSize; i <= gridSize; i++) {
        // Line along X
        const p1 = project3D(-gridSize * step, i * step, 0, 0.55 + tiltX, tiltY);
        const p2 = project3D(gridSize * step, i * step, 0, 0.55 + tiltX, tiltY);
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        // Line along Y
        const p3 = project3D(i * step, -gridSize * step, 0, 0.55 + tiltX, tiltY);
        const p4 = project3D(i * step, gridSize * step, 0, 0.55 + tiltX, tiltY);
        ctx.beginPath();
        ctx.moveTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.stroke();
      }

      // ── 3. Radar Beam Sweep (Gamified Scanning) ──
      if (isScanning) {
        ctx.save();
        ctx.beginPath();
        const pCenter = project3D(0, 0, 0, 0.55 + tiltX, tiltY);
        ctx.arc(pCenter.px, pCenter.py, 180 * pCenter.scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Sweep cone
        const sweepGrad = ctx.createConicGradient(scanAngle, pCenter.px, pCenter.py);
        sweepGrad.addColorStop(0, "rgba(16, 185, 129, 0.45)");
        sweepGrad.addColorStop(0.15, "rgba(16, 185, 129, 0.05)");
        sweepGrad.addColorStop(0.3, "rgba(16, 185, 129, 0)");
        sweepGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
        ctx.fillStyle = sweepGrad;
        ctx.fill();
        ctx.restore();
      }

      // ── 4. Glowing Waypoint Route (Dispatch Path) ──
      const startNode = nodes[0];
      const endNode = activeMission.id === "medicine" ? nodes[1] : nodes[2];

      const pStart = project3D(startNode.x, startNode.y, 0, 0.55 + tiltX, tiltY);
      const pEnd = project3D(endNode.x, endNode.y, 0, 0.55 + tiltX, tiltY);

      // Cyber spline path
      ctx.beginPath();
      ctx.moveTo(pStart.px, pStart.py);
      const midX = (pStart.px + pEnd.px) / 2 + Math.sin(time) * 15;
      const midY = (pStart.py + pEnd.py) / 2 - 35;
      ctx.quadraticCurveTo(midX, midY, pEnd.px, pEnd.py);
      ctx.strokeStyle = "rgba(166, 124, 82, 0.65)";
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── 5. Helper Avatar Travelling along Route ──
      const t = dispatchProgress;
      // Quadratic bezier calculation
      const curX = (1 - t) * (1 - t) * pStart.px + 2 * (1 - t) * t * midX + t * t * pEnd.px;
      const curY = (1 - t) * (1 - t) * pStart.py + 2 * (1 - t) * t * midY + t * t * pEnd.py;

      // Pulse ring around helper
      ctx.beginPath();
      ctx.arc(curX, curY, 14 + Math.sin(time * 6) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Helper Core Disc
      ctx.beginPath();
      ctx.arc(curX, curY, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Floating Helper Name Tag
      ctx.fillStyle = "#1e281f";
      ctx.font = "bold 10px monospace";
      ctx.fillText("AGENT HARPREET", curX - 44, curY - 18);

      // ── 6. Render Map Landmark Nodes ──
      nodes.forEach((node) => {
        const p = project3D(node.x, node.y, 0, 0.55 + tiltX, tiltY);

        // Ground anchor pulse
        ctx.beginPath();
        ctx.arc(p.px, p.py, 8 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(46, 58, 47, 0.25)";
        ctx.fill();

        // Vertical holographic beam
        const topH = 32 * p.scale;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.px, p.py - topH);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Pin Head
        ctx.beginPath();
        ctx.arc(p.px, p.py - topH, 7 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Title Tag
        ctx.fillStyle = "#2e3a2f";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(node.name, p.px - 30, p.py - topH - 10);
      });

      // ── 7. Floating 3D Star/Data Dust Particles ──
      particles.forEach((part) => {
        part.y -= part.speed;
        if (part.y < -180) part.y = 180;

        const p = project3D(part.x, part.y, part.z, 0.55 + tiltX, tiltY);
        ctx.beginPath();
        ctx.arc(p.px, p.py, part.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(166, 124, 82, 0.35)";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [activeMission, isScanning, dispatchProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-crosshair"
      aria-label="Interactive 3D Ludhiana Care Map"
    />
  );
}

/* ═════════════════════════════════════════════════════════════════════════
    MAIN GAMIFIED HERO SECTION COMPONENT
═════════════════════════════════════════════════════════════════════════ */
export default function EtailHeroSection() {
  const [selectedMission, setSelectedMission] = useState<Mission>(MISSIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchProgress, setDispatchProgress] = useState(0.2);
  const [userXp, setUserXp] = useState(1450);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Trigger Gamified Helper Dispatch Animation
  const handleLaunchDispatch = () => {
    setIsDispatching(true);
    setDispatchProgress(0);
    setNotification(`⚡ DISPATCH LAUNCHED: ${selectedMission.name}!`);

    let current = 0;
    const interval = setInterval(() => {
      current += 0.05;
      if (current >= 1) {
        clearInterval(interval);
        setDispatchProgress(1);
        setIsDispatching(false);
        setUserXp((prev) => prev + selectedMission.xp);
        setNotification(`🏆 MISSION ACCOMPLISHED: Verified at ${selectedMission.target} (+${selectedMission.xp} XP)!`);
        setTimeout(() => setNotification(null), 4000);
      } else {
        setDispatchProgress(current);
      }
    }, 120);
  };

  // Trigger Radar Scan Pulse
  const handleScanSector = () => {
    setIsScanning(true);
    setNotification("📡 SECTOR RADAR SCANNING: 3 Active Helpers Found within 1.5 km");
    setTimeout(() => {
      setIsScanning(false);
      setTimeout(() => setNotification(null), 2500);
    }, 2800);
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#faf9f6] text-brand-ink flex flex-col justify-between py-6 lg:py-10">

      {/* ── Ambient Radial Lighting Background ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 right-[-10%] h-[700px] w-[700px] rounded-full blur-[140px] opacity-70"
          style={{
            background: "radial-gradient(circle, rgba(166,124,82,0.22) 0%, rgba(46,58,47,0.12) 50%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full blur-[130px] opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(46,58,47,0.18) 0%, rgba(16,185,129,0.08) 50%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-[clamp(1rem,3vw,2rem)] flex-1 flex flex-col justify-between gap-6">

        {/* ════════════════════════════════════════════════════════
            1. GAMIFIED TOP STATUS BAR & XP HUD (Minimal Text, Max Visuals)
        ════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-accent/40 pb-4">

          {/* Level / Pilot City Beacon */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-brand-primary/25 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-primary">
                SECTOR: LUDHIANA PILOT
              </span>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-sand/40 px-3 py-1 text-[11px] font-bold text-brand-secondary">
              <Award className="h-3.5 w-3.5" /> LVL 04 OPERATIONAL
            </span>
          </div>

          {/* Gamified Health & XP Meter */}
          <div className="flex items-center gap-4">
            {/* Trust Meter (Health Bar Style) */}
            <div className="hidden md:flex items-center gap-2 rounded-2xl border border-brand-accent/40 bg-white/80 px-3 py-1.5 backdrop-blur-md shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <div className="flex flex-col">
                <div className="flex justify-between text-[10px] font-bold text-brand-ink">
                  <span>SAFETY SHIELD</span>
                  <span className="text-emerald-700">100% MAX</span>
                </div>
                <div className="h-1.5 w-28 rounded-full bg-brand-sand/50 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* XP Counter Pill */}
            <div className="flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-3.5 py-1 text-xs font-black text-amber-900 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" />
              <span>{userXp.toLocaleString()} XP</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-accent/40 bg-white/80 text-brand-muted hover:text-brand-primary transition-colors"
              aria-label="Toggle Sound FX"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            2. ULTRA-PUNCHY HERO TITLE (Short & Visual-Focused)
        ════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-2">
          <div>
            <h1
              className="font-heading font-black tracking-tight text-brand-primary"
              style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)", lineHeight: 1.1 }}
            >
              One Tap.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-secondary">
                At Their Doorstep.
              </span>
            </h1>
            <p className="mt-1 text-sm font-semibold text-brand-muted">
              Interactive Dispatch Radar · Real-time verified assistance for families.
            </p>
          </div>

          {/* Quick Playable Action Deck */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleLaunchDispatch}
              disabled={isDispatching}
              className="group relative flex-1 lg:flex-none inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-primary px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-brand-primary/20 hover:bg-brand-ink transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Zap className="h-4 w-4 text-amber-300 fill-amber-300" />
              <span>{isDispatching ? "En Route..." : "Dispatch Helper"}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleScanSector}
              disabled={isScanning}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/30 bg-white/80 px-5 py-3 text-xs font-bold uppercase tracking-wider text-brand-primary shadow-sm hover:bg-brand-surface transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Radio className={`h-4 w-4 ${isScanning ? "animate-spin text-emerald-600" : ""}`} />
              <span>Scan Radar</span>
            </button>
          </div>
        </div>

        {/* Dynamic Notification Toast */}
        {notification && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-50/95 px-4 py-2.5 text-xs font-bold text-emerald-900 shadow-lg backdrop-blur-md animate-bounce">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════
            3. PLAYABLE 3D RADAR VIEWPORT & GAMIFIED HUD COCKPIT
        ════════════════════════════════════════════════════════ */}
        <div className="relative w-full h-[480px] lg:h-[530px] rounded-3xl border border-white/70 bg-gradient-to-b from-white/60 to-brand-sand/20 shadow-2xl backdrop-blur-xl overflow-hidden">

          {/* Interactive 3D Canvas City / Radar Map */}
          <Gamified3DWorld
            activeMission={selectedMission}
            isScanning={isScanning}
            dispatchProgress={dispatchProgress}
            onNodeClick={(name) => setNotification(`Inspecting: ${name}`)}
          />

          {/* ── Top-Left HUD: Live Telemetry Widget ── */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-auto">
            <div className="rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-xl backdrop-blur-xl max-w-[210px]">
              <div className="flex items-center justify-between text-[10px] font-black tracking-wider text-brand-muted">
                <span>TELEMETRY</span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> LIVE
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl bg-brand-surface/90 p-1.5 border border-brand-accent/30">
                  <p className="text-[9px] text-brand-muted">DISTANCE</p>
                  <p className="font-mono text-xs font-black text-brand-primary">{selectedMission.distance}</p>
                </div>
                <div className="rounded-xl bg-brand-surface/90 p-1.5 border border-brand-accent/30">
                  <p className="text-[9px] text-brand-muted">EST. TIME</p>
                  <p className="font-mono text-xs font-black text-amber-600">{selectedMission.eta}</p>
                </div>
              </div>
            </div>

            {/* Crosshair Compass Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-brand-accent/40 bg-white/80 px-3 py-1.5 shadow-md backdrop-blur-md text-[11px] font-bold text-brand-ink">
              <Crosshair className="h-3.5 w-3.5 text-brand-secondary" />
              <span>Ludhiana Hub · Sector 3 Grid</span>
            </div>
          </div>

          {/* ── Top-Right HUD: Agent Loadout Card (Avatar + Cleared Stats) ── */}
          <div className="absolute top-4 right-4 z-20 pointer-events-auto">
            <div className="rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl max-w-[230px]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white font-black text-sm shadow-md">
                  HS
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] font-bold border-2 border-white">
                    ✓
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-black text-brand-ink">Harpreet Singh</p>
                  <p className="text-[10px] font-bold text-brand-secondary">Vetted Senior Escort</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold">5.0</span>
                    <span className="text-[9px] text-brand-muted">(1,240+ visits)</span>
                  </div>
                </div>
              </div>

              {/* Holographic Verification Chips */}
              <div className="mt-3 flex items-center gap-1.5 border-t border-brand-accent/30 pt-2">
                <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black text-emerald-800 border border-emerald-200">
                  ID: HB-8402
                </span>
                <span className="rounded-md bg-brand-sand/40 px-1.5 py-0.5 text-[9px] font-black text-brand-primary">
                  POLICE VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* ── Bottom HUD: Interactive Quest / Mission Selector Deck ── */}
          <div className="absolute bottom-4 inset-x-4 z-20 pointer-events-auto">
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/80 bg-white/90 p-3 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-brand-muted px-1 pb-2">
                <span>SELECT CARE MISSION (CLICK TO TARGET)</span>
                <span className="text-brand-secondary">+{selectedMission.xp} XP REWARD</span>
              </div>

              {/* 3 Interactive Mission Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {MISSIONS.map((mission) => {
                  const isSelected = selectedMission.id === mission.id;
                  return (
                    <button
                      key={mission.id}
                      onClick={() => {
                        setSelectedMission(mission);
                        setDispatchProgress(0.25);
                        setNotification(`🎯 TARGET LOCKED: ${mission.name}`);
                      }}
                      className={`relative flex items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-[1.02]"
                          : "bg-brand-surface/80 text-brand-ink hover:bg-brand-surface hover:shadow-sm"
                      }`}
                    >
                      <span className="text-xl">{mission.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-black">{mission.name}</p>
                        <p className={`text-[10px] ${isSelected ? "text-white/80" : "text-brand-muted"}`}>
                          {mission.target}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════
            4. VISUAL ACHIEVEMENT BADGES & BOOKING TRIGGER
        ════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2">
          {/* 3 Clickable Achievement Seals */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-brand-accent/50 bg-white/70 px-3.5 py-2 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                ✓
              </span>
              <span className="text-xs font-extrabold text-brand-ink">100% In-Person Vetted</span>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-brand-accent/50 bg-white/70 px-3.5 py-2 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-800 font-black text-xs">
                ⚡
              </span>
              <span className="text-xs font-extrabold text-brand-ink">&lt; 15m Dispatch Match</span>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-brand-accent/50 bg-white/70 px-3.5 py-2 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-800 font-black text-xs">
                📷
              </span>
              <span className="text-xs font-extrabold text-brand-ink">Photo Proof On Completion</span>
            </div>
          </div>

          {/* Quick Direct Link to Booking */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary hover:text-brand-ink hover:underline"
          >
            <span>Book Real Helper in Ludhiana</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>

    </section>
  );
}
