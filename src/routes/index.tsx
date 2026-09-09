import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Flower2,
  HeartPulse,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

import stellaTherapist from "@/assets/stella-therapist.jpg";
import stellaTreatmentRoom from "@/assets/stella-treatment-room.jpg";
import stellaTreatment from "@/assets/stella-treatment.jpg";
import stellaHotStones from "@/assets/stella-hot-stones.jpg";
import stellaPortrait from "@/assets/stella-portrait.jpg";

type ContactChannel = "whatsapp" | "telegram" | "sms";

const heroImages = [
  { src: stellaTreatmentRoom, alt: "Warm candlelit massage room prepared for a treatment" },
  { src: stellaTherapist, alt: "Stella in a professional black massage uniform" },
  { src: stellaTreatment, alt: "Professional therapeutic massage in a private spa room" },
  { src: stellaHotStones, alt: "Hot stones and orchids arranged in a luxury spa" },
  { src: stellaPortrait, alt: "Portrait of Stella in the massage studio" },
];

const services = [
  { name: "Deep Tissue Massage", prices: "$105 / $150", detail: "Focused relief", icon: HeartPulse },
  { name: "Thai Massage", prices: "$105 / $150", detail: "Stretch and restore", icon: Flower2 },
  { name: "Sports Massage", prices: "$105 / $150", detail: "Active recovery", icon: CircleDot },
  { name: "Hot Stone Therapy", prices: "$105 / $150", detail: "Deep warmth", icon: Sparkles },
  { name: "Medical Massage", prices: "$105 / $150", detail: "Targeted care", icon: ShieldCheck },
  { name: "Full Body Massage", prices: "$105 / $150", detail: "Complete reset", icon: HeartPulse },
  { name: "Trigger Point Therapy", prices: "$105 / $150", detail: "Precision pressure", icon: CircleDot },
  { name: "Couples Massage", prices: "$105 / $150", detail: "Shared stillness", icon: Flower2 },
  { name: "Signature Experience", prices: "$150 / $215", detail: "The full ritual", icon: Sparkles },
];

const sampleReviews = [
  { quote: "The pressure was precise, the room was beautiful, and I left feeling genuinely restored.", name: "James R.", label: "Sample client note" },
  { quote: "A calm, polished experience from the first message to the final minute.", name: "Elena V.", label: "Sample client note" },
  { quote: "The signature session gave my shoulders the release they had been asking for.", name: "Marcus T.", label: "Sample client note" },
  { quote: "Professional, private, and attentive. The details make the difference here.", name: "Diana L.", label: "Sample client note" },
  { quote: "Stella listened first, then tailored the session exactly to what I needed.", name: "Noah K.", label: "Sample client note" },
  { quote: "The hot stone treatment was warm, quiet, and beautifully done.", name: "Avery S.", label: "Sample client note" },
];

const faqs = [
  { question: "How do I request an appointment?", answer: "Complete the quote form and choose WhatsApp, Telegram, or SMS. Your message will open with the details already written." },
  { question: "What are the session lengths?", answer: "Most listed services are available for 60 or 90 minutes. Signature Experience is listed at $150 for 60 minutes and $215 for 90 minutes." },
  { question: "Is this appointment only?", answer: "Yes. All visits are arranged privately in advance so the session can stay calm, focused, and personal." },
  { question: "What should I bring?", answer: "Just arrive ready to relax. Any pressure preferences or areas of focus can be included in your booking note." },
];

