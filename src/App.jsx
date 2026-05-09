import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { id: "how-it-works", label: "How It Works" },
  { id: "coach-admin", label: "Coach Tools" },
  { id: "client-experience", label: "Client App" },
  { id: "workouts", label: "Workouts" },
  { id: "nutrition", label: "Nutrition" },
  { id: "meal-import", label: "Meal Import" },
  { id: "progress", label: "Progress" },
  { id: "screens", label: "Screens" },
  { id: "faq", label: "FAQ" },
];

const coachTools = [
  "Dashboard overview with active clients, compliance, and risk flags",
  "Add and manage clients with onboarding and approval control",
  "Create, edit, and assign workout plans with day-by-day structure",
  "Build diet plans, add meals, set macro and calorie targets",
  "Bulk import meals from CSV template to accelerate nutrition setup",
  "Monitor weekly progress snapshots and weight log trends",
  "Subscription and user management with role-based access controls",
];

const clientTools = [
  "Home dashboard with today’s plan, reminders, and key metrics",
  "Assigned workouts with exercise videos, sets, reps, and rest guidance",
  "Assigned meal plans with meal cards, macro totals, and calorie clarity",
  "Weight logging with weekly trend view and coach visibility",
  "Profile view with progress milestones and plan completion status",
  "Notification awareness for training, check-ins, and nutrition timing",
];

const FeatureIcon = ({ name }) => {
  const paths = {
    workouts: (
      <>
        <path d="M6 12h12" />
        <path d="M4 9v6" />
        <path d="M20 9v6" />
        <path d="M8 7v10" />
        <path d="M16 7v10" />
      </>
    ),
    nutrition: (
      <>
        <path d="M12 3c4 2 6 5 6 9a6 6 0 1 1-12 0c0-4 2-7 6-9z" />
        <path d="M12 8v6" />
        <path d="M9 11h6" />
      </>
    ),
    progress: (
      <>
        <path d="M3 17l5-5 4 4 8-8" />
        <path d="M14 8h6v6" />
      </>
    ),
    notifications: (
      <>
        <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </>
    ),
    subscriptions: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </>
    ),
    analytics: (
      <>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20H2" />
      </>
    ),
  };
  return (
    <span className="feature-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{paths[name]}</svg>
    </span>
  );
};

