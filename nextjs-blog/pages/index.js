import Head from 'next/head';

const work = [
  {
    title: 'Harbour & Pine',
    type: 'Brand site · Restaurant',
    blurb: 'A warm, photography-led site with online menus that the owners update themselves.',
    tone: 'linear-gradient(135deg, #f97316 0%, #db2777 100%)',
  },
  {
    title: 'Fieldnote',
    type: 'Product launch · SaaS',
    blurb: 'Launch page and design system for a note-taking app. Sign-ups up 38% in the first month.',
    tone: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
  },
  {
    title: 'Ridgeway Physio',
    type: 'Website redesign · Health',
    blurb: 'Clear booking journeys and accessible design for a three-clinic practice.',
    tone: 'linear-gradient(135deg, #34d399 0%, #0ea5e9 100%)',
  },
  {
    title: 'Marlow Ceramics',
    type: 'E-commerce · Maker',
    blurb: 'A calm, tactile shopfront for a studio potter, built around her photography.',
    tone: 'linear-gradient(135deg, #facc15 0%, #f43f5e 100%)',
  },
];

const services = [
  { name: 'Website design', text: 'Fast, accessible sites designed around what your visitors actually need to do.' },
  { name: 'Brand identity', text: 'Logos, colour and type systems that hold together from website to shopfront.' },
  { name: 'Design systems', text: 'Reusable components so your site stays consistent as it grows.' },
  { name: 'UX audits', text: 'A clear, prioritised list of what is stopping visitors from converting.' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Northlight Studio · Independent web design</title>
        <meta name="description" content="Northlight Studio designs fast, accessible websites and brand identities for small businesses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="nav">
        <div className="wrap navInner">
          <a href="#top" className="logo"><span className="dot" />Northlight</a>
          <nav>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact" className="navCta">Get in touch</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="glow glowA" />
          <div className="glow glowB" />
          <div className="wrap heroInner">
            <p className="eyebrow">Independent web designer · UK</p>
            <h1>
              Websites that look <span className="grad">beautiful</span> and work <span className="grad">hard</span>.
            </h1>
            <p className="lead">
              I design fast, accessible websites and brand identities for small businesses that want to stand out
              without the agency price tag.
            </p>
            <div className="heroCtas">
              <a href="#work" className="btn btnPrimary">See my work</a>
              <a href="#contact" className="btn btnGhost">Start a project</a>
            </div>
            <ul className="stats">
              <li><strong>40+</strong><span>sites launched</span></li>
              <li><strong>12</strong><span>years designing</span></li>
              <li><strong>98</strong><span>avg. Lighthouse score</span></li>
            </ul>
          </div>
        </section>

        <section id="work" className="section">
          <div className="wrap">
            <p className="eyebrow">Selected work</p>
            <h2>Recent projects</h2>
            <div className="grid">
              {work.map((w) => (
                <article key={w.title} className="card">
                  <div className="thumb" style={{ background: w.tone }}>
                    <span>{w.title.charAt(0)}</span>
                  </div>
                  <div className="cardBody">
                    <p className="cardType">{w.type}</p>
                    <h3>{w.title}</h3>
                    <p>{w.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section alt">
          <div className="wrap">
            <p className="eyebrow">What I do</p>
            <h2>Services</h2>
            <div className="services">
              {services.map((s, i) => (
                <div key={s.name} className="service">
                  <span className="num">0{i + 1}</span>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="wrap about">
            <div className="avatar" aria-hidden="true">NS</div>
            <div>
              <p className="eyebrow">About</p>
              <h2>Design with a reason behind every choice</h2>
              <p>
                I'm an independent designer who has spent over a decade helping small businesses look as good online
                as they are in person. Every project starts with the problem: who your visitors are and what they need
                to do. The visuals come after.
              </p>
              <p>
                You work with me directly, from the first sketch to launch day, with no account managers in between.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="wrap contactInner">
            <h2>Got a project in mind?</h2>
            <p>Tell me about it. I reply to every enquiry within two working days.</p>
            <a href="mailto:hello@northlight.example" className="btn btnLight">hello@northlight.example</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footerInner">
          <span>© {new Date().getFullYear()} Northlight Studio · a demo site for a fictional studio</span>
          <span>Hosted on AWS (S3 + CloudFront) · Infrastructure in Terraform · Deployed by GitHub Actions</span>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --bg: #0b0d17;
          --bg2: #12152a;
          --text: #e8eaf6;
          --muted: #a3a8c3;
          --line: rgba(255, 255, 255, 0.08);
          --accent: #8b5cf6;
          --accent2: #22d3ee;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }
        .wrap { width: min(1120px, 92%); margin: 0 auto; }

        .nav {
          position: sticky; top: 0; z-index: 10;
          backdrop-filter: blur(12px);
          background: rgba(11, 13, 23, 0.7);
          border-bottom: 1px solid var(--line);
        }
        .navInner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
        .logo { font-weight: 800; font-size: 1.15rem; letter-spacing: -0.02em; display: flex; align-items: center; gap: 10px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); box-shadow: 0 0 16px var(--accent); }
        nav { display: flex; gap: 28px; align-items: center; font-size: 0.95rem; color: var(--muted); }
        nav a:hover { color: var(--text); }
        .navCta { color: var(--text); border: 1px solid var(--line); padding: 8px 16px; border-radius: 999px; }
        .navCta:hover { border-color: var(--accent); }

        .hero { position: relative; overflow: hidden; padding: 120px 0 100px; }
        .glow { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.55; }
        .glowA { width: 520px; height: 520px; background: #7c3aed; top: -180px; right: -120px; }
        .glowB { width: 420px; height: 420px; background: #0891b2; bottom: -200px; left: -120px; }
        .heroInner { position: relative; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.78rem; font-weight: 700; color: var(--accent2); margin-bottom: 16px; }
        h1 { font-size: clamp(2.4rem, 6vw, 4.6rem); line-height: 1.05; letter-spacing: -0.035em; font-weight: 800; max-width: 900px; }
        .grad { background: linear-gradient(90deg, #a78bfa, #22d3ee); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .lead { font-size: 1.2rem; color: var(--muted); max-width: 620px; margin: 24px 0 36px; }
        .heroCtas { display: flex; gap: 14px; flex-wrap: wrap; }
        .btn { display: inline-block; padding: 14px 26px; border-radius: 999px; font-weight: 700; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .btn:hover { transform: translateY(-2px); }
        .btnPrimary { background: linear-gradient(135deg, var(--accent), #6366f1); box-shadow: 0 10px 30px rgba(139, 92, 246, 0.35); }
        .btnGhost { border: 1px solid var(--line); background: rgba(255, 255, 255, 0.03); }
        .btnLight { background: #fff; color: #0b0d17; }
        .stats { list-style: none; display: flex; gap: 48px; margin-top: 64px; flex-wrap: wrap; }
        .stats strong { display: block; font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
        .stats span { color: var(--muted); font-size: 0.9rem; }

        .section { padding: 100px 0; }
        .section.alt { background: var(--bg2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 40px; }
        h3 { font-size: 1.2rem; letter-spacing: -0.01em; margin-bottom: 8px; }

        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        .card { background: var(--bg2); border: 1px solid var(--line); border-radius: 20px; overflow: hidden; transition: transform 0.2s ease, border-color 0.2s ease; }
        .card:hover { transform: translateY(-6px); border-color: rgba(139, 92, 246, 0.5); }
        .thumb { height: 170px; display: flex; align-items: center; justify-content: center; }
        .thumb span { font-size: 4rem; font-weight: 800; color: rgba(255, 255, 255, 0.9); text-shadow: 0 6px 24px rgba(0, 0, 0, 0.25); }
        .cardBody { padding: 22px; }
        .cardType { font-size: 0.8rem; color: var(--accent2); font-weight: 600; margin-bottom: 6px; }
        .cardBody p:last-child { color: var(--muted); font-size: 0.95rem; }

        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
        .service { padding: 28px; border-radius: 18px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.02); }
        .num { display: inline-block; font-weight: 800; font-size: 0.85rem; color: var(--accent); margin-bottom: 18px; }
        .service p { color: var(--muted); font-size: 0.95rem; }

        .about { display: grid; grid-template-columns: 220px 1fr; gap: 56px; align-items: center; }
        .avatar { width: 220px; height: 220px; border-radius: 32px; background: linear-gradient(135deg, #7c3aed, #22d3ee); display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: 800; box-shadow: 0 20px 60px rgba(124, 58, 237, 0.35); }
        .about p { color: var(--muted); margin-bottom: 16px; max-width: 640px; }

        .contact { background: linear-gradient(135deg, #6d28d9 0%, #0e7490 100%); }
        .contactInner { text-align: center; }
        .contact h2 { margin-bottom: 12px; }
        .contact p { color: rgba(255, 255, 255, 0.85); margin-bottom: 32px; font-size: 1.1rem; }

        .footer { border-top: 1px solid var(--line); padding: 28px 0; color: var(--muted); font-size: 0.85rem; }
        .footerInner { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }

        @media (max-width: 720px) {
          nav a:not(.navCta) { display: none; }
          .about { grid-template-columns: 1fr; }
          .avatar { width: 140px; height: 140px; font-size: 2.6rem; }
          .hero { padding: 80px 0 70px; }
        }
      `}</style>
    </>
  );
}
