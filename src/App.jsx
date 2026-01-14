import { useEffect, useMemo, useState } from "react";
import "./App.css";

function useInViewReveal(selector = "[data-reveal]") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" };
  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity=".9"
          />
          <path
            d="m4 7 8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path
            d="M12 2C6.48 2 2 6.6 2 12.28c0 4.54 2.87 8.38 6.84 9.74.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.38-2.03 1-2.75-.1-.26-.43-1.32.1-2.74 0 0 .83-.27 2.72 1.05.79-.23 1.64-.34 2.48-.34.84 0 1.69.12 2.48.34 1.88-1.32 2.72-1.05 2.72-1.05.53 1.42.2 2.48.1 2.74.62.72 1 1.63 1 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.52-.01 2.86 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.28C22 6.6 17.52 2 12 2Z"
            fill="currentColor"
            opacity=".9"
          />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path
            d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0 0-7.07 5 5 0 0 0-7.07 0L10.7 5.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M14 11a5 5 0 0 1-7.07 0L5.52 9.59a5 5 0 0 1 0-7.07 5 5 0 0 1 7.07 0L13.3 3.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity=".9"
          />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path
            d="M12 2l1.1 6.2L19 9.3l-5.9 1.1L12 16l-1.1-5.6L5 9.3l5.9-1.1L12 2Z"
            fill="currentColor"
            opacity=".9"
          />
          <path
            d="M5 14l.7 3.8L9 18.5l-3.3.7L5 23l-.7-3.8L1 18.5l3.3-.7L5 14Z"
            fill="currentColor"
            opacity=".65"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