const featureGrid = [
  {
    id: "workouts",
    title: "Workout System",
    description:
      "Structured plans, exercise libraries, video demonstrations, and assignment logic designed for precise coach-to-client execution.",
    points: [
      "Plan templates",
      "Workout days",
      "Set/rep/rest logic",
      "Completion status",
    ],
  },
  {
    id: "nutrition",
    title: "Diet & Meals",
    description:
      "Build meal-based plans with calorie targets, macro breakdowns, and clear client-facing nutrition cards that keep adherence high.",
    points: [
      "Meal assignment",
      "Macro display",
      "Calorie targets",
      "Plan-level totals",
    ],
  },
  {
    id: "progress",
    title: "Progress & Weight",
    description:
      "Track weekly weight trends and visualize momentum with clean charts that compare current performance against previous periods.",
    points: [
      "Weight logs",
      "Weekly graph",
      "Trend direction",
      "Coach + client visibility",
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    description:
      "Reminder scheduling keeps training and nutrition routines consistent through subtle, timely iPhone notification flows.",
    points: [
      "Session reminders",
      "Alert timing",
      "Habit support",
      "On-track consistency",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscription Access",
    description:
      "Supports trial, active, and expired states with premium gated access while keeping coach/admin workflows uninterrupted.",
    points: [
      "Trial mode",
      "Paywall concept",
      "Access states",
      "Admin exemptions",
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description:
      "Surface adherence, progress pace, and client health indicators so coaches can intervene early and scale high-touch coaching.",
    points: [
      "Compliance metrics",
      "Progress summaries",
      "Client segmentation",
      "Outcome insights",
    ],
  },
];

const screenGallery = [
  {
    src: "/screens/login.png",
    title: "Login",
    audience: "Client + Coach",
    description: "Branded sign-in with role-based handoff.",
  },
  {
    src: "/screens/coach-dashboard.png",
    title: "Coach Dashboard",
    audience: "Coach / Admin",
    description: "Clients, upcoming sessions, and quick actions.",
  },
  {
    src: "/screens/schedule-session.png",
    title: "Schedule Session",
    audience: "Coach / Admin",
    description: "Book sessions and notify clients.",
  },
  {
    src: "/screens/plans.png",
    title: "Subscription Plans",
    audience: "Coach / Admin",
    description: "Choose the plan that fits your business.",
  },
  {
    src: "/screens/diets.png",
    title: "Manage Diets",
    audience: "Coach / Admin",
    description: "Build a meal library and assign plans to clients.",
  },
  {
    src: "/screens/create-meal-plan.png",
    title: "Create Meal Plan",
    audience: "Coach / Admin",
    description: "Set calorie targets and adjust macronutrients.",
  },
  {
    src: "/screens/weight-log.png",
    title: "Log or Edit Weight",
    audience: "Client",
    description: "Pick a date and save your weight.",
  },
];

const faqs = [
  {
    q: "Who is CubeFit built for?",
    a: "CubeFit is built for coaches, trainers, and serious clients who want structured training, nutrition, and measurable progress in one premium system.",
  },
  {
    q: "Can coaches manage both workouts and nutrition?",
    a: "Yes. Coaches can create, edit, and assign workout plans and diet plans, including meals, macros, and calorie targets per plan.",
  },
  {
    q: "How does progress tracking work?",
    a: "Clients log bodyweight and plan completion, while coaches see weekly trend snapshots, direction indicators, and adherence analytics.",
  },
  {
    q: "Does CubeFit support reminders?",
    a: "Yes. Reminder schedules trigger clear iPhone notification messaging for training sessions, check-ins, and habit consistency.",
  },
  {
    q: "Can I bulk import meals into CubeFit?",
    a: "Yes. Coaches can download the CubeFit meal template, fill meal data in CSV format, and import meals in bulk into the nutrition library.",
  },
  {
    q: "How does subscription access work?",
    a: "CubeFit supports trial, active, and expired subscription states with premium access logic, while admin and coach workflows stay uninterrupted.",
  },
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    // Stagger reveal delays for direct grid children
    document.querySelectorAll("[data-reveal-child]").forEach((child) => {
      const peers = [
        ...child.parentElement.querySelectorAll(":scope > [data-reveal-child]"),
      ];
      const idx = peers.indexOf(child);
      child.style.setProperty("--reveal-delay", `${Math.max(idx, 0) * 70}ms`);
    });

    return () => observer.disconnect();
  }, []);

  // Mouse-tracked spotlight glow on cards
  useEffect(() => {
    const cards = document.querySelectorAll(
      ".panel, .comparison-card, .feature-card, .screen-card, .faq-card, .video-panel, .cta, .pill-card, .glass-card",
    );

    const onMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      event.currentTarget.style.setProperty("--mx", `${x}%`);
      event.currentTarget.style.setProperty("--my", `${y}%`);
    };

    cards.forEach((card) => card.addEventListener("pointermove", onMove));
    return () => {
      cards.forEach((card) => card.removeEventListener("pointermove", onMove));
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand-mark" aria-label="CubeFit home">
          <img
            className="brand-logo"
            src="/2.png"
            alt="CubeFit logo"
            width="34"
            height="34"
          />
          <span>CUBEFIT</span>
        </a>
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

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
              <div className="mobile-nav-brand">
                <img
                  className="brand-logo"
                  src="/2.png"
                  alt="CubeFit logo"
                  width="30"
                  height="30"
                />
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
            </nav>
          </aside>
        </>
      ) : null}

      <main id="top">
        <section className="hero" data-reveal>
          <p className="eyebrow">Premium Coach-Client Performance Platform</p>
          <h1>
            Train with structure. Coach with clarity. Progress with proof.
          </h1>
          <p className="hero-sub">
            CubeFit unifies workouts, nutrition, weight tracking, reminders, and
            subscription access into one premium coaching operating system.
          </p>
          <div className="hero-cta-group">
            <a href="#screens" className="btn">
              Explore Product Screens
            </a>
            <a href="#how-it-works" className="btn btn-ghost">
              See How It Works
            </a>
          </div>

          <div className="hero-grid" aria-label="CubeFit previews">
            <article className="glass-card mockup" data-reveal-child>
              <p className="card-tag">Coach Command</p>
              <h3>Dashboard Overview</h3>
              <p>
                Active clients, plan adherence, weekly risks, and revenue state
                in one high-clarity control panel.
              </p>
            </article>
            <article className="glass-card mockup accent" data-reveal-child>
              <p className="card-tag">Client Execution</p>
              <h3>Daily Training View</h3>
              <p>
                Assigned session flow with exercise video, set/reps/rest
                structure, and completion confidence.
              </p>
            </article>
            <article className="glass-card mockup" data-reveal-child>
              <p className="card-tag">Nutrition Precision</p>
              <h3>Meal & Macro Cards</h3>
              <p>
                Plan-based meals, calories, macros, and timing cues designed for
                adherence without friction.
              </p>
            </article>
          </div>
        </section>

        <section id="how-it-works" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">How It Works</p>
            <h2>
              Two-sided coaching architecture, one seamless product experience.
            </h2>
          </div>
          <div className="split-grid">
            <article className="panel" data-reveal-child>
              <h3>Coach / Admin Flow</h3>
              <p>
                Configure system access, onboard members, assign plans, and
                monitor outcomes from a single command layer.
              </p>
              <ol>
                <li>Approve user access and complete onboarding.</li>
                <li>Create workout and diet plans with reusable libraries.</li>
                <li>Assign plans to clients and schedule reminders.</li>
                <li>Analyze weight, adherence, and weekly progress data.</li>
              </ol>
            </article>
            <article className="panel" data-reveal-child>
              <h3>Client Flow</h3>
              <p>
                Receive structured plans, execute daily actions, log progress,
                and stay accountable through reminders and coaching visibility.
              </p>
              <ol>
                <li>Sign up, select role, and complete profile details.</li>
                <li>Access assigned workouts and meal plans.</li>
                <li>Log weight weekly and monitor progress direction.</li>
                <li>
                  Stay consistent with reminders and clear daily priorities.
                </li>
              </ol>
            </article>
          </div>
        </section>

        <section id="coach-admin" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Coach Dashboard & Admin Tools</p>
            <h2>Built for high-touch coaching at scale.</h2>
          </div>
          <div className="pill-grid">
            {coachTools.map((item) => (
              <article key={item} className="pill-card" data-reveal-child>
                <span className="status-dot" aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="client-experience" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Client Experience</p>
            <h2>Designed for disciplined execution, not guesswork.</h2>
          </div>
          <div className="pill-grid">
            {clientTools.map((item) => (
              <article key={item} className="pill-card" data-reveal-child>
                <span className="status-dot" aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Feature Breakdown</p>
            <h2>Every major capability, explained in plain language.</h2>
          </div>
          <div className="feature-grid">
            {featureGrid.map((feature) => (
              <article
                key={feature.id}
                id={feature.id}
                className="feature-card"
                data-reveal-child
              >
                <FeatureIcon name={feature.id} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul>
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="meal-import" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Nutrition Import System</p>
            <h2>Bulk meal import is a core CubeFit coaching workflow.</h2>
          </div>
          <div className="split-grid import-grid">
            <article className="panel import-panel">
              <h3>Import in minutes, not hours</h3>
              <p>
                Coaches can download the official meal template, map structured
                fields, and upload complete nutrition libraries without manual
                entry bottlenecks.
              </p>
              <ul className="import-list">
                <li>Download the CubeFit CSV template.</li>
                <li>
                  Fill rows with meals, macros, calories, and ingredients.
                </li>
                <li>
                  Upload in the app to populate the meal system instantly.
                </li>
                <li>Assign imported meals into diet plans for clients.</li>
              </ul>
              <div className="hero-cta-group">
                <a
                  className="btn"
                  href="/templates/cubefit-meal-import-template.csv"
                  download
                >
                  Download Meal Template
                </a>
                <a className="btn btn-ghost" href="#nutrition">
                  View Nutrition Features
                </a>
              </div>
            </article>

            <article className="panel import-schema">
              <h3>CSV schema preview</h3>
              <p>
                The import schema keeps nutrition data consistent across the
                admin dashboard and client-facing meal cards.
              </p>
              <p className="schema-label">Required header order:</p>
              <code className="schema-code schema-wrap">
                {mealImportColumns.join(",")}
              </code>
              <p className="schema-label">Sample row:</p>
              <code className="schema-code schema-wrap">
                {mealImportPreviewRow}
              </code>
            </article>
          </div>
        </section>

        <section id="comparison" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Why CubeFit</p>
            <h2>Manual coaching creates friction. CubeFit creates momentum.</h2>
          </div>
          <div className="comparison-grid">
            <article className="comparison-card muted" data-reveal-child>
              <h3>Manual Coaching</h3>
              <ul>
                <li>Scattered notes and chat threads</li>
                <li>Inconsistent check-ins and follow-up</li>
                <li>Limited progress visibility</li>
                <li>Difficult client scaling</li>
              </ul>
            </article>
            <article className="comparison-card accent-card" data-reveal-child>
              <h3>CubeFit Platform</h3>
              <ul>
                <li>Unified workouts, meals, and progress data</li>
                <li>Automated reminders and accountability loops</li>
                <li>Weekly trend insights for coach decisions</li>
                <li>Premium workflow built for growth</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="screens" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Screen Gallery</p>
            <h2>Core app screens mapped across the full user journey.</h2>
          </div>
          <div className="screens-gallery">
            {screenGallery.map((screen) => (
              <article
                key={screen.title}
                className="screen-mockup"
                data-reveal-child
              >
                <div className="phone-frame">
                  <img
                    src={screen.src}
                    alt={`${screen.title} — CubeFit screen`}
                    loading="lazy"
                  />
                </div>
                <div className="screen-meta">
                  <span className="screen-meta-tag">{screen.audience}</span>
                  <strong>{screen.title}</strong>
                  <p>{screen.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="media" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">Media & Demonstration</p>
            <h2>
              Premium exercise video support for better execution quality.
            </h2>
          </div>
          <article className="video-panel">
            <div className="video-thumb" aria-hidden="true">
              <span>▶</span>
            </div>
            <div>
              <h3>Exercise Video Preview</h3>
              <p>
                Each movement can include a clean demonstration preview with
                coaching cues, so clients train with confidence and consistency.
              </p>
              <p className="muted-text">
                Visual direction: cinematic gym lighting, disciplined athlete
                framing, minimal overlays, and high-contrast composition.
              </p>
            </div>
          </article>
        </section>

        <section id="faq" className="section" data-reveal>
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Clear answers for coaches, clients, and stakeholders.</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <article key={faq.q} className="faq-card" data-reveal-child>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta" data-reveal>
          <p className="eyebrow">Designed for coaches. Loved by clients.</p>
          <h2>Launch your premium coaching ecosystem with CubeFit.</h2>
          <p>
            Use CubeFit as your product showcase, onboarding guide, and growth
            engine for modern fitness coaching.
          </p>
          <p className="muted-text">
            Explore the feature guide, screen gallery, and meal import workflow
            above to understand the full platform.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          <strong>CUBEFIT</strong> — Luxury fitness technology for coach-client
          results.
        </p>
        <div className="footer-links">
          <a href="#how-it-works">Product Guide</a>
          <a href="#screens">Screen Library</a>
          <a href="#contact">Contact</a>
          <a href="#top">Back to Top</a>
        </div>
        <p className="muted-text">
          Social proof placeholder: Trusted by elite coaches and
          performance-focused clients.
        </p>
      </footer>
    </>
  );
}

export default App;
