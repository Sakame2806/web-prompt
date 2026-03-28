import { AuraNavbar } from "@/components/layout/AuraNavbar";
import HeroSplit from "@/components/home/HeroSplit";
import { SystemBrief } from "@/components/home/SystemBrief";
import { LogoTicker } from "@/components/home/LogoTicker";
import { MeetAlice } from "@/components/home/MeetAlice";
import { AuraShowcase } from "@/components/home/AuraShowcase";
import { VisionShowcase } from "@/components/home/VisionShowcase";
import TeamSection from "@/components/developer/TeamSection";

export default function Home() {
  return (
    <main
      className="relative bg-[#050505] text-white overflow-x-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Fixed Glassmorphism Navbar ── */}
      <AuraNavbar />

      <HeroSplit />

      <SystemBrief />

      <VisionShowcase />

      <section id="developer" className="relative z-10 bg-transparent">
        <TeamSection />
      </section>

      <div className="relative z-10">
        <MeetAlice />
      </div>

      <div className="relative z-10">
        <AuraShowcase />
      </div>



      <section id="about" className="relative z-10 py-20 bg-[#050505]" />

      {/* ── Logo Ticker (Bottom Transition) ── */}
      <section className="relative z-10 border-t border-white/5 bg-[#050505] py-12">
        <LogoTicker />
      </section>

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
