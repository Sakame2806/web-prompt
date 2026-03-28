"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollRevealWords } from "@/components/ui/ScrollRevealWords";

const team = [
  {
    name: "George",
    role: "Lead Developer & AI Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", // Placeholder
    bio: "Specializing in multimodal AI integration and spatial reasoning systems.",
  },
  {
    name: "Sarah Chen",
    role: "Computer Vision Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", // Placeholder
    bio: "Expert in YOLO optimization and real-time environmental mapping.",
  },
  {
    name: "Alex River",
    role: "Backend Infrastructure",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", // Placeholder
    bio: "Architecting the FastAPI core and high-concurrency WebSocket telemetry.",
  },
  {
    name: "Elena Vance",
    role: "UI/UX & Product Design",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", // Placeholder
    bio: "Focusing on human-centric design for assistive vision technologies.",
  },
] as const;

function getRoleColor(role: string) {
  return role.includes("Lead Developer") ? "text-[#36d1ff]" : "text-primary/85";
}

export default function TeamSection() {
  return (
    <section
      className="relative bg-transparent pt-14 md:pt-16 lg:pt-20 pb-16 px-6 md:px-20 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 100%)",
      }}
    >
      <ScrollRevealWords
        text="The Architects of Aura"
        className="w-full text-center text-4xl md:text-7xl font-light tracking-tighter text-white mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-square mb-6 border border-white/10">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
            <p className={`text-sm mb-3 uppercase tracking-widest font-mono ${getRoleColor(member.role)}`}>
              {member.role}
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {member.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