export const Route = createFileRoute("/")({
  component: StellaMassagePage,
  head: () => ({
    meta: [
      { title: "Stella Massage Spa | Premium Therapeutic Massage" },
      { name: "description", content: "Private therapeutic massage by appointment. Explore Stella Massage Spa services, rates, and request your preferred booking channel." },
      { property: "og:title", content: "Stella Massage Spa | Premium Therapeutic Massage" },
      { property: "og:description", content: "Private therapeutic massage by appointment with clear service rates and direct booking through WhatsApp, Telegram, or SMS." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="Stella Massage Spa home">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/70 text-lg font-display italic text-gold transition-transform group-hover:rotate-6">S</span>
      <span className="leading-none">
        <span className="block font-display text-lg tracking-tight text-champagne">Stella</span>
        <span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-champagne-soft">Massage Spa</span>
      </span>
    </a>
  );
}

function StellaMassagePage() {
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Deep Tissue Massage");
  const [channel, setChannel] = useState<ContactChannel>("whatsapp");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!bookingOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBookingOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  const openBooking = (service = selectedService) => {
    setSelectedService(service);
    setSent(false);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const duration = String(form.get("duration") ?? "60 minutes");
    const date = String(form.get("date") ?? "").trim();
    const note = String(form.get("note") ?? "").trim();
    const message = [
      "Hello Stella, I would like to request a professional massage appointment.",
      `Name: ${name || "Not provided"}.`,
      `Service: ${selectedService}.`,
      `Preferred session: ${duration}.`,
      date ? `Preferred date: ${date}.` : "Preferred date: To be discussed.",
      note ? `Booking note: ${note}.` : "Booking note: I am happy to follow your next available time.",
      "Please let me know the available appointment times. Thank you.",
    ].join("\n");
    const encodedMessage = encodeURIComponent(message);
    const destinations: Record<ContactChannel, string> = {
      whatsapp: `https://wa.me/17022767481?text=${encodedMessage}`,
      telegram: `https://t.me/StellaInSilk?text=${encodedMessage}`,
      sms: `sms:+17022767481?body=${encodedMessage}`,
    };

    setSent(true);
    window.setTimeout(() => {
      window.open(destinations[channel], "_blank", "noopener,noreferrer");
    }, 180);
  };

  return (
    <main className={isLight ? "theme-light min-h-screen bg-ink text-champagne" : "min-h-screen bg-ink text-champagne"}>
      <header id="home" className="relative isolate flex min-h-[88svh] flex-col overflow-hidden border-b border-border">
        <div className="hero-gallery absolute inset-0 -z-10 overflow-hidden bg-ink">
          {heroImages.map((image) => (
            <img key={image.src} src={image.src} alt={image.alt} className="hero-slide absolute inset-0 size-full object-cover object-center opacity-0" />
          ))}
          <div className="hero-scrim absolute inset-0" />
        </div>

        <nav className="absolute inset-x-0 top-0 z-20 border-b border-champagne/10 bg-ink/50 backdrop-blur-md" aria-label="Main navigation">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
            <Logo />
            <div className="hidden items-center gap-7 md:flex">
              {[
                ["Services", "#services"],
                ["Therapist", "#about"],
                ["Reviews", "#reviews"],
                ["FAQ", "#faq"],
                ["Book", "#book"],
              ].map(([label, href]) => (
                <a key={href} href={href} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne-soft transition-colors hover:text-gold">{label}</a>
              ))}
              <button type="button" onClick={() => setIsLight((value) => !value)} className="grid size-9 place-items-center rounded-full border border-champagne/20 text-champagne transition-colors hover:border-gold hover:text-gold" aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"} title={isLight ? "Switch to dark mode" : "Switch to light mode"}>
                {isLight ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <button type="button" onClick={() => setIsLight((value) => !value)} className="grid size-9 place-items-center rounded-full border border-champagne/20 text-champagne" aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}>
                {isLight ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid size-9 place-items-center rounded-full border border-champagne/20 text-champagne" aria-label={menuOpen ? "Close menu" : "Open menu"}>
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-champagne/10 bg-ink/95 px-5 py-4 md:hidden">
              <div className="grid gap-1">
                {[
                  ["Services", "#services"],
                  ["Therapist", "#about"],
                  ["Reviews", "#reviews"],
                  ["FAQ", "#faq"],
                  ["Book", "#book"],
                ].map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-champagne/10 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-champagne">{label}</a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="relative z-10 mt-auto grid w-full gap-10 px-5 pb-10 pt-32 sm:px-8 sm:pb-14 lg:mx-auto lg:max-w-7xl lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:px-12">
          <div className="max-w-2xl animate-[rise-in_700ms_ease-out_both]">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Premium care only. Appointment only.</p>
            <h1 className="max-w-2xl text-balance font-display text-5xl leading-[0.96] text-champagne sm:text-6xl lg:text-8xl">Refined bodywork for a more <span className="italic text-gold">restored</span> you.</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-champagne-soft sm:text-base">A quiet private session built around expert touch, thoughtful detail, and your preferred pace.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => openBooking()} className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]">Request a quote <ArrowUpRight size={16} /></button>
              <a href="#services" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-champagne transition-colors hover:text-gold">View rates <ChevronDown size={15} /></a>
            </div>
          </div>
          <div className="hidden rounded-lg border border-champagne/20 bg-ink/55 p-5 backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between border-b border-champagne/15 pb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Private booking</span>
              <Clock3 size={16} className="text-gold" />
            </div>
            <p className="mt-5 font-display text-2xl leading-tight text-champagne">Start with the session that fits your body.</p>
            <button type="button" onClick={() => openBooking("Signature Experience")} className="mt-6 flex w-full items-center justify-between border-t border-champagne/15 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-champagne transition-colors hover:text-gold">Signature Experience <ArrowUpRight size={15} /></button>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-ink-soft" aria-label="Studio promise">
        <div className="mx-auto grid max-w-7xl gap-0 sm:grid-cols-3">
          {["Professional touch", "Private setting", "Tailored pressure"].map((item) => (
            <div key={item} className="flex items-center gap-3 border-b border-border px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-8">
              <Check size={16} className="shrink-0 text-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne-soft">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">The menu</p>
              <h2 className="mt-3 font-display text-4xl text-champagne sm:text-5xl">Therapeutic services</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">Choose a service to start a private quote request.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button key={service.name} type="button" onClick={() => openBooking(service.name)} className="panel-lift group rounded-lg border border-border bg-ink-panel p-5 text-left">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors group-hover:border-gold/70"><Icon size={17} /></span>
                    <ArrowUpRight size={16} className="text-muted-foreground transition-colors group-hover:text-gold" />
                  </div>
                  <h3 className="mt-7 font-display text-2xl leading-tight text-champagne">{service.name}</h3>
                  <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">{service.detail}</span>
                    <span className="text-sm font-semibold text-gold">{service.prices}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">60 minutes / 90 minutes</p>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-y border-border bg-ink-soft py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-12">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-border sm:min-h-[580px]">
            <img src={stellaTreatment} alt="Stella providing a professional back massage in a candlelit studio" className="absolute inset-0 size-full object-cover object-center" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20"><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Stella in silk</span></div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Meet your therapist</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-champagne sm:text-6xl">Quiet confidence. Expert touch.</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground">Every session is shaped around how your body feels today. Come for the calm, stay for the care, and leave with a better sense of balance.</p>
            <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
              <div className="border-l border-gold/60 pl-4"><p className="font-display text-2xl text-gold">60 / 90</p><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Minute sessions</p></div>
              <div className="border-l border-gold/60 pl-4"><p className="font-display text-2xl text-gold">Private</p><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">By appointment</p></div>
            </div>
            <button type="button" onClick={() => openBooking()} className="mt-10 inline-flex w-fit items-center gap-3 border-b border-gold pb-2 text-xs font-bold uppercase tracking-[0.18em] text-champagne transition-colors hover:text-gold">Talk about your session <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-20 bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">The word around Stella</p><h2 className="mt-3 font-display text-4xl text-champagne sm:text-5xl">Client experiences</h2></div>
            <p className="max-w-xs text-xs leading-6 text-muted-foreground">Demo review copy for the presentation. Replace with verified client feedback before publishing.</p>
          </div>
          <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-5 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {sampleReviews.map((review) => (
              <article key={review.name} className="min-w-[280px] snap-start rounded-lg border border-border bg-ink-panel p-6 lg:min-w-0">
                <div className="flex gap-1 text-gold" aria-label="Five star sample review">{Array.from({ length: 5 }).map((_, index) => <span key={index}>★</span>)}</div>
                <p className="mt-6 font-display text-xl leading-snug text-champagne">“{review.quote}”</p>
                <div className="mt-7 flex items-center justify-between border-t border-border pt-4"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">{review.name}</span><span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{review.label}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-y border-border bg-ink-soft py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[0.7fr_1.3fr] lg:px-12">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Before you arrive</p><h2 className="mt-3 font-display text-4xl text-champagne sm:text-5xl">Common questions</h2></div>
          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-semibold text-champagne"><span>{faq.question}</span><ChevronDown size={18} className="shrink-0 text-gold transition-transform group-open:rotate-180" /></summary>
                <p className="max-w-2xl pt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-20 bg-gold py-20 text-ink sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1fr_0.8fr] md:items-end lg:px-12">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/70">Your next reset</p><h2 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] sm:text-7xl">Request your private session.</h2><p className="mt-6 max-w-md text-sm leading-7 text-ink/75">Share a few details and choose the channel that feels easiest. Your message will be ready to send.</p></div>
          <div className="rounded-lg border border-ink/20 bg-cream/20 p-6"><div className="flex items-center justify-between border-b border-ink/20 pb-4"><span className="text-[10px] font-bold uppercase tracking-[0.2em]">Fastest route</span><Send size={16} /></div><p className="mt-5 font-display text-2xl leading-tight">WhatsApp, Telegram, or SMS.</p><button type="button" onClick={() => openBooking()} className="mt-7 flex w-full items-center justify-between rounded-full bg-ink px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-champagne transition-transform hover:scale-[1.02]">Open quote form <ArrowUpRight size={16} /></button></div>
        </div>
      </section>

      <footer className="border-t border-border bg-ink px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div><Logo /><p className="mt-5 max-w-xs text-xs leading-6 text-muted-foreground">Premium therapeutic massage arranged privately and thoughtfully.</p></div>
          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:items-end"><a href="tel:+17022767481" className="flex items-center gap-2 transition-colors hover:text-gold"><Phone size={14} /> +1 702 276 7481</a><a href="https://t.me/StellaInSilk" className="flex items-center gap-2 transition-colors hover:text-gold"><Send size={14} /> @StellaInSilk</a><span>© {new Date().getFullYear()} Stella Massage Spa</span></div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-champagne/15 bg-ink/90 p-3 backdrop-blur-lg md:hidden"><button type="button" onClick={() => openBooking()} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink">Request a quote <ArrowUpRight size={15} /></button></div>

      {bookingOpen && <BookingModal selectedService={selectedService} setSelectedService={setSelectedService} channel={channel} setChannel={setChannel} sent={sent} onClose={() => setBookingOpen(false)} onSubmit={handleBooking} />}
    </main>
  );
}

function BookingModal({ selectedService, setSelectedService, channel, setChannel, sent, onClose, onSubmit }: { selectedService: string; setSelectedService: (value: string) => void; channel: ContactChannel; setChannel: (value: ContactChannel) => void; sent: boolean; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-ink-panel p-5 shadow-2xl sm:rounded-lg sm:p-8">
        <div className="flex items-start justify-between gap-6 border-b border-border pb-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Private booking</p><h2 id="booking-title" className="mt-2 font-display text-4xl text-champagne">Request a quote.</h2></div><button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full border border-border text-champagne transition-colors hover:border-gold hover:text-gold" aria-label="Close booking form"><X size={18} /></button></div>
        {sent ? <div className="py-16 text-center"><div className="mx-auto grid size-14 place-items-center rounded-full border border-success/50 text-success"><Check size={24} /></div><h3 className="mt-6 font-display text-3xl text-champagne">Your message is ready.</h3><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Your selected contact channel should open with your booking details. Stella can confirm the next available time directly.</p><button type="button" onClick={onClose} className="mt-8 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink">Close form</button></div> : <form onSubmit={onSubmit} className="grid gap-5 pt-6 sm:grid-cols-2"><label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Your name<input required name="name" placeholder="Full name" className="rounded-md border border-input bg-ink px-4 py-3 text-sm font-normal normal-case tracking-normal text-champagne outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-ring" /></label><label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Service<select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} className="rounded-md border border-input bg-ink px-4 py-3 text-sm font-normal normal-case tracking-normal text-champagne outline-none focus:border-gold focus:ring-2 focus:ring-ring">{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></label><label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Session<select name="duration" className="rounded-md border border-input bg-ink px-4 py-3 text-sm font-normal normal-case tracking-normal text-champagne outline-none focus:border-gold focus:ring-2 focus:ring-ring"><option>60 minutes</option><option>90 minutes</option></select></label><label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Preferred date<input name="date" type="date" className="rounded-md border border-input bg-ink px-4 py-3 text-sm font-normal normal-case tracking-normal text-champagne outline-none focus:border-gold focus:ring-2 focus:ring-ring" /></label><label className="grid gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:col-span-2">Booking note<textarea name="note" rows={3} placeholder="Areas of focus, preferred time, or anything Stella should know" className="resize-none rounded-md border border-input bg-ink px-4 py-3 text-sm font-normal normal-case tracking-normal text-champagne outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-ring" /></label><fieldset className="sm:col-span-2"><legend className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Send through</legend><div className="mt-2 grid gap-2 sm:grid-cols-3">{([{ value: "whatsapp", label: "WhatsApp", icon: MessageCircle }, { value: "telegram", label: "Telegram", icon: Send }, { value: "sms", label: "SMS", icon: MessageSquare }] as const).map((item) => { const Icon = item.icon; return <button key={item.value} type="button" onClick={() => setChannel(item.value)} className={channel === item.value ? "flex items-center justify-center gap-2 rounded-md border border-gold bg-gold px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink" : "flex items-center justify-center gap-2 rounded-md border border-border px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] text-champagne transition-colors hover:border-gold hover:text-gold"}><Icon size={15} /> {item.label}</button>; })}</div></fieldset><button type="submit" className="sm:col-span-2 flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-transform hover:scale-[1.01]">Prepare my message <ArrowUpRight size={16} /></button><p className="sm:col-span-2 text-center text-[10px] leading-5 text-muted-foreground">Your message opens in the selected app. No payment is taken on this form.</p></form>}
      </div>
    </div>
  );
}