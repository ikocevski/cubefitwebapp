import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { id: "features", label: "Features" },
  { id: "coach", label: "For coaches" },
  { id: "client", label: "For clients" },
  { id: "meal-import", label: "Meal import" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const mealImportColumns = [
  "name",
  "description",
  "calories",
  "protein",
  "carbs",
  "fats",
  "ingredients",
  "image_url",
  "assigned_to_client_id",
];

const mealImportPreviewRow =
  'Greek Yogurt Berry Bowl,High-protein breakfast with berries,320,28,36,7,"Greek yogurt; mixed berries; granola; honey",,';

const faqs = [
  {
    q: "Who is CubeFit built for?",
    a: "CubeFit is built for personal trainers, studio owners, and coaches who want structured training, nutrition, and measurable client progress in one premium system.",
  },
  {
    q: "Can coaches manage both workouts and nutrition?",
    a: "Yes. Coaches build, edit, and assign workout plans and diet plans — meals, macros, calorie targets — all from the same dashboard.",
  },
  {
    q: "How does progress tracking work?",
    a: "Clients log bodyweight in two taps. Coaches see weekly trend snapshots, moving averages, and adherence analytics for every client.",
  },
  {
    q: "Does CubeFit support reminders?",
    a: "Yes. The scheduler auto-notifies clients with push notifications for every session, check-in, and habit nudge — no manual reminder texting.",
  },
  {
    q: "Can I bulk import meals into CubeFit?",
    a: "Yes. Download the CubeFit meal template, fill in meal data as CSV, and upload to populate your nutrition library in seconds.",
  },
  {
    q: "How does subscription access work?",
    a: "CubeFit supports trial, active, and expired states with premium gated access. Pick the tier that fits your roster size — change anytime from inside the app.",
  },
];

const stats = [
  { num: "4", unit: "×", lbl: "More clients per trainer" },
  { num: "11", unit: "h", lbl: "Saved every week" },
  { num: "30+", unit: "", lbl: "Meals in your library" },
  { num: "14", unit: "d", lbl: "Free, no card required" },
];

const coachFeatures = [
  "Client roster with at-a-glance status",
  "Session scheduler with auto-notify",
  "Meal & workout plan builder",
  "Subscription billing & analytics",
];

const clientFeatures = [
  "Personal workout & diet feed",
  "Daily weight log + history graph",
  "Streak counter & gentle nudges",
  "Direct messaging with their coach",
];

const featureSections = [
  {
    id: "dashboard",
    reverse: false,
    accent: "indigo",
    eyebrow: "Coach dashboard",
    title: "Your whole roster, one tap away.",
    lede: "Open CubeFit and see exactly where every client stands — active count, what's next on your calendar, and the quick actions to push your day forward.",
    points: [
      {
        icon: "users",
        title: "Live client count",
        body: "See every active client and their last activity without leaving the home screen.",
      },
      {
        icon: "calendar",
        title: "Up-next queue",
        body: "Tomorrow's sessions, this afternoon's check-ins — surfaced before you have to think about them.",
      },
      {
        icon: "bolt",
        title: "Quick actions",
        body: "Schedule, bill, or jump into a client profile in one tap from the dashboard.",
      },
    ],
    chips: [
      {
        pos: { top: "60px", left: "-10px" },
        ico: "indigo",
        icon: "dot",
        sub: "Status",
        text: "4 active clients",
      },
      {
        pos: { bottom: "80px", right: "-20px" },
        ico: "orange",
        icon: "clock",
        sub: "Next session",
        text: "Today, 18:35",
      },
    ],
    image: { src: "/screens/coach-dashboard.png", alt: "CubeFit Coach Dashboard with quick actions" },
  },
  {
    id: "scheduler",
    reverse: true,
    accent: "indigo",
    eyebrow: "Session scheduler",
    title: "Book a session. Notify the client. Done.",
    lede: "Pick the client, the time, the duration — CubeFit handles the calendar invite, the reminder, and the push notification. No more \"did we say 6 or 6:30?\" texts.",
    points: [
      {
        icon: "bell",
        title: "Auto-notify on book",
        body: "\"Schedule + Notify\" sends the client a push notification with the session details the moment you confirm.",
      },
      {
        icon: "clock",
        title: "Custom duration",
        body: "15, 30, 60, 90 minutes — or whatever you charge for. Save defaults per client.",
      },
      {
        icon: "check",
        title: "Client picker",
        body: "One-tap roster scroll. Recurring clients sit at the top.",
      },
    ],
    chips: [
      {
        pos: { top: "50px", right: "-10px" },
        ico: "indigo",
        icon: "check-circle",
        sub: "Client notified",
        text: "Marin · 18:35",
      },
    ],
    image: { src: "/screens/schedule-session.png", alt: "Schedule Session modal with client picker and date/time" },
  },
  {
    id: "meals",
    reverse: false,
    accent: "coral",
    eyebrow: "Meal library",
    title: "A meal library that scales with your roster.",
    lede: "Build it once. Assign it forever. Every meal carries its calories, macros, ingredients, and category — so you can mix-and-match plans for each client in seconds.",
    points: [
      {
        icon: "plus",
        title: "Create or import",
        body: "Add a meal manually or import a CSV. The library deduplicates and tags for you.",
      },
      {
        icon: "chart",
        title: "Macros on every card",
        body: "Calories, protein, carbs, fats — calculated and displayed so swapping a meal in a plan stays on-target.",
      },
      {
        icon: "users",
        title: "See who has what",
        body: "Each meal shows the number of clients assigned, so you know what's pulling weight in your roster.",
      },
    ],
    chips: [
      {
        pos: { top: "80px", right: "-20px" },
        ico: "coral",
        icon: "star",
        sub: "Library size",
        text: "30 meals · 4 categories",
      },
      {
        pos: { bottom: "90px", left: "-10px" },
        ico: "orange",
        icon: "check-bold",
        sub: "Veggie wrap",
        text: "360 kcal · 12g protein",
      },
    ],
    image: { src: "/screens/diets.png", alt: "Manage Diets screen with Veggie Wrap meal card" },
  },
  {
    id: "composer",
    reverse: true,
    accent: "coral",
    eyebrow: "Meal plan composer",
    title: "Auto-balance macros to hit any calorie target.",
    lede: "Set the daily calorie goal. Slide protein, carbs, and fats. CubeFit recalculates the others in real time so the math is always right — not approximately right.",
    points: [
      {
        icon: "sliders",
        title: "Three live sliders",
        body: "Protein, carbs, fats — each with calorie totals and grams shown next to the handle.",
      },
      {
        icon: "pulse",
        title: "Real-time totals",
        body: "Plan name, daily target, macro split — every change reflects instantly with no save-and-refresh dance.",
      },
      {
        icon: "doc",
        title: "Save as template",
        body: "Fat-loss, lean bulk, cut prep — save your favorite splits as reusable starting points.",
      },
    ],
    chips: [
      {
        pos: { top: "70px", left: "-20px" },
        ico: "orange",
        icon: "dot",
        sub: "Calorie target",
        text: "2,500 kcal / day",
      },
    ],
    image: { src: "/screens/create-meal-plan.png", alt: "Create Meal Plan with protein/carbs/fats sliders" },
  },
  {
    id: "weight",
    reverse: false,
    accent: "indigo",
    eyebrow: "Weight tracking",
    title: "Log every kilogram. Watch the trend.",
    lede: "Clients log weight in two taps — pick the date, drop the number. CubeFit charts the trend, calculates moving averages, and shows you exactly where the plan is working.",
    points: [
      {
        icon: "trend",
        title: "kg or lbs",
        body: "Switch units per client. We convert and store the canonical value so your charts never break.",
      },
      {
        icon: "clock",
        title: "Backfill any date",
        body: "Missed a Monday? Pick the date and log it. The history graph reflects it without messing up the streak.",
      },
      {
        icon: "bolt",
        title: "Streaks & nudges",
        body: "Daily streak counter on the home screen. Skipped a day? A gentle reminder, never a guilt trip.",
      },
    ],
    chips: [
      {
        pos: { top: "100px", right: "-20px" },
        ico: "indigo",
        icon: "trend-down",
        sub: "7-day trend",
        text: "−1.4 kg",
      },
      {
        pos: { bottom: "100px", left: "-30px" },
        ico: "orange",
        icon: "bolt-solid",
        sub: "Streak",
        text: "0 days · start today",
      },
    ],
    image: { src: "/screens/weight-log.png", alt: "Log or Edit Weight modal with date and unit picker" },
  },
];

const modules = [
  {
    icon: "users",
    accent: "indigo",
    title: "Client manager",
    body: "One profile per client. Goals, plans, notes, photos, and history — all in one tap.",
  },
  {
    icon: "book",
    accent: "coral",
    title: "Diet planner",
    body: "Library, plans, macros — the full nutrition stack with auto-balancing math built in.",
  },
  {
    icon: "dumbbell",
    accent: "orange",
    title: "Workout builder",
    body: "Drag-and-drop exercise blocks, set rep schemes, attach video demos for every move.",
  },
  {
    icon: "calendar",
    accent: "indigo",
    title: "Scheduler",
    body: "Book sessions, send reminders, manage recurring slots — with automatic push notifications.",
  },
  {
    icon: "chart-up",
    accent: "coral",
    title: "Progress charts",
    body: "Weight, body comp, strength PRs — charted automatically, exportable for client reviews.",
  },
  {
    icon: "card",
    accent: "orange",
    title: "Subscription billing",
    body: "Tiered plans for your roster size. Auto-renew, cancel anytime, all from inside the app.",
  },
];

const tiers = [
  { name: "Starter", sub: "Up to 5 clients", price: "$29.99", featured: false },
  { name: "Pro", sub: "5–10 clients", price: "$44.99", featured: true },
  { name: "Elite", sub: "10–15 clients", price: "$59.99", featured: false },
];

const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "For trainers",
    links: [
      { label: "Coach guide", href: "#" },
      { label: "Template library", href: "#" },
      { label: "Community", href: "#" },
      { label: "Help center", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

function Arrow({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function Icon({ name, size = 14, stroke = 2 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  switch (name) {
    case "users":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "bolt-solid":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "check-bold":
      return (
        <svg {...props} strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...props} strokeWidth="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      );
    case "chart-up":
      return (
        <svg {...props}>
          <polyline points="3 12 8 7 13 12 21 4" />
          <polyline points="15 4 21 4 21 10" />
        </svg>
      );
    case "trend":
      return (
        <svg {...props}>
          <path d="M3 17l6-6 4 4 8-8" />
          <polyline points="14 7 21 7 21 14" />
        </svg>
      );
    case "trend-down":
      return (
        <svg {...props} strokeWidth="2.5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...props}>
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...props}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2z" />
        </svg>
      );
    case "dumbbell":
      return (
        <svg {...props}>
          <path d="M6.5 6.5l11 11" />
          <path d="M21 21l-1-1" />
          <path d="M3 3l1 1" />
          <path d="M18 22l4-4" />
          <path d="M2 6l4-4" />
          <path d="M3 10l7-7" />
          <path d="M14 21l7-7" />
        </svg>
      );
    case "card":
      return (
        <svg {...props}>
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case "dot":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
        </svg>
      );
    default:
      return null;
  }
}

function BrandMark({ size = 28 }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lgCoral" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff6a4a" />
          <stop offset="100%" stopColor="#d83a23" />
        </linearGradient>
        <linearGradient id="lgIndigo" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#7a7bff" />
          <stop offset="100%" stopColor="#3d3eb8" />
        </linearGradient>
        <linearGradient id="lgOrange" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffa05e" />
          <stop offset="100%" stopColor="#e36a18" />
        </linearGradient>
      </defs>
      <polygon points="50,8 88,30 50,52 12,30" fill="url(#lgCoral)" />
      <polygon points="50,52 88,30 88,74 50,96" fill="url(#lgIndigo)" />
      <polygon points="50,52 50,96 12,74 12,30" fill="url(#lgOrange)" />
    </svg>
  );
}

function PhoneFrame({ src, alt }) {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}

function FeatureBlock({ data, tight }) {
  return (
    <section className={tight ? "section-tight" : "section-stack"}>
      <div className="wrap">
        <div className={`feature${data.reverse ? " reverse" : ""}`} data-reveal>
          <div className="feature-copy">
            <span className={`eyebrow ${data.accent}`}>
              <span className="dot" />
              {data.eyebrow}
            </span>
            <h2>{data.title}</h2>
            <p className="lede">{data.lede}</p>
            <ul className="feature-points">
              {data.points.map((point, i) => (
                <li key={point.title} data-reveal-child style={{ "--reveal-delay": `${i * 80}ms` }}>
                  <span className={`ico ${data.accent}`}>
                    <Icon name={point.icon} />
                  </span>
                  <div>
                    <strong>{point.title}</strong>
                    <span className="body">{point.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={`feature-vis ${data.accent}-glow`}>
            <div className="glow" />
            {data.chips.map((chip, i) => (
              <div key={i} className="chip" style={chip.pos}>
                <span className={`chip-ico ${chip.ico}`}>
                  <Icon name={chip.icon} />
                </span>
                <div>
                  <div className="chip-sub">{chip.sub}</div>
                  <div>{chip.text}</div>
                </div>
              </div>
            ))}
            <PhoneFrame src={data.image.src} alt={data.image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            const children = entry.target.querySelectorAll("[data-reveal-child]");
            children.forEach((child, idx) => {
              if (!child.style.getPropertyValue("--reveal-delay")) {
                child.style.setProperty("--reveal-delay", `${idx * 80}ms`);
              }
              child.classList.add("is-visible");
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    document.querySelectorAll("[data-reveal-child]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const selector = ".split-card, .module, .tier, .feature-vis, .cta";
    const handler = (event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => el.addEventListener("pointermove", handler));
    return () => elements.forEach((el) => el.removeEventListener("pointermove", handler));
  }, []);

  return (
    <>
      <div className="grain" />

      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <BrandMark />
            <span>CubeFit</span>
          </div>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <a href="#cta" className="nav-cta">
              Get the app
              <Arrow />
            </a>
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen ? (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <aside
            id="mobile-navigation"
            className="mobile-nav-panel"
            aria-label="Mobile primary navigation"
          >
            <div className="mobile-nav-panel-header">
              <div className="brand">
                <BrandMark size={24} />
                <span>Menu</span>
              </div>
              <button
                type="button"
                className="mobile-nav-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>
            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
              <a href="#cta" className="btn-primary" onClick={closeMenu}>
                Get the app
                <Arrow size={16} />
              </a>
            </nav>
          </aside>
        </>
      ) : null}

      <header className="hero">
        <div className="hero-bg" />
        <div className="wrap hero-inner">
          <div data-reveal>
            <div className="hero-tag">
              <span className="pill">NEW</span>
              Built for the modern personal trainer
            </div>
            <h1>
              Coach more.
              <br />
              <span className="accent-coral">Admin</span> less.
              <br />
              Grow your <span className="accent-indigo">studio</span>.
            </h1>
            <p className="hero-sub">
              CubeFit is the all-in-one platform where trainers build meal plans, program workouts,
              schedule sessions, and track every client — from a single dashboard on your phone.
            </p>
            <div className="hero-ctas">
              <a href="#cta" className="btn-primary">
                Start 14-day free trial
                <Arrow size={16} />
              </a>
              <a href="#features" className="btn-secondary">
                See it in action
              </a>
            </div>
            <div className="hero-trust">
              <div className="stack">
                <span className="avatar a1">IK</span>
                <span className="avatar a2">MP</span>
                <span className="avatar a3">MI</span>
                <span className="avatar a4">+4</span>
              </div>
              <span>
                Trusted by trainers managing <strong>2,400+ clients</strong>
              </span>
            </div>
          </div>

          <div className="hero-phones" data-reveal>
            <div className="hero-glow-coral" />
            <div className="hero-glow-indigo" />
            <div className="phone hero-phone-1">
              <div className="phone-notch" />
              <div className="phone-screen">
                <img src="/screens/login.png" alt="CubeFit app login screen" />
              </div>
            </div>
            <div className="phone hero-phone-2">
              <div className="phone-notch" />
              <div className="phone-screen">
                <img
                  src="/screens/coach-dashboard.png"
                  alt="Coach dashboard showing 4 active clients and 3 upcoming sessions"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div className="stat-strip" data-reveal>
            {stats.map((stat, i) => (
              <div key={stat.lbl} data-reveal-child style={{ "--reveal-delay": `${i * 80}ms` }}>
                <div className="stat-num">
                  {stat.num}
                  {stat.unit && <span className="unit">{stat.unit}</span>}
                </div>
                <div className="stat-lbl">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section id="features">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              <span className="dot" />
              One app, two perspectives
            </span>
            <h2 className="section-title">
              Built for the <em>coach.</em>
              <br />
              Loved by the <em>client.</em>
            </h2>
            <p className="section-lede">
              CubeFit gives trainers a full operations toolkit and gives their clients a beautiful,
              lightweight space to log and learn — no two-product rollout, no separate dashboards.
            </p>
          </div>

          <div className="split">
            <div className="split-card coach" id="coach" data-reveal>
              <span className="eyebrow indigo">
                <span className="dot" />
                For the coach
              </span>
              <h3>Run your studio from your pocket.</h3>
              <p>
                Onboard clients, program workouts, write diet plans, and book sessions — without
                spreadsheets, WhatsApp threads, or a desk.
              </p>
              <ul className="split-features">
                {coachFeatures.map((item, i) => (
                  <li key={item} data-reveal-child style={{ "--reveal-delay": `${i * 60}ms` }}>
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="split-card client" id="client" data-reveal>
              <span className="eyebrow coral">
                <span className="dot" />
                For the client
              </span>
              <h3>Every plan, every win — in one place.</h3>
              <p>
                Clients see today's workout, this week's meal plan, and their weight journey on a
                single screen. Streaks keep them showing up.
              </p>
              <ul className="split-features">
                {clientFeatures.map((item, i) => (
                  <li key={item} data-reveal-child style={{ "--reveal-delay": `${i * 60}ms` }}>
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {featureSections.map((data, i) => (
        <FeatureBlock key={data.id} data={data} tight={i === 0} />
      ))}

      <section className="section-modules">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              <span className="dot" />
              The full toolkit
            </span>
            <h2 className="section-title">
              Every module a personal
              <br />
              trainer actually uses.
            </h2>
          </div>

          <div className="modules">
            {modules.map((mod, i) => (
              <div key={mod.title} className="module" data-reveal-child style={{ "--reveal-delay": `${i * 80}ms` }}>
                <div className={`module-ico ${mod.accent}`}>
                  <Icon name={mod.icon} size={22} />
                </div>
                <h4>{mod.title}</h4>
                <p>{mod.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="meal-import" className="section-stack">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow coral">
              <span className="dot" />
              Nutrition import system
            </span>
            <h2 className="section-title">
              Build your meal library in <em>minutes,</em>
              <br />
              not weeks.
            </h2>
            <p className="section-lede">
              Download the official CubeFit meal template, fill in macros and ingredients, and
              upload to populate your nutrition library instantly — no manual entry.
            </p>
          </div>

          <div className="import-grid">
            <article className="split-card coach" data-reveal>
              <span className="eyebrow coral">
                <span className="dot" />
                CSV template
              </span>
              <h3>Import in minutes.</h3>
              <p>
                Coaches download the official meal template, map structured fields, and upload
                complete nutrition libraries without manual entry bottlenecks.
              </p>
              <ol className="import-list">
                <li>Download the CubeFit CSV template.</li>
                <li>Fill rows with meals, macros, calories, and ingredients.</li>
                <li>Upload in the app to populate your meal library instantly.</li>
                <li>Assign imported meals into diet plans for clients.</li>
              </ol>
              <div className="hero-ctas" style={{ marginTop: "28px" }}>
                <a
                  className="btn-primary"
                  href="/templates/cubefit-meal-import-template.csv"
                  download
                >
                  Download meal template
                  <Arrow size={16} />
                </a>
                <a className="btn-secondary" href="#meals">
                  View meal library
                </a>
              </div>
            </article>

            <article className="split-card client schema-card" data-reveal>
              <span className="eyebrow coral">
                <span className="dot" />
                Schema preview
              </span>
              <h3>One canonical row format.</h3>
              <p>
                The import schema keeps nutrition data consistent across the coach dashboard and
                client-facing meal cards.
              </p>
              <p className="schema-label">Required header order</p>
              <code className="schema-code">{mealImportColumns.join(",")}</code>
              <p className="schema-label">Sample row</p>
              <code className="schema-code">{mealImportPreviewRow}</code>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow indigo">
              <span className="dot" />
              Pricing
            </span>
            <h2 className="section-title">
              Pick the plan that
              <br />
              fits your roster.
            </h2>
            <p className="section-lede">
              All tiers include unlimited workout plans, unlimited meal plans, video upload support,
              basic analytics, and email support. The only thing that changes is how many clients
              you can run at once.
            </p>
          </div>

          <div className="pricing-wrap">
            <div className="pricing-tiers" data-reveal>
              {tiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`tier${tier.featured ? " featured" : ""}`}
                  data-reveal-child
                  style={{ "--reveal-delay": `${i * 80}ms` }}
                >
                  {tier.featured && <span className="tier-badge">MOST POPULAR</span>}
                  <div>
                    <div className="tier-name">{tier.name}</div>
                    <div className="tier-sub">{tier.sub}</div>
                  </div>
                  <div className="tier-price">
                    {tier.price}
                    <span className="month">per month</span>
                  </div>
                </div>
              ))}
              <div className="pricing-note">
                Start with a <strong>14-day free trial</strong> on any tier — no card required.
                Cancel anytime from inside the app.
              </div>
            </div>

            <div className="feature-vis indigo-glow" style={{ minHeight: "620px" }} data-reveal>
              <div className="glow" />
              <div className="phone" style={{ width: "300px" }}>
                <div className="phone-notch" />
                <div className="phone-screen">
                  <img src="/screens/plans.png" alt="Subscription tiers in the CubeFit app" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              <span className="dot" />
              FAQ
            </span>
            <h2 className="section-title">
              Clear answers for <em>coaches,</em>
              <br />
              clients, and stakeholders.
            </h2>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                className="faq-card"
                data-reveal-child
                style={{ "--reveal-delay": `${i * 60}ms` }}
              >
                <summary>
                  <span>{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <Icon name="plus" size={16} stroke={2.5} />
                  </span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="section-cta">
        <div className="cta" data-reveal>
          <span className="eyebrow">
            <span className="dot" />
            Stop juggling tools
          </span>
          <h2>
            Run your studio from <em>one app.</em>
          </h2>
          <p>
            Sign up in under a minute. Import your clients, plug in your meal library, and book your
            first session today.
          </p>
          <div className="hero-ctas">
            <a href="#" className="btn-primary">
              Start free trial
              <Arrow size={16} />
            </a>
            <a href="#" className="btn-secondary">
              <AppleGlyph />
              Download for iOS
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-inner">
            <div>
              <div className="brand" style={{ marginBottom: "14px" }}>
                <BrandMark />
                <span>CubeFit</span>
              </div>
              <p className="footer-blurb">
                The operating system for personal trainers. Meals, workouts, sessions — one app.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title} className="footer-col">
                <h5>{col.title}</h5>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 CubeFit. All rights reserved.</span>
            <span className="footer-tag">v1.4 · BUILT WITH ♥ FOR COACHES</span>
          </div>
        </div>
      </footer>
    </>
  );
}
