import { AuraNavbar } from "@/components/layout/AuraNavbar";
import { Hero3D } from "@/components/home/Hero3D";
import { VaporFlow } from "@/components/home/VaporFlow";
import { AuraShowcase } from "@/components/home/AuraShowcase";

export default function Home() {
  return (
    <main
      className="relative bg-[#050505] text-white overflow-x-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Fixed Glassmorphism Navbar ── */}
      <AuraNavbar />

      {/* ── 3D Hero Section (tall — gives GSAP scroll room) ── */}
      <Hero3D />

      {/* ── Second Section: Godly vapor transition ── */}
      <div className="relative z-10 -mt-20 md:-mt-28">
        <VaporFlow />
      </div>

      <AuraShowcase />

      {/* ── Vision Section ── */}
      <section
        id="vision"
        className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 py-32 bg-[#050505]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,229,255,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Built for minds that never stop moving
          </h2>
          <p className="text-white/40 text-base leading-relaxed">
            Whether you&apos;re a founder, researcher, or creator — Aura V gives you
            a cognitive co-pilot that keeps pace with your thinking.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3.5 rounded-full bg-[#00E5FF] text-black font-semibold text-sm tracking-wide shadow-[0_0_40px_6px_rgba(0,229,255,0.3)] hover:shadow-[0_0_60px_10px_rgba(0,229,255,0.5)] transition-shadow duration-300"
          >
            Join the waitlist
          </a>
        </div>
      </section>

      <section id="developer" className="relative z-10 py-20 bg-[#050505]" />
      <section id="about" className="relative z-10 py-20 bg-[#050505]" />

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-8 flex flex-col md:flex-row items-center justify-between text-white/20 text-xs tracking-wide">
        <span>© 2026 Aura V. All rights reserved.</span>
        <span className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          <a href="#" className="hover:text-white/50 transition-colors">Contact</a>
        </span>
      </footer>
    </main>
  );
}
