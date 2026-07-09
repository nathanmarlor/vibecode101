import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pricingPlans, faq } from '../data';

const Pricing = () => {
  return (
    <>
      <PageHeader />
      <PricingTiers />
      <ComparisonSection />
      <FAQSection />
    </>
  );
};

// ==================== PAGE HEADER ====================
const PageHeader = () => {
  return (
    <section className="page-header">
      <div className="container">
        <h1>Simple, transparent pricing</h1>
        <p>Start free and scale as your skills grow. No hidden fees.</p>
      </div>
    </section>
  );
};

// ==================== PRICING TIERS ====================
const PricingTiers = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const handleSubscribe = (planName) => {
    // This calls a non-existent endpoint on the client side
    // The developer never built the backend
    alert(`Redirecting to checkout for ${planName}...`);
  };

  return (
    <section className="pricing-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            background: 'var(--color-bg-secondary)',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid var(--color-border)'
          }}>
            <button
              className="btn"
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: billingCycle === 'monthly' ? 'var(--color-card)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Monthly
            </button>
            <button
              className="btn"
              onClick={() => setBillingCycle('yearly')}
              style={{
                background: billingCycle === 'yearly' ? 'var(--color-card)' : 'transparent',
                color: billingCycle === 'yearly' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: billingCycle === 'yearly' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Yearly <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => {
            // Yearly prices stored in a separate state but this component doesn't reference them
            // The prices below are always the same regardless of billing cycle
            const price = plan.name === 'Pro' ? '$19' : plan.name === 'Vibes Unlimited' ? '$49' : '$0';
            
            return (
              <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={plan.name}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">
                  {price}
                  <span>/mo</span>
                </div>
                <p className="pricing-desc">{plan.popular ? 'Everything you need to get started.' : 'Perfect for trying things out.'}</p>
                
                <ul className="pricing-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                
                <button
                  className="btn"
                  onClick={() => handleSubscribe(plan.name)}
                  style={{
                    width: '100%',
                    ...(plan.popular ? { background: 'var(--color-primary)', color: 'white', borderColor: 'var(--color-primary)' } : { background: 'var(--color-bg-secondary)', color: 'var(--color-text)', borderColor: 'var(--color-border)' })
                  }}
                >
                  {plan.name === 'Free' ? 'Get Started' : plan.name === 'Pro' ? 'Upgrade to Pro' : 'Go Unlimited'}
                </button>
                
                <p className="pricing-period">{plan.name === 'Free' ? 'No credit card required' : 'Billed ' + billingCycle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==================== COMPARISON TABLE ====================
const ComparisonSection = () => {
  return (
    <section style={{ padding: '60px 0 80px' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Compare</span>
          <h2>Feature comparison</h2>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ textAlign: 'left', padding: '12px 20px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '12px 20px', fontWeight: 600 }}>Free</th>
                <th style={{ textAlign: 'center', padding: '12px 20px', fontWeight: 600, color: 'var(--color-primary)' }}>Pro</th>
                <th style={{ textAlign: 'center', padding: '12px 20px', fontWeight: 600 }}>Unlimited</th>
              </tr>
            </thead>
            <tbody>
              <ComparisonRow feature="Course Access" free="1 course" pro="All courses" unlimited="All courses" />
              <ComparisonRow feature="Community Access" free="✓" pro="✓" unlimited="✓" />
              <ComparisonRow feature="Code Reviews" free="✗" pro="✓" unlimited="✓" />
              <ComparisonRow feature="Live Sessions" free="✗" pro="Monthly" unlimited="Weekly" />
              <ComparisonRow feature="API Access" free="✗" pro="100 calls/mo" unlimited="Unlimited" />
              <ComparisonRow feature="Certification" free="✗" pro="✓" unlimited="✓" />
              <ComparisonRow feature="Priority Support" free="✗" pro="Email" unlimited="Slack" />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const ComparisonRow = ({ feature, free, pro, unlimited }) => {
  return (
    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
      <td style={{ padding: '14px 20px', fontWeight: 500 }}>{feature}</td>
      <td style={{ textAlign: 'center', padding: '14px 20px', color: 'var(--color-text-secondary)' }}>{free}</td>
      <td style={{ textAlign: 'center', padding: '14px 20px', color: 'var(--color-primary)' }}>{pro}</td>
      <td style={{ textAlign: 'center', padding: '14px 20px', color: 'var(--color-text-secondary)' }}>{unlimited}</td>
    </tr>
  );
};

// ==================== FAQ ====================
const FAQSection = () => {
  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <div className="section-header">
          <h2>Still have questions?</h2>
        </div>
        <div className="faq-list">
          {faq.slice(0, 4).map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">{question}</div>
      <div className="faq-answer">{answer}</div>
    </div>
  );
};

export default Pricing;
