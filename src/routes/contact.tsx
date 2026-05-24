import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, Calendar, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Schedule a Scan — Memory3D" },
      { name: "description", content: "Reach our studio, schedule a 3D body scan or get help personalizing your crystal keepsake." },
      { property: "og:title", content: "Contact — Memory3D" },
      { property: "og:description", content: "Talk to our crystal specialists." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background">
      <section className="pt-40 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">Get In Touch</span>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-[0.95]">
              Let's make <br /><em className="text-gradient-gold not-italic">something forever.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Message sent — we'll be in touch within 24 hours.");
              }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name"><input required className="input" placeholder="Your name" /></Field>
                <Field label="Email"><input required type="email" className="input" placeholder="you@email.com" /></Field>
              </div>
              <Field label="What interests you?">
                <select className="input">
                  <option>Crystal photo gift</option>
                  <option>3D sculpture / scan</option>
                  <option>Wedding crystal</option>
                  <option>Memorial keepsake</option>
                  <option>Pop-up scanner booking</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Tell us about your project">
                <textarea required rows={5} className="input resize-none" placeholder="The moment, the people, the occasion…" />
              </Field>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-gold text-primary-foreground py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold hover:opacity-90 transition"
              >
                {sent ? "Sent" : "Send Message"} <Send className="w-4 h-4" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-3xl mb-2">Studio</h3>
                <p className="text-muted-foreground">By appointment only. We host scan days in cities nationwide — book yours below.</p>
              </div>
              <ul className="space-y-5">
                {[
                  { icon: Mail, t: "hello@memory3d.com" },
                  { icon: Phone, t: "(555) 010-3DXX" },
                  { icon: MapPin, t: "Nationwide pop-up scans" },
                  { icon: Calendar, t: "Mon — Sat, 9am – 7pm" },
                ].map(({ icon: I, t }) => (
                  <li key={t} className="flex items-center gap-4">
                    <span className="w-11 h-11 grid place-items-center border border-gold/40 rounded-sm">
                      <I className="w-4 h-4 text-gold" />
                    </span>
                    <span className="text-foreground/90">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="hairline pt-8">
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">Wedding & Event Inquiries</p>
                <p className="text-muted-foreground">For wedding parties, corporate gifting, and group scans (10+ people), email events@memory3d.com for a custom quote.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: var(--card);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 0.95rem 1rem;
          border-radius: 4px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .input:focus { outline: none; border-color: var(--gold); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}
