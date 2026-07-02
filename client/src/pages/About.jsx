import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import Team from "../components/Team";
import Career from "../components/Career";
import AboutHero from "./AboutHero";
import IntroVideo from "./IntroVideo";
import AboutGrid from "./AboutGrid";
import CoreValues from "./CoreValues";

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 selection:bg-brandBlue/20">
      
      {/* Subtle Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.15),_transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.25),_transparent_40%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(250,204,21,0.1),_transparent_40%)] dark:bg-[radial-gradient(circle_at_80%_80%,_rgba(250,204,21,0.15),_transparent_40%)] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,92,246,0.05),_transparent_50%)] animate-pulse delay-1000" />
      </div>

      {/* Interactive Grain Texture (Optional overlay for premium feel) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32 relative z-10 flex flex-col gap-12 sm:gap-20">

        <AboutHero /> 
        <IntroVideo videoId="dQw4w9WgXcQ" /> 
        <AboutGrid />
        <CoreValues />
        <Gallery />
        <Team />
        <Career />
      </div>
    </section>
  );
}