import { footerLogos } from "../data/footerLogos";

export default function FooterLogoMarquee() {
  const logos = [...footerLogos, ...footerLogos]; // seamless loop

  return (
    <section className="bg-slate-950 py-6 overflow-hidden border-t border-white/10">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h3 className="text-xs md:text-sm tracking-widest uppercase text-gray-400">
          Technologies & Platforms We Use
        </h3>
      </div>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden group">

        <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">

          {logos.map((logo, i) => (
            <a
              key={i}
              href={logo.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center min-w-[100px] md:min-w-[120px] opacity-70 hover:opacity-100 transition duration-300"
            >
              <img
                src={logo.logo}
                alt={logo.name}
                loading="lazy"
                className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </a>
          ))}

        </div>

      </div>
    </section>
  );
}