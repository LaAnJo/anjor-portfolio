export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui",
        maxWidth: 900,
        margin: "48px auto",
        padding: 16,
      }}
    >
      <h1 style={{ margin: 0 }}>Your Name</h1>
      <p style={{ marginTop: 6, opacity: 0.75 }}>
        Data Scientist • Applied ML • BI • (City, State)
      </p>

      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          margin: "18px 0 28px",
        }}
      >
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:youremail@gmail.com">Email</a>
      </div>

      <h2>Featured Projects</h2>
      <ul>
        <li>
          <b>Factory Intelligence KPI Server</b> — Python + TimescaleDB + MCP
          tools
        </li>
        <li>
          <b>LLM Stability Checker</b> — evaluation + consistency testing
        </li>
        <li>
          <b>Tableau Dashboard</b> — sales/profit insights
        </li>
      </ul>

      <h2 style={{ marginTop: 28 }}>Skills</h2>
      <p>
        Python • SQL • Pandas • ML • PostgreSQL/TimescaleDB • Docker • Tableau •
        Git
      </p>

      <h2 style={{ marginTop: 28 }}>About</h2>
      <p>
        Short intro (you can update later). Mention what roles you want and what
        you like building.
      </p>
    </div>
  );
}
