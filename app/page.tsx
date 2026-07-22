"use client";

import { useEffect, useState } from "react";

const registrationUrl = "https://events.elitefeats.com/26royals";
const eventStart = new Date("2026-08-15T08:15:00-04:00");

type Race = {
  distance: string;
  title: string;
  price: string;
  priceNote: string;
  description: string;
  detail: string;
  accent: string;
};

const races: Race[] = [
  {
    distance: "10K",
    title: "The lake loop",
    price: "$49.33",
    priceNote: "includes processing fee",
    description: "A 6.2-mile wooded trail that circles Burke Lake.",
    detail: "Your name on your bib when registered three weeks ahead.",
    accent: "royal",
  },
  {
    distance: "5K",
    title: "The community classic",
    price: "$38.98",
    priceNote: "includes processing fee",
    description: "A 3.1-mile, tree-lined paved course through the park.",
    detail: "Your name on your bib when registered three weeks ahead.",
    accent: "sun",
  },
  {
    distance: "1K",
    title: "The family fun run",
    price: "$28.63",
    priceNote: "includes processing fee",
    description: "An untimed short course for runners 10 and under.",
    detail: "A joyful first finish-line moment for young runners.",
    accent: "sky",
  },
];

const galleryPhotos = [
  {
    src: "/images/gallery/run-2025-01.jpg",
    alt: "Royals Run start arch at Burke Lake Park",
    className: "gallery-hero",
  },
  {
    src: "/images/gallery/run-2025-03.jpg",
    alt: "Royals Run participant approaching the finish",
    className: "gallery-top",
  },
  {
    src: "/images/gallery/run-2025-finish-03.jpg",
    alt: "Royals Run participant running along the course",
    className: "gallery-bottom",
  },
  {
    src: "/images/gallery/run-2025-finish-04.jpg",
    alt: "Royals Run finishers walking together",
    className: "gallery-wide",
  },
  {
    src: "/images/gallery/run-2025-finish-05.jpg",
    alt: "Royals Run participant finishing with volunteers nearby",
    className: "gallery-small",
  },
  {
    src: "/images/gallery/run-2024-01.jpg",
    alt: "Royals Run community gathering in 2024",
    className: "gallery-tall",
  },
  {
    src: "/images/gallery/run-2024-03.jpg",
    alt: "Royals Run community stage at the 2024 event",
    className: "gallery-stage",
  },
  {
    src: "/images/gallery/run-2024-04.jpg",
    alt: "Royals Run participants gathered before the race",
    className: "gallery-group",
  },
];

function getCountdown() {
  const remaining = Math.max(0, eventStart.getTime() - Date.now());
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
  };
}

function trackRegistrationIntent(race?: string) {
  const trackingWindow = window as Window &
    typeof globalThis & { fbq?: (...args: unknown[]) => void };
  trackingWindow.fbq?.("trackCustom", "RoyalsRunRegistrationIntent", {
    race: race ?? "not selected",
  });
}

