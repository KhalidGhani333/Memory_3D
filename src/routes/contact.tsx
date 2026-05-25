import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Schedule a Scan -  Memory3D" },
      {
        name: "description",
        content:
          "Reach our studio, schedule a 3D body scan or get help personalizing your crystal keepsake.",
      },
      { property: "og:title", content: "Contact -  Memory3D" },
      { property: "og:description", content: "Talk to our crystal specialists." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background">
      {/* ───────── HERO ───────── */}
      <section className="pt-40 pb-16 bg-gradient-hero border-b border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold font-medium">
              Get In Touch
            </span>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-[0.95] text-foreground">
              Let's make <br />
              <em className="text-gradient-gold not-italic">something forever.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ───────── FORM + INFO ───────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Reveal>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-16 h-16 text-gold mb-6" />
                <h2 className="font-display text-4xl text-foreground mb-3">Message Sent!</h2>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 text-[11px] tracking-[0.2em] uppercase text-gold hover:underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  toast.success("Message sent -  we'll be in touch within 24 hours.");
                }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name">
                    <input required className="input" placeholder="Your name" />
                  </Field>
                  <Field label="Email">
                    <input required type="email" className="input" placeholder="you@email.com" />
                  </Field>
                </div>
                <Field label="What interests you?">
                  <select className="input">
                    <option>Crystal photo gift</option>
                    <option>3D sculpture / scan</option>
                    <option>Wedding crystal</option>
                    <option>Memorial keepsake</option>
                    <option>Sports event crystal</option>
                    <option>Pop-up scanner booking</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Tell us about your project">
                  <textarea
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="The moment, the people, the occasion…"
                  />
                </Field>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-gold text-white py-4 text-[11px] tracking-[0.3em] uppercase rounded-sm shadow-gold hover:opacity-90 transition font-bold"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </Reveal>

          {/* Contact Info */}
          <Reveal delay={0.15}>
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-3xl text-foreground mb-2">Studio</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By appointment only. We host scan days in cities nationwide, book yours below.
                </p>
              </div>

              <ul className="space-y-5">
                {[
                  { icon: Mail, t: "support@memory3d.com", href: "mailto:support@memory3d.com" },
                  { icon: Phone, t: "888-936-3667", href: "tel:888-936-3667" },
                  { icon: MapPin, t: "Nationwide pop-up scans", href: undefined },
                  { icon: Calendar, t: "Mon – Sat, 9am – 7pm", href: undefined },
                ].map(({ icon: I, t, href }) => (
                  <li key={t} className="flex items-center gap-4">
                    <span className="w-11 h-11 grid place-items-center border border-gold/40 rounded-sm bg-gold/5 shrink-0">
                      <I className="w-4 h-4 text-gold" />
                    </span>
                    {href ? (
                      <a href={href} className="text-foreground/90 hover:text-gold transition-colors">
                        {t}
                      </a>
                    ) : (
                      <span className="text-foreground/90">{t}</span>
                    )}
                  </li>
                ))}
              </ul>

              {/* Wedding & Event inquiries */}
              <div className="hairline pt-8">
                <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3 font-semibold">
                  Wedding & Event Inquiries
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For wedding parties, corporate gifting, sports teams, and group scans (10+
                  people), email{" "}
                  <a
                    href="mailto:events@memory3d.com"
                    className="text-gold hover:underline font-medium"
                  >
                    events@memory3d.com
                  </a>{" "}
                  for a custom quote.
                </p>
              </div>

              {/* Quick links */}
              <div className="p-6 bg-card border border-border rounded-sm shadow-sm">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-medium">
                  Quick Links
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Browse all products", href: "/shop" },
                    { label: "Learn about our process", href: "/about" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="flex items-center justify-between text-sm text-foreground/80 hover:text-gold transition-colors group py-1"
                    >
                      {l.label}
                      <span className="text-gold text-lg group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-card);
          border: 1px solid var(--color-border);
          color: var(--color-foreground);
          padding: 0.95rem 1rem;
          border-radius: 4px;
          font-size: 0.95rem;
          transition: border-color 0.2s;
          font-family: var(--font-sans);
        }
        .input:focus {
          outline: none;
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px oklch(0.62 0.14 79 / 0.08);
        }
        .input::placeholder {
          color: var(--color-muted-foreground);
        }
        select.input option {
          background: white;
          color: var(--color-foreground);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2 font-medium">
        {label}
      </span>
      {children}
    </label>
  );
}
