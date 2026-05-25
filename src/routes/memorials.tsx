import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, Heart } from "lucide-react";
import cover from "@/assets/James_Castle-Cover.avif";
import m2 from "@/assets/memory_2.avif";
import m4 from "@/assets/memory_4.avif";
import m6 from "@/assets/memory_6.avif";
import m7 from "@/assets/memory_7.avif";

export const Route = createFileRoute("/memorials")({
  head: () => ({
    meta: [
      { title: "Memorial Crystals -  Memory3D" },
      {
        name: "description",
        content:
          "Honor a loved one with a 3D crystal keepsake. A way to hold their memory in your hands forever.",
      },
      { property: "og:title", content: "Memorial Crystals -  Memory3D" },
      { property: "og:description", content: "Forever, in your hands." },
      { property: "og:image", content: cover },
    ],
  }),
  component: Memorials,
});

function Memorials() {
  return (
    <div className="bg-background">
      <section className="relative min-h-[85vh] flex items-end pt-40 pb-24">
        <div className="absolute inset-0">
          <img src={cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">
              Memorial Collection
            </span>
            <h1 className="font-display text-6xl md:text-8xl mt-4 max-w-3xl leading-[0.95]">
              A way to <em className="text-gradient-gold not-italic">hold them</em> again.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl font-light">
              For the people, the pets, the lives that left a mark on yours. A quiet keepsake that
              catches the morning light and your breath, every time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Heart className="w-10 h-10 text-gold mx-auto mb-6" />
            <p className="font-display text-3xl md:text-4xl leading-snug text-foreground/95">
              "I cried when I unboxed it. My mother is gone but I see her every morning now. Thank
              you."
            </p>
            <p className="mt-6 text-gold text-[11px] tracking-[0.3em] uppercase">-  Sarah L.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[m2, m4, m6, m7].map((src, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="aspect-[3/4] overflow-hidden rounded-sm group">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32 bg-card/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl leading-tight">
              When words aren't enough.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Upload one cherished photo. We'll craft a quiet, permanent tribute in crystal that
              lasts longer than memory.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-9 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold"
            >
              Begin Your Tribute <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
