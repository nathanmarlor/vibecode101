import { Link } from 'react-router-dom';
import { useState } from 'react';
import { courses, testimonials, stats, faq } from '../data';

const Home = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <CoursesSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
};

// ==================== HERO ====================
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 style={{ lineHeight: 1.1 }}>
              Build full-stack apps with the power of<br />
              <span>AI-assisted development</span>
            </h1>
            <p>
              Learn to ship production-quality applications without writing every line yourself.
            </p>
            <div className="hero-buttons" style={{ marginTop: '8px' }}>
              <Link to="/signup" className="btn btn-primary btn-large" style={{ marginRight: '8px' }}>Get Started Free</Link>
              <Link to="/pricing" className="btn btn-secondary btn-large">View Pricing</Link>
            </div>
            <div className="hero-social-proof">
              <div className="avatar-stack">
                <div className="avatar" style={{ background: '#a29bfe' }}>A</div>
                <div className="avatar" style={{ background: '#74b9ff' }}>M</div>
                <div className="avatar" style={{ background: '#55efc4' }}>S</div>
                <div className="avatar" style={{ background: '#fd79a8' }}>R</div>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                Join {stats.students}+ developers
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card" style={{ maxWidth: '92%' }}>
              <div className="hero-card-header">
                <div className="hero-card-dot red" />
                <div className="hero-card-dot yellow" />
                <div className="hero-card-dot green" />
                <span style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: '0.75rem' }}>app.jsx</span>
              </div>
              <div className="code-line" style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <span style={{ color: '#cba6f7' }}>import</span>{' '}
                <span style={{ color: '#cdd6f4' }}>{'{'}</span>{' '}
                <span style={{ color: '#89b4fa' }}>useState</span>,{' '}
                <span style={{ color: '#89b4fa' }}>useEffect</span>{' '}
                <span style={{ color: '#cdd6f4' }}>{'}'}</span>{' '}
                <span style={{ color: '#cba6f7' }}>from</span>{' '}
                <span style={{ color: '#a6e3a1' }}>'react'</span>
              </div>
              <div className="code-line" style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8, marginTop: 0 }}>
                <span style={{ color: '#cba6f7' }}>import</span>{' '}
                <span style={{ color: '#cdd6f4' }}>{'{'}</span><span style={{ color: '#f9e2af' }}>Database</span>{' '}
                <span style={{ color: '#cdd6f4' }}>{'}'}</span>{' '}
                <span style={{ color: '#cba6f7' }}>from</span>{' '}
                <span style={{ color: '#a6e3a1' }}>'praysql'</span>
              </div>
              <div className="code-line" style={{ opacity: 0.4 }}>{'  '}// this works</div>
              <div className="code-line" style={{ opacity: 0.4 }}>{'  '}// let the ai do it</div>
              <div style={{ marginTop: 4 }} />
              <div className="code-line" style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <span style={{ color: '#f38ba8' }}>const</span>{' '}
                <span style={{ color: '#89b4fa' }}>data</span>{' '}
                <span style={{ color: '#89b4fa' }}>=</span>{' '}
                <span style={{ color: '#89b4fa' }}>useState</span><span style={{ color: '#cdd6f4' }}>([])</span>
              </div>
              <div className="code-line" style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <span style={{ color: '#cba6f7' }}>return</span>{' '}
                <span style={{ color: '#cdd6f4' }}>{'<'}</span>
                <span style={{ color: '#89ddff' }}>div</span>{' '}
                <span style={{ color: '#89d7b7' }}>className</span>
                <span style={{ color: '#cdd6f4' }}>="app"</span>
                <span style={{ color: '#cdd6f4' }}>{'>'}</span>
              </div>
              <div className="code-line" style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8, paddingLeft: 24 }}>
                <span style={{ color: '#f9e2af' }}>Hello World</span>
              </div>
              <div className="code-line" style={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <span style={{ color: '#cdd6f4' }}>{'<'}</span><span style={{ color: '#89ddff' }}>div</span>{'/'}<span style={{ color: '#89ddff' }}>div</span>{'>'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== STATS ====================
const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {[
            { value: stats.students, label: 'Active Students' },
            { value: stats.courses, label: 'Courses Available' },
            { value: stats.uptime, label: 'Platform Uptime' },
            { value: '4.7', label: 'Average Rating' },
          ].map((item, i) => (
            <div className="stat-item" key={i} style={{ textAlign: 'center' }}>
              <h3 style={{ fontWeight: 800 }}>{item.value}</h3>
              <p style={{ marginTop: 4, fontSize: '0.85rem' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== COURSES ====================
const CoursesSection = () => {
  return (
    <section className="courses-section" id="courses">
      <div className="container">
        <div className="section-header">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Our Courses</h2>
          <p>Everything you need to learn.</p>
        </div>
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-image" style={{ position: 'relative', overflow: 'hidden' }}>
                <span style={{ fontSize: '2.2rem' }}>{course.icon}</span>
                <span className="course-level">{course.level}</span>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', opacity: 0.8 }}>
                  {course.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== TESTIMONIALS ====================
const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What people say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="testimonial-avatar" style={{ width: 36, height: 36, fontSize: '0.78rem' }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== FAQ ====================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq-section" style={{ padding: '50px 0' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <h2>Frequently asked questions</h2>
        </div>
        <div>
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div
                  onClick={() => toggle(i)}
                  style={{
                    padding: '14px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '0.93rem',
                    fontWeight: 600
                  }}
                >
                  <span>{item.question}</span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 300, userSelect: 'none' }}>
                    {isOpen ? '-' : '+'}
                  </span>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 0 14px 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==================== NEWSLETTER ====================
const NewsletterSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '' })
      });
    } catch { /* ignore */ }
    setSubmitted(true);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card" style={{ padding: '44px 40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Stay up to date</h2>
          <p style={{ marginBottom: '20px', opacity: 0.8 }}>Get notified about new courses and tutorials.</p>
          {submitted && (
            <p style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '12px', fontSize: '0.9rem' }}>
              Thanks for subscribing!
            </p>
          )}
          <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: '420px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="you@example.com"
              style={{ flex: 1, padding: '10px 14px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '6px', fontSize: '0.88rem', background: 'rgba(255,255,255,0.1)', color: 'white', fontFamily: 'system-ui, sans-serif', outline: 'none' }}
            />
            <button type="submit" className="btn btn-large" style={{ fontWeight: 700 }}>Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Home;