export default function Home() {
  const [countdown, setCountdown] = useState(getCountdown);
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showEventNote, setShowEventNote] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 60_000);
    const eventNoteTimer = window.setTimeout(() => setShowEventNote(true), 9_000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(eventNoteTimer);
    };
  }, []);

  const openRegistration = (race?: string) => {
    if (race) setSelectedRace(race);
    trackRegistrationIntent(race);
    setShowRegistration(true);
  };

  return (
    <main>
      <div className="topline">
        <span className="topline-dot" aria-hidden="true" />
        <span>4th Annual Royals Run</span>
        <span className="topline-divider">•</span>
        <span>Saturday, August 15, 2026</span>
        <a href="#race-day">Plan your race day <span aria-hidden="true">→</span></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Royals Run home">
          <span className="wordmark-crown" aria-hidden="true">♛</span>
          <span><b>ROYALS</b> RUN</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#choose">Choose a race</a>
          <a href="#race-day">Race day</a>
          <a href="#impact">Our impact</a>
          <a href="#questions">FAQ</a>
        </nav>
        <button className="button button-small" onClick={() => openRegistration()}>
          Register now <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true">✦</span> Burke Lake Park · Fairfax Station, VA</p>
            <h1>Make every mile <em>matter.</em></h1>
            <p className="hero-subhead">Run, walk, cheer, and give back at Northern Virginia&apos;s feel-good summer race.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => openRegistration()}>
                Claim your spot <span aria-hidden="true">→</span>
              </button>
              <a className="button button-quiet" href="#choose">Explore the races <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-trust">
              <div><b>500</b><span>participant limit</span></div>
              <div><b>3</b><span>ways to run</span></div>
              <div><b>Rain</b><span>or shine</span></div>
            </div>
          </div>
          <div className="hero-flyer-wrap">
            <div className="hero-flyer-glow" />
            <img className="hero-flyer" src="/images/royals-run-flyer-2026.png" alt="2026 Royals Run event flyer" />
            <div className="flyer-caption"><span aria-hidden="true">★</span> Challenge your limits. Support your community.</div>
          </div>
        </div>
        <div className="countdown" aria-label="Countdown to the race">
          <span className="countdown-label">Race day is coming</span>
          <div><b>{String(countdown.days).padStart(2, "0")}</b><span>days</span></div>
          <div><b>{String(countdown.hours).padStart(2, "0")}</b><span>hours</span></div>
          <div><b>{String(countdown.minutes).padStart(2, "0")}</b><span>minutes</span></div>
          <button onClick={() => openRegistration()}>Save your place <span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="intro-strip" aria-label="Event highlights">
        <p><span aria-hidden="true">●</span> All ages &amp; abilities welcome</p>
        <p><span aria-hidden="true">●</span> Medal for every finisher</p>
        <p><span aria-hidden="true">●</span> Event T-shirt included</p>
        <p><span aria-hidden="true">●</span> Proceeds support local charities</p>
      </section>

      <section className="choose section" id="choose">
        <div className="section-heading centered">
          <p className="eyebrow ink"><span aria-hidden="true">01</span> Pick your way to show up</p>
          <h2>A race for every kind of <em>royal.</em></h2>
          <p>Choose your distance below, then complete your secure registration in the official event form.</p>
        </div>
        <div className="race-grid">
          {races.map((race) => (
            <article className={`race-card ${race.accent} ${selectedRace === race.distance ? "selected" : ""}`} key={race.distance}>
              <div className="race-card-top">
                <span className="race-distance">{race.distance}</span>
                <span className="race-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="race-title">{race.title}</p>
              <p className="race-description">{race.description}</p>
              <div className="race-price"><b>{race.price}</b><span>{race.priceNote}</span></div>
              <p className="race-detail">{race.detail}</p>
              <button className="race-cta" onClick={() => openRegistration(race.distance)}>
                Choose {race.distance} <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
        <p className="group-note"><b>Bringing your crew?</b> Save $10 off the total when four people register together, or $30 off when ten register together.</p>
      </section>

      <section className="experience section">
        <div className="experience-copy">
          <p className="eyebrow ink"><span aria-hidden="true">02</span> More than a finish line</p>
          <h2>Come for the course.<br />Leave with a <em>story.</em></h2>
          <p>The Royals Run brings together first-timers, families, walkers, dedicated runners, and a community that shows up for one another.</p>
          <a className="text-link" href="#impact">Meet the causes you support <span aria-hidden="true">→</span></a>
          <div className="experience-stats">
            <div><b>10K</b><span>wooded lake trail</span></div>
            <div><b>5K</b><span>tree-lined paved course</span></div>
            <div><b>1K</b><span>untimed kids&apos; fun run</span></div>
          </div>
        </div>
        <div className="gallery" aria-label="Photos from past Royals Run events">
          {galleryPhotos.map((photo) => <img key={photo.src} className={photo.className} src={photo.src} alt={photo.alt} loading="lazy" />)}
          <a href="https://elitefeats.com/Gallery/?ID=24636" target="_blank" rel="noreferrer" className="gallery-link">View 2025 gallery <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="race-day section" id="race-day">
        <div className="section-heading">
          <p className="eyebrow ink"><span aria-hidden="true">03</span> Your Saturday, sorted</p>
          <h2>Everything you need<br />for race <em>morning.</em></h2>
        </div>
        <div className="race-day-layout">
          <div className="schedule-card">
            <p className="card-label">Saturday · August 15</p>
            <div className="schedule-row"><span>8:15 AM</span><b>1K Fun Run starts</b></div>
            <div className="schedule-row"><span>8:30 AM</span><b>10K starts</b></div>
            <div className="schedule-row"><span>8:45 AM</span><b>5K starts</b></div>
            <p className="schedule-foot">Arrive early, take in the energy, and find the distance that moves you.</p>
          </div>
          <div className="location-card">
            <div className="location-pin" aria-hidden="true">●</div>
            <p className="card-label">Start &amp; finish location</p>
            <h3>Burke Lake Park<br />Shelter A</h3>
            <p>7315 Ox Road<br />Fairfax Station, VA 22039</p>
            <a href="https://maps.google.com/?q=Burke+Lake+Park+Shelter+A+7315+Ox+Road+Fairfax+Station+VA+22039" target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
          </div>
          <div className="pickup-card">
            <p className="card-label">Bib &amp; T-shirt pickup</p>
            <h3>Get ready the day before.</h3>
            <p><b>Friday, August 14 · 3–7 PM</b><br />Road Runner Sports<br />1118 W Broad St, Falls Church, VA 22046</p>
            <p className="muted">Bring your ID and registration email. Day-of pickup starts one hour before the event.</p>
          </div>
        </div>
      </section>

      <section className="what-you-get">
        <div className="what-inner">
          <p className="eyebrow light"><span aria-hidden="true">✦</span> The good stuff</p>
          <h2>Your finish line<br />comes with <em>more.</em></h2>
          <div className="benefit-grid">
            <div><span aria-hidden="true">✦</span><b>Commemorative medal</b><p>Every finisher earns one.</p></div>
            <div><span aria-hidden="true">✦</span><b>Live results</b><p>Online, email, and text results.</p></div>
            <div><span aria-hidden="true">✦</span><b>Free finish-line photos</b><p>Plus free video and same-day pics.</p></div>
            <div><span aria-hidden="true">✦</span><b>Personalized bib</b><p>Available when registered three weeks early.</p></div>
          </div>
          <div className="awards-line"><b>10K &amp; 5K awards:</b> Top 3 M/F overall + Top 3 age groups (29 &amp; under, 30–49, 50+).</div>
        </div>
      </section>

      <section className="impact section" id="impact">
        <div className="impact-statement">
          <p className="eyebrow ink"><span aria-hidden="true">04</span> Run for a cause</p>
          <h2>One race.<br /><em>Three</em> meaningful causes.</h2>
          <p>Your entry and optional donation help make a practical difference across Northern Virginia and the autism community.</p>
          <button className="button button-dark" onClick={() => openRegistration()}>Run for a cause <span aria-hidden="true">→</span></button>
        </div>
        <div className="cause-list">
          <article><span>01</span><div><h3>Organization for Autism Research</h3><p>Funding autism research through its Run for Autism program.</p><a href="https://researchautism.org/get-involved/run-for-autism/" target="_blank" rel="noreferrer">Visit OAR <span aria-hidden="true">↗</span></a></div></article>
          <article><span>02</span><div><h3>Upability Foundation</h3><p>Advocating for consistent care and resources for people with disabilities.</p><a href="https://www.upabilityfoundation.org/" target="_blank" rel="noreferrer">Visit Upability <span aria-hidden="true">↗</span></a></div></article>
          <article><span>03</span><div><h3>NOVA Royals Athletic Club</h3><p>Providing low-cost athletic programs to kids, youth, and adults in Northern Virginia.</p><a href="mailto:info.royalsrun@gmail.com">Contact NOVA Royals <span aria-hidden="true">↗</span></a></div></article>
        </div>
      </section>

      <section className="registration-callout section">
        <div>
          <p className="eyebrow light"><span aria-hidden="true">05</span> Your next move</p>
          <h2>Ready to earn<br />your <em>medal?</em></h2>
        </div>
        <div className="registration-callout-side">
          <p>{selectedRace ? <><b>{selectedRace} selected.</b> You&apos;ll confirm your choice in the secure form.</> : "Choose your distance, add an optional donation, and complete your secure official registration."}</p>
          <button className="button button-primary" onClick={() => openRegistration(selectedRace ?? undefined)}>Register for the Royals Run <span aria-hidden="true">→</span></button>
          <span className="secure-note"><span aria-hidden="true">●</span> Secure registration hosted by Elitefeats</span>
        </div>
      </section>

      <section className="questions section" id="questions">
        <div className="section-heading">
          <p className="eyebrow ink"><span aria-hidden="true">06</span> Good to know</p>
          <h2>Questions, answered.</h2>
        </div>
        <div className="faq-list">
          {[
            ["Will I receive a medal and race shirt?", "Yes. Finishers receive a commemorative Royals Run medal and the event T-shirt is included. T-shirt sizes are not guaranteed."],
            ["Are there awards?", "For the 10K and 5K, awards go to the top 3 M/F overall and top 3 age groups: 29 and under, 30–49, and 50+."],
            ["What is the group-registration savings?", "Save $10 off the total when four people register at the same time, or $30 off the total when ten people register at the same time."],
            ["Can I volunteer or sponsor the event?", "Absolutely. Volunteers must be 16 or older. Sponsorship opportunities begin at $500, with in-kind donations welcome. Email info.royalsrun@gmail.com to get involved."],
            ["What if I need to cancel?", "Registration fees are used toward race expenses and are non-refundable and non-transferable from year to year."],
          ].map(([question, answer], index) => (
            <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                <span>{question}</span><span aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="get-involved">
        <p>Have a bigger way to help?</p>
        <a href="mailto:info.royalsrun@gmail.com?subject=Royals%20Run%202026%20Sponsorship">Become a sponsor <span aria-hidden="true">↗</span></a>
        <a href="mailto:info.royalsrun@gmail.com?subject=Royals%20Run%202026%20Volunteer">Volunteer on race day <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-crown" aria-hidden="true">♛</span><span><b>ROYALS</b> RUN</span></a>
        <div><a href="https://elitefeats.com/Gallery/?ID=23813" target="_blank" rel="noreferrer">2024 photo gallery</a><a href="https://elitefeats.com/Gallery/?ID=24636" target="_blank" rel="noreferrer">2025 photo gallery</a><a href="mailto:info.royalsrun@gmail.com">Questions? Get in touch</a></div>
        <p>© 2026 Royals Run · Rain or shine</p>
      </footer>

      {showEventNote && !showRegistration && (
        <aside className="event-note" role="status">
          <button aria-label="Dismiss event update" onClick={() => setShowEventNote(false)}>×</button>
          <span aria-hidden="true">✦</span><div><b>Registration is open</b><p>Capacity is limited to 500 participants.</p></div>
        </aside>
      )}

      {showRegistration && (
        <div className="registration-overlay" role="dialog" aria-modal="true" aria-label="Secure Royals Run registration">
          <div className="registration-panel">
            <div className="registration-panel-head">
              <div><p className="eyebrow ink"><span aria-hidden="true">Secure signup</span></p><h2>Complete your official registration</h2>{selectedRace && <p className="selection-confirmation">You chose <b>{selectedRace}</b>. Select it again in the official form to confirm.</p>}</div>
              <button className="close-registration" onClick={() => setShowRegistration(false)} aria-label="Close registration panel">×</button>
            </div>
            <div className="registration-progress"><span>1. Choose your event</span><span>2. Participant details</span><span>3. Secure payment</span></div>
            <iframe src={registrationUrl} title="Official Royals Run registration form" loading="eager" />
            <p className="registration-fallback">Having trouble seeing the form? <a href={registrationUrl} target="_blank" rel="noreferrer">Open secure registration in a new tab ↗</a></p>
          </div>
        </div>
      )}
    </main>
  );
}
