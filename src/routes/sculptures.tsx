import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, Camera, Palette, Package } from "lucide-react";
import cover from "@/assets/Memory3D_Sculptures.avif";
import cover1 from "@/assets/Memory3D_Sculptures_1.avif";
import s1 from "@/assets/3D-Sculp-1.avif";
import s2 from "@/assets/3D-Sculp-2.avif";
import s3 from "@/assets/3D-Sculp-3.avif";
import s4 from "@/assets/3D-Sculp-4.jpg";
import s5 from "@/assets/3D-Sculp-5.jpg";
import s6 from "@/assets/3D-Sculp-6.jpg";
import s7 from "@/assets/3D-Sculp-7.jpg";

export const Route = createFileRoute("/sculptures")({
  head: () => ({
    meta: [
      { title: "3D Sculptures — Full-Color Figurines of You | Memory3D" },
      { name: "description", content: "Step into our scanner and walk out with a full-color sculpture of yourself, your family or your pet. Crafted to the last detail." },
      { property: "og:title", content: "3D Sculptures — Memory3D" },
      { property: "og:description", content: "Full-color hand-finished figurines from a 12-second scan." },
      { property: "og:image", content: cover },
    ],
  }),
  component: Sculptures,
});

function Sculptures() {
  return (
    <div className="bg-background">
      <section className="relative min-h-[80vh] flex items-end pt-40 pb-20">
        <div className="absolute inset-0">
          <img src={cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">3D Sculptures</span>
            <h1 className="font-display text-6xl md:text-8xl mt-4 max-w-4xl leading-[0.95]">
              You, <em className="text-gradient-gold not-italic">in miniature.</em>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-xl">
              Full-color, hand-finished figurines crafted from a single 12-second 3D scan.
              Stand on your shelf forever.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Camera, t: "12-Second Scan", b: "Our pop-up scanner captures every detail in one quick session." },
              { icon: Palette, t: "Full Color", b: "Every freckle, every stitch, every shade — printed in stunning color." },
              { icon: Package, t: "Hand Finished", b: "Each sculpture is inspected and detailed by our artisans before shipping." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1}>
                <div>
                  <f.icon className="w-8 h-8 text-gold mb-5" />
                  <h3 className="font-display text-2xl mb-2">{f.t}</h3>
                  <p className="text-muted-foreground">{f.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[s1, s2, s3, s4, s5, s6, s7, cover1].map((src, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-sm group">
                <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-32 text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-6xl max-w-3xl mx-auto px-6">
            Ready to be <em className="text-gradient-gold not-italic">immortalized?</em>
          </h2>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold">
            Book Your Scan <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