function ProjectCard({ title, period, desc, links = [] }) {
  return (
    <div className="projectCard hoverLift" data-reveal>
      <div className="projectTop">
        <div>
          <h3 className="h3">{title}</h3>
          <div className="muted tiny">{period}</div>
        </div>
        <Pill>Featured</Pill>
      </div>
      <p className="muted">{desc}</p>
      {links.length > 0 && (
        <div className="row links">
          {links.map((l) => (
            <a
              key={l.href}
              className="linkBtn"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="link" /> {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  useInViewReveal();

  const [active, setActive] = useState("top");
  const sections = useMemo(
    () => [
      { id: "top", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handler = () => {
      const ids = sections.map((s) => s.id);
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [sections]);

  const repoName = "anjor-portfolio"; // used for resume link base on GitHub Pages
  const resumeHref = `/${repoName}/resume.pdf`;

  return (
    <div className="app">
      {/* ambient animated blobs */}
      <div className="bgBlob b1" aria-hidden />
      <div className="bgBlob b2" aria-hidden />
      <div className="bgBlob b3" aria-hidden />

      <nav className="nav">
        <div className="navInner">
          <a className="brand" href="#top">
            <span className="brandIcon">
              <Icon name="spark" />
            </span>
            <span>LaAnJo</span>
          </a>

          <div className="navLinks">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`navLink ${active === s.id ? "on" : ""}`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="navCtas">
            <a className="btn ghost" href="mailto:lataneanjor6@gmail.com">
              <Icon name="mail" /> Email
            </a>
            <a
              className="btn ghost"
              href="https://github.com/LaAnJo"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" /> GitHub
            </a>
          </div>
        </div>
      </nav>

      <header id="top" className="hero">
        <div className="heroInner">
          <div className="heroLeft" data-reveal>
            <div className="kicker">
              <span className="kDot" />
              Available for Data Scientist / Applied ML roles
            </div>

            <h1 className="title">
              Anjor <span className="glowText">Latane</span>
            </h1>

            <p className="subtitle">
              M.S. Data Science @ UWM • SQL/Python pipelines • KPI dashboards •
              Applied ML / LLM evaluation. Building clean data products with
              measurable impact.
            </p>

            <div className="row ctaRow">
              <a
                className="btn primary"
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <a
                className="btn"
                href="https://linkedin.com/in/anjorlatne"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn"
                href="https://github.com/LaAnJo"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>

            <div className="heroMeta">
              <div className="metaCard">
                <div className="metaNum">2+ yrs</div>
                <div className="metaLabel">Cognizant (UPS)</div>
              </div>
              <div className="metaCard">
                <div className="metaNum">10M+</div>
                <div className="metaLabel">rows/week</div>
              </div>
              <div className="metaCard">
                <div className="metaNum">3.7</div>
                <div className="metaLabel">GPA (M.S.)</div>
              </div>
            </div>
          </div>

          <div className="heroRight" data-reveal>
            <div className="glassCard">
              <div className="glassHeader">
                <span className="dot green" />
                <span className="dot yellow" />
                <span className="dot red" />
                <span className="glassTitle">Highlights</span>
              </div>

              <div className="glassBody">
                <div className="hl">
                  <div className="hlTitle">Factory KPI MCP Server</div>
                  <div className="hlDesc">
                    TimescaleDB + Python tools, JSON outputs, validation
                    scripts.
                  </div>
                </div>
                <div className="hl">
                  <div className="hlTitle">LLM Stability Toolkit</div>
                  <div className="hlDesc">
                    Embedding drift + stability metrics, FastAPI endpoints.
                  </div>
                </div>
                <div className="hl">
                  <div className="hlTitle">Dashboards + Data Quality</div>
                  <div className="hlDesc">
                    KPI modeling, automated refresh, reduced reporting time.
                  </div>
                </div>

                <div className="chipWrap">
                  <Chip>Python</Chip>
                  <Chip>SQL</Chip>
                  <Chip>PostgreSQL/TimescaleDB</Chip>
                  <Chip>Docker</Chip>
                  <Chip>Power BI</Chip>
                  <Chip>FastAPI</Chip>
                  <Chip>scikit-learn</Chip>
                </div>
              </div>
            </div>

            <div className="miniRow">
              <a className="mini" href="#projects">
                <span className="miniIcon">
                  <Icon name="spark" />
                </span>
                See Projects
              </a>
              <a className="mini" href="#contact">
                <span className="miniIcon">
                  <Icon name="mail" />
                </span>
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="projects" className="section">
          <div className="sectionHead" data-reveal>
            <h2 className="h2">Featured Projects</h2>
            <p className="muted">
              Selected work that shows real engineering + measurable analytics.
            </p>
          </div>

          <div className="cardsGrid">
            <ProjectCard
              title="Factory Intelligence — MCP KPI Server"
              period="Dec 2025 – Jan 2026"
              desc="Python MCP server exposing KPI tools (Productivity, Quality, Downtime/Availability, KPI Summary) using PostgreSQL/TimescaleDB continuous aggregates and Docker."
              links={[
                {
                  label: "Repo",
                  href: "https://github.com/LaAnJo/factory-kpi-mcp",
                },
              ]}
            />
            <ProjectCard
              title="LLM Stability & Evaluation Toolkit"
              period="2025 – Present"
              desc="Toolkit to analyze embedding stability (drift/collapse/convergence) with pipelines and FastAPI endpoints that return stability metrics for monitoring workflows."
              links={[{ label: "GitHub", href: "https://github.com/LaAnJo" }]}
            />
            <ProjectCard
              title="Tableau / BI Dashboards"
              period="2024 – 2025"
              desc="Interactive dashboards for sales/profit insights and KPI storytelling. Focus on actionable segmentation, trend changes, and clean visuals."
            />
          </div>
        </section>

        <section id="experience" className="section">
          <div className="sectionHead" data-reveal>
            <h2 className="h2">Experience</h2>
            <p className="muted">
              Real-world data work across pipelines, reporting, and analytics.
            </p>
          </div>

          <div className="timeline">
            <div className="tItem hoverLift" data-reveal>
              <div className="tLine" />
              <div className="tContent">
                <div className="row space">
                  <div>
                    <h3 className="h3">Cognizant Technology Solutions</h3>
                    <div className="muted tiny">
                      Data Analyst (previously Intern) • Aug 2021 – Jan 2024
                    </div>
                  </div>
                  <Pill>UPS</Pill>
                </div>
                <ul className="list">
                  <li>
                    Built SQL/Python pipelines and Power BI dashboards over
                    logistics data (~10M+ rows/week).
                  </li>
                  <li>
                    Standardized data models from raw tables to improve KPI
                    reliability and downstream analytics.
                  </li>
                  <li>
                    Added data quality checks + automated refresh workflows;
                    reduced weekly reporting effort ~30–40%.
                  </li>
                </ul>
              </div>
            </div>

            <div className="tItem hoverLift" data-reveal>
              <div className="tLine" />
              <div className="tContent">
                <div className="row space">
                  <div>
                    <h3 className="h3">Applied AI</h3>
                    <div className="muted tiny">
                      AI Intern • Aug 2021 – Sep 2021
                    </div>
                  </div>
                  <Pill>SEO / NLP</Pill>
                </div>
                <ul className="list">
                  <li>
                    Built pipelines to collect/clean SEO and web analytics
                    (100k+ keyword-session records).
                  </li>
                  <li>
                    Used TF–IDF + clustering to group queries and surface
                    high-value topics for strategy.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="sectionHead" data-reveal>
            <h2 className="h2">Skills</h2>
            <p className="muted">
              Stack I use to build data products and ML workflows.
            </p>
          </div>

          <div className="skillGrid">
            <div className="skillCard hoverLift" data-reveal>
              <h3 className="h3">ML / AI</h3>
              <div className="chipWrap">
                <Chip>Regression</Chip>
                <Chip>Classification</Chip>
                <Chip>Evaluation</Chip>
                <Chip>Experimentation</Chip>
                <Chip>NLP</Chip>
                <Chip>Embeddings</Chip>
              </div>
            </div>
            <div className="skillCard hoverLift" data-reveal>
              <h3 className="h3">Data / BI</h3>
              <div className="chipWrap">
                <Chip>SQL</Chip>
                <Chip>Power BI</Chip>
                <Chip>Tableau</Chip>
                <Chip>Dashboards</Chip>
                <Chip>Dim Modeling</Chip>
              </div>
            </div>
            <div className="skillCard hoverLift" data-reveal>
              <h3 className="h3">Engineering</h3>
              <div className="chipWrap">
                <Chip>Python</Chip>
                <Chip>FastAPI</Chip>
                <Chip>PostgreSQL</Chip>
                <Chip>TimescaleDB</Chip>
                <Chip>Docker</Chip>
                <Chip>Git/GitHub</Chip>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="sectionHead" data-reveal>
            <h2 className="h2">Contact</h2>
            <p className="muted">
              Fastest way: email. I reply quickly and can share demos/repos.
            </p>
          </div>

          <div className="contactCard hoverLift" data-reveal>
            <div className="row space">
              <div>
                <div className="contactTitle">
                  Let’s build something impactful.
                </div>
                <div className="muted">
                  Milwaukee, WI • Open to internships / full-time roles
                </div>
              </div>
              <Pill>Available</Pill>
            </div>

            <div className="row contactBtns">
              <a className="btn primary" href="mailto:lataneanjor6@gmail.com">
                <Icon name="mail" /> Email
              </a>
              <a
                className="btn"
                href="https://linkedin.com/in/anjorlatne"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn"
                href="https://github.com/LaAnJo"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Anjor Latane</span>
          <span className="sep">•</span>
          <a href="mailto:lataneanjor6@gmail.com">lataneanjor6@gmail.com</a>
        </footer>
      </main>
    </div>
  );
}
