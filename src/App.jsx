import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "portfolio", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const skills = useMemo(
    () => [
      { name: "Python", level: 85 },
      { name: "SQL", level: 85 },
      { name: "Machine Learning", level: 75 },

      { name: "NLP (TF-IDF, tokenization)", level: 70 },
      { name: "Model evaluation (A/B testing)", level: 75 },
      { name: "FastAPI / REST APIs", level: 70 },

      { name: "PostgreSQL / TimescaleDB", level: 72 },
      { name: "Docker", level: 70 },
      { name: "Power BI (KPI dashboards)", level: 78 },

      { name: "Git / GitHub", level: 75 },
      { name: "Pandas / NumPy", level: 80 },
      { name: "scikit-learn", level: 75 },
    ],
    []
  );

  // ✅ Projects (Live Demo removed)
  const projects = useMemo(
    () => [
      {
        icon: "🎯",
        title: "Factory Intelligence – MCP KPI Server",
        desc: "Built a Python MCP server that exposes factory KPI tools over TimescaleDB aggregates. Designed clean tool contracts and efficient SQL queries for reliable KPI computation.",
        tags: ["Python", "PostgreSQL", "TimescaleDB", "Docker", "MCP"],
        github: "https://github.com/LaAnJo",
      },
      {
        icon: "📄",
        title: "LLM Stability & Evaluation Toolkit",
        desc: "Built evaluation utilities to assess response stability and quality signals. Added FastAPI endpoints for experiments and tracking, focusing on repeatable metrics and monitoring.",
        tags: ["Python", "FastAPI", "Evaluation", "LLMs"],
        github: "https://github.com/LaAnJo",
      },
      {
        icon: "📊",
        title: "UPS Logistics KPI Dashboards",
        desc: "Created SQL/Python pipelines and Power BI dashboards for operational KPI monitoring. Built tracking views and automated reporting workflows for stakeholders.",
        tags: ["SQL", "Python", "Power BI", "Analytics"],
        github: "https://github.com/LaAnJo",
      },
    ],
    []
  );

  const experience = useMemo(
    () => [
      {
        fromTo: "Nov 2021 – Jul 2023",
        role: "Programmer Analyst",
        company: "Cognizant",
        bullets: [
          "Built and maintained SQL/Python data pipelines and automated KPI reporting workflows.",
          "Created dashboards and operational metrics tracking in Power BI for stakeholders.",
          "Improved data quality with validation checks, monitoring, and repeatable reporting.",
        ],
      },
      {
        fromTo: "Jul 2023 – Aug 2024",
        role: "Business / Data Analyst",
        company: "UPS (Client project / Analytics)",
        bullets: [
          "Analyzed logistics datasets to define KPIs and performance indicators.",
          "Delivered Power BI dashboards for trend monitoring and exception tracking.",
          "Translated operational needs into analytics deliverables with stakeholders.",
        ],
      },
    ],
    []
  );

  const education = useMemo(
    () => [
      {
        shell: "$ education --detail",
        degree: "M.S. in Data Science",
        school: "University of Wisconsin–Milwaukee, Milwaukee, WI",
        date: "Aug 2024 – Aug 2026 (Expected)",
        score: "GPA: 3.7/4.0",
        coursework: [
          "Machine Learning",
          "Data Mining",
          "Database Management",
          "Data Visualization",
          "Statistics",
          "NLP",
          "Cloud Computing",
          "Software Engineering",
        ],
      },
      {
        shell: "$ education --detail",
        degree: "B.Tech in Computer Science Engineering",
        school: "Lovely Professional University, Punjab, India",
        date: "Jun 2018 – Jun 2022",
        score: "GPA: 3.52/4.0",
        coursework: [
          "Data Structures",
          "Algorithms",
          "DBMS",
          "Operating Systems",
          "Computer Networks",
          "OOP",
          "AI",
          "Math for CS",
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState("home");

  // instant highlight on click + reliable scroll spy
  const clickLockRef = useRef(false);
  const clickLockTimerRef = useRef(null);

  const lockHighlightBriefly = () => {
    clickLockRef.current = true;
    if (clickLockTimerRef.current) clearTimeout(clickLockTimerRef.current);
    clickLockTimerRef.current = setTimeout(() => {
      clickLockRef.current = false;
    }, 450);
  };

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const navOffset = 92;

    const pickActive = () => {
      const candidates = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top, dist: Math.abs(rect.top - navOffset) };
        })
        .filter(Boolean);

      const above = candidates.filter((c) => c.top <= navOffset + 12);
      const list = above.length ? above : candidates;

      list.sort((a, b) => a.dist - b.dist);
      return list[0]?.id ?? "home";
    };

    let ticking = false;
    const onScroll = () => {
      if (clickLockRef.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(pickActive());
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (clickLockTimerRef.current) clearTimeout(clickLockTimerRef.current);
    };
  }, [sections]);

  const scrollToId = (id) => {
    setActive(id);
    lockHighlightBriefly();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    document.body.classList.remove("navOpen");
  };

  const toggleNav = () => document.body.classList.toggle("navOpen");

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbarInner">
          <button
            className="brand"
            onClick={() => scrollToId("home")}
            aria-label="Go to Home"
          >
            <span className="brandMark">AL</span>
          </button>

          <nav className="nav">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`navLink ${active === s.id ? "active" : ""}`}
                onClick={() => scrollToId(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="topbarRight">
            <a
              className="pill"
              href="https://github.com/LaAnJo"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="pill"
              href="https://linkedin.com/in/anjorlatne"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="pillPrimary"
              href="/Anjor_Latane.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume <span className="pillIcon">↓</span>
            </a>

            <button
              className="burger"
              onClick={toggleNav}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className="mobileNav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`mobileNavLink ${active === s.id ? "active" : ""}`}
              onClick={() => scrollToId(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* HOME */}
      <section id="home" className="homeHero">
        <div className="container homeCenter">
          <h1 className="homeName">
            Anjor Latane
            <span className="nameSquare" aria-hidden="true" />
          </h1>
          <p className="homeLine">Data Science • Applied ML • LLMs</p>
          <a className="emailPill" href="mailto:lataneanjor6@gmail.com">
            <span className="mailIcon" aria-hidden="true">
              ✉
            </span>
            lataneanjor6@gmail.com
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="aboutSection">
        <div className="container">
          <h2 className="aboutTitle">About Me</h2>

          <div className="aboutBody">
            <h3 className="aboutBlue">A bit about me</h3>
            <p className="aboutText">
              I’m a Data Science graduate student focused on analytics and
              applied machine learning. I build end-to-end solutions using
              SQL/Python pipelines, clean evaluation practices, and dashboards
              for stakeholders.
            </p>

            <h3 className="aboutBlue mtAbout">Technologies and Tools</h3>
            <p className="aboutText">
              I use Python, SQL, FastAPI, Docker, and PostgreSQL/TimescaleDB to
              ship data products and services. For analytics and reporting, I
              build Power BI dashboards and automate KPI reporting workflows.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skillsSection">
        <div className="container">
          <h2 className="skillsTitle">My Skills</h2>

          <div className="skillsGrid">
            {skills.map((s) => (
              <div key={s.name} className="skillItem">
                <div className="skillHeader">
                  <div className="skillLabel">{s.name}</div>
                  <div className="skillValue">{s.level}%</div>
                </div>
                <div className="skillTrack">
                  <div className="skillFill" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="portfolio" className="projectsSection">
        <div className="container">
          <h2 className="projectsTitle">Projects</h2>

          <div className="projectsGrid">
            {projects.map((p) => (
              <article key={p.title} className="pCard">
                <div className="pTop">
                  <div className="pIcon" aria-hidden="true">
                    {p.icon}
                  </div>
                  <h3 className="pTitle">{p.title}</h3>
                </div>

                <p className="pDesc">{p.desc}</p>

                <div className="pTags">
                  {p.tags.map((t) => (
                    <span key={t} className="pTag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* ✅ ONLY GitHub button */}
                <div className="pActions">
                  <a
                    className="pBtnPrimary"
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="experienceSection">
        <div className="container">
          <h2 className="experienceTitleBlack">Professional Experience</h2>

          <div className="experienceStack">
            {experience.map((x) => (
              <article key={`${x.role}-${x.company}`} className="expCard">
                <div className="expIcon">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1h3a2 2 0 0 1 2 2v3.5a2 2 0 0 1-.8 1.6l-1.2.9V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3l-1.2-.9A2 2 0 0 1 2 12.5V9a2 2 0 0 1 2-2h3V6Zm2 1h6V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>

                <div className="expContent">
                  <div className="expMeta">
                    <span className="expDate">
                      <span className="calDot" aria-hidden="true" />
                      {x.fromTo}
                    </span>
                  </div>

                  <h3 className="expRole">{x.role}</h3>
                  <div className="expCompany">{x.company}</div>

                  <div className="expText">
                    {x.bullets.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="educationSection">
        <div className="container">
          <h2 className="educationTitleBlack">Education</h2>

          <div className="eduStack">
            {education.map((e) => (
              <article key={e.degree} className="eduCard">
                <div className="eduTop">
                  <div className="eduShell">{e.shell}</div>
                  <div className="eduRight">
                    <div className="eduDate">{e.date}</div>
                    <div className="eduScore">{e.score}</div>
                  </div>
                </div>

                <div className="eduDegree">{e.degree}</div>
                <div className="eduSchool">{e.school}</div>

                <div className="eduLabel">Relevant coursework</div>
                <div className="eduTags">
                  {e.coursework.map((c) => (
                    <span key={c} className="eduTag">
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contactSection">
        <div className="container">
          <h2 className="contactTitle">Contact Me</h2>

          <div className="contactIconsRow">
            <a
              className="contactIconCard"
              href="mailto:lataneanjor6@gmail.com"
              aria-label="Email"
            >
              ✉<div className="contactIconText">lataneanjor6@gmail.com</div>
            </a>

            <a
              className="contactIconCard"
              href="https://github.com/LaAnJo"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <span className="ghDot">⌂</span>
              <div className="contactIconText">github</div>
            </a>

            <a
              className="contactIconCard"
              href="https://linkedin.com/in/anjorlatne"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              in
              <div className="contactIconText">linkedin</div>
            </a>
          </div>

          <form
            className="contactForm"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Thanks! Message form is UI-only (connect EmailJS/Formspree if you want)."
              );
            }}
          >
            <div className="contactFormRow">
              <input className="input" placeholder="Name" />
              <input className="input" placeholder="Email" />
            </div>
            <textarea className="textarea" placeholder="Message..." rows={6} />
            <button className="sendBtn" type="submit">
              Send Message
            </button>
          </form>

          <footer className="footer">
            <div className="muted small">
              © {new Date().getFullYear()} Anjor Latane
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
