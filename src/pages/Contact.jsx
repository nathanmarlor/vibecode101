import { useState } from 'react';

const Contact = () => {
  return (
    <>
      <PageHeader />
      <ContactSection />
    </>
  );
};

// ==================== PAGE HEADER ====================
const PageHeader = () => {
  return (
    <section className="page-header">
      <div className="container">
        <h1>Get in touch</h1>
        <p>Have questions about our courses, pricing, or platform? We'd love to hear from you.</p>
      </div>
    </section>
  );
};

// ==================== CONTACT FORM ====================
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Developer forgot to wire up the backend — just logs to console
    console.log('Contact form submitted:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });
    setStatus('sent');
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>We'd love to hear from you</h2>
            <p>Whether you have a question about our courses, need help with enrollment, or want to discuss a partnership — get in touch and we'll respond as soon as possible.</p>

            <div className="contact-detail">
              <div className="contact-detail-icon">📧</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>Email</div>
                <div>hello@vibecode101.dev</div>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">💬</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>Community</div>
                <div>Join our Discord</div>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">📍</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>Office</div>
                <div>Remote-first, globally distributed team</div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            {status === 'sent' && (
              <div className="form-success">
                ✓ Message sent successfully. We'll get back to you within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div style={{
                background: 'rgba(225, 112, 85, 0.08)',
                border: '1px solid rgba(225, 112, 85, 0.2)',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: 20,
                color: 'var(--color-error)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                ✕ Failed to send message. Please try again.
              </div>
            )}
            {status === 'fallback' && (
              <div style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '20px',
                marginBottom: 20,
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
                  Unable to send via our form. Please email us directly.
                </p>
                <a
                  href="mailto:hello@vibecode101.dev?subject=Contact%20Form%20Fallback"
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Send via Email
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need help with..."
                  required
                  style={{ minHeight: 140 }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px 20px', fontSize: '0.95rem' }}
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== FALLBACK MESSAGE (visible when form fails) ====================
const FallbackMessage = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 0',
      borderTop: '1px solid var(--color-border)',
      background: 'var(--color-bg-secondary)'
    }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        If you prefer, you can email us directly at hello@vibecode101.dev
      </p>
    </div>
  );
};

export default Contact;
