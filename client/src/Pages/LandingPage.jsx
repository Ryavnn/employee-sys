import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle,
    Menu,
    X,
    Users,
    Clock,
    BarChart2,
    Shield,
    Smartphone,
    FileText
} from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const navigateToLogin = () => navigate('/login');

    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="landing-navbar">
                <div className="landing-nav-content">
                    <div className="landing-logo">EMS<span className="landing-logo-highlight">Pro</span></div>

                    <div className="landing-desktop-nav">
                        <a href="#features" className="landing-nav-link">Features</a>
                        <a href="#how-it-works" className="landing-nav-link">How it Works</a>
                        <a href="#pricing" className="landing-nav-link">Pricing</a>
                    </div>

                    <div className="landing-desktop-auth">
                        <button onClick={navigateToLogin} className="landing-login-btn">Log In</button>
                        <button onClick={navigateToLogin} className="landing-primary-btn-small">Request Demo</button>
                    </div>

                    <div className="landing-mobile-nav-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="landing-mobile-menu">
                        <a href="#features" className="landing-mobile-nav-link" onClick={toggleMenu}>Features</a>
                        <a href="#pricing" className="landing-mobile-nav-link" onClick={toggleMenu}>Pricing</a>
                        <button onClick={navigateToLogin} className="landing-mobile-btn">Log In</button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="landing-hero-section">
                <div className="landing-hero-container">
                    <div className="landing-hero-text">
                        <div className="landing-badge">New 2.0 Application</div>
                        <h1 className="landing-hero-title">
                            Scale Your Business with <span className="landing-hero-highlight">Effortless Employee Management</span>
                        </h1>
                        <p className="landing-hero-subtitle">
                            Automate payroll, track attendance, and manage tasks—specifically designed for growing teams. Say goodbye to Excel chaos and hello to growth.
                        </p>
                        <div className="landing-hero-ctas">
                            <button onClick={navigateToLogin} className="landing-primary-btn">
                                Request Demo
                            </button>
                            <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="landing-secondary-btn">
                                View Pricing
                            </button>
                        </div>
                        <div className="landing-trust-badge">
                            <CheckCircle size={16} color="#22c55e" /> <span>Risk-free trial</span>
                            <CheckCircle size={16} color="#22c55e" style={{ marginLeft: '16px' }} /> <span>Easy setup</span>
                        </div>
                    </div>
                    <div className="landing-hero-image-wrapper">
                        {/* Abstract representation of dashboard */}
                        <div className="landing-hero-image">
                            <div className="landing-mockup-header">
                                <div className="landing-dot red"></div>
                                <div className="landing-dot yellow"></div>
                                <div className="landing-dot green"></div>
                            </div>
                            <div className="landing-mockup-body">
                                <div className="landing-mockup-sidebar"></div>
                                <div className="landing-mockup-content">
                                    <div className="landing-mockup-chart"></div>
                                    <div className="landing-mockup-row"></div>
                                    <div className="landing-mockup-row"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section (Dark) */}
            <section className="landing-problem-section">
                <div className="landing-section-content">
                    <div className="landing-problem-header">
                        <h2 className="landing-section-title-light">Common HR Headaches Solved</h2>
                        <p className="landing-section-subtitle-light">Stop wasting time on manual processes. We understand the unique challenges of managing a workforce.</p>
                    </div>

                    <div className="landing-problem-grid">
                        <ProblemCard
                            icon="🕒"
                            title="Manual Attendance"
                            desc="Inaccurate tallying and lost time sheets are history."
                        />
                        <ProblemCard
                            icon="📊"
                            title="Excel Spreadsheet Chaos"
                            desc="Move away from fragile spreadsheets that break easily."
                        />
                        <ProblemCard
                            icon="💸"
                            title="Costly Payroll Errors"
                            desc="Ensure accurate calculations and happy employees every time."
                        />
                        <ProblemCard
                            icon="🙈"
                            title="Zero Visibility"
                            desc="Stop guessing. Get real-time insights into performance."
                        />
                    </div>
                </div>
            </section>

            {/* Value Prop (Split Layout) */}
            <section className="landing-section-white">
                <div className="landing-section-content">
                    <div className="landing-split-layout">
                        <div className="landing-split-image">
                            <div className="landing-office-image-placeholder">
                                <Users size={64} color="#cbd5e1" />
                            </div>
                        </div>
                        <div className="landing-split-text">
                            <div className="landing-small-label">THE ALL-IN-ONE PARTNER</div>
                            <h2 className="landing-section-title">Focus on your business, not the paperwork.</h2>
                            <p className="landing-text-p">
                                Our platform centralizes all your HR needs. From onboarding new hires to processing end-of-month payments, everything flows seamlessly.
                            </p>

                            <div className="landing-checklist">
                                <div className="landing-check-item">
                                    <div className="landing-check-icon"><Shield size={18} color="white" /></div>
                                    <div>
                                        <strong>Local Compliance First</strong>
                                        <p className="landing-check-desc">Built with standard regulations in mind.</p>
                                    </div>
                                </div>
                                <div className="landing-check-item">
                                    <div className="landing-check-icon"><Smartphone size={18} color="white" /></div>
                                    <div>
                                        <strong>Mobile First Design</strong>
                                        <p className="landing-check-desc">Your staff can access payslips and requests directly from their phones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="landing-section-gray">
                <div className="landing-section-content">
                    <div className="landing-center-header">
                        <h2 className="landing-section-title">Everything you need to manage your team</h2>
                        <p className="landing-section-subtitle">Powerful tools integrated into one simple dashboard.</p>
                    </div>

                    <div className="landing-feature-grid">
                        <FeatureCard title="Smart Attendance" icon={<Clock size={24} color="#2563eb" />} desc="Biometric integration or mobile geo-fencing for accurate staff hours." />
                        <FeatureCard title="Task Management" icon={<CheckCircle size={24} color="#2563eb" />} desc="Assign duties and track completion rates. Keep your team aligned." />
                        <FeatureCard title="Leave Management" icon={<FileText size={24} color="#2563eb" />} desc="Employee request leave on app, managers approve in one click." />
                        <FeatureCard title="Role-Based Access" icon={<Shield size={24} color="#2563eb" />} desc="Secure data with permissions. Managers see their teams; admins see everything." />
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section id="how-it-works" className="landing-section-white">
                <div className="landing-section-content">
                    <div className="landing-center-header">
                        <h2 className="landing-section-title">Get Started in Minutes</h2>
                        <p className="landing-section-subtitle">We've made setup incredibly simple.</p>
                    </div>

                    <div className="landing-steps-wrapper">
                        <StepItem num="1" title="Create Account" desc="Sign up with your business email. No credit card required for the trial." />
                        <div className="landing-connector"></div>
                        <StepItem num="2" title="Add Your Team" desc="Upload staff details via CSV or invite them individually." />
                        <div className="landing-connector"></div>
                        <StepItem num="3" title="Start Managing" desc="Manage shifts, track attendance, and approve leave immediately." />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="landing-section-gray">
                <div className="landing-section-content">
                    <div className="landing-center-header">
                        <h2 className="landing-section-title">Simple, Transparent Pricing</h2>
                        <p className="landing-section-subtitle">Choose the plan that fits your business size.</p>
                    </div>

                    <div className="landing-pricing-grid">
                        <PricingCard
                            tier="Starter"
                            price="2,500"
                            detail="Up to 10 Employees. Perfect for startups."
                            btnText="Start Free Trial"
                        />
                        <PricingCardDark
                            tier="Business"
                            price="7,500"
                            tag="MOST POPULAR"
                            detail="For growing SMEs needing full HR automation."
                            btnText="Get Started"
                        />
                        <PricingCard
                            tier="Enterprise"
                            price="Custom"
                            detail="Tailored solutions for large organizations."
                            btnText="Contact Sales"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-section-content">
                    <div className="landing-footer-grid">
                        <div className="landing-footer-brand">
                            <div className="landing-logo" style={{ color: 'white' }}>EMS<span className="landing-logo-highlight">Pro</span></div>
                            <p className="landing-footer-text">Modernizing workforce management for the heart of business. Built with care.</p>
                        </div>
                        <div className="landing-footer-links">
                            <h4 className="landing-footer-head">Product</h4>
                            <a href="#" className="landing-footer-link">Features</a>
                            <a href="#" className="landing-footer-link">Pricing</a>
                            <a href="#" className="landing-footer-link">Login</a>
                        </div>
                        <div className="landing-footer-links">
                            <h4 className="landing-footer-head">Company</h4>
                            <a href="#" className="landing-footer-link">About Us</a>
                            <a href="#" className="landing-footer-link">Careers</a>
                            <a href="#" className="landing-footer-link">Contact</a>
                        </div>
                        <div className="landing-footer-links">
                            <h4 className="landing-footer-head">Contact Us</h4>
                            <p className="landing-footer-text">hello@emspro.com</p>
                            <p className="landing-footer-text">+123 456 7890</p>
                        </div>
                    </div>
                    <div className="landing-footer-bottom">
                        <p>© 2026 EMS Pro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Components
const ProblemCard = ({ icon, title, desc }) => (
    <div className="landing-problem-card">
        <div className="landing-problem-icon">{icon}</div>
        <h3 className="landing-problem-title">{title}</h3>
        <p className="landing-problem-desc">{desc}</p>
    </div>
);

const FeatureCard = ({ title, icon, desc }) => (
    <div className="landing-feature-card">
        <div className="landing-feature-icon-btn">{icon}</div>
        <h3 className="landing-feature-title">{title}</h3>
        <p className="landing-feature-desc">{desc}</p>
    </div>
);

const StepItem = ({ num, title, desc }) => (
    <div className="landing-step-item">
        <div className="landing-step-num">{num}</div>
        <h3 className="landing-step-title">{title}</h3>
        <p className="landing-step-desc">{desc}</p>
    </div>
);

const PricingCard = ({ tier, price, detail, btnText }) => (
    <div className="landing-pricing-card">
        <h3 className="landing-pricing-tier">{tier}</h3>
        <div className="landing-price-area">
            <span className="landing-currency">KES</span>
            <span className="landing-price-num">{price}</span>
            <span className="landing-period">/mo</span>
        </div>
        <p className="landing-pricing-detail">{detail}</p>
        <button className="landing-pricing-btn-outline">{btnText}</button>
        <ul className="landing-pricing-list">
            <li><CheckCircle size={14} color="#22c55e" /> Basic Support</li>
            <li><CheckCircle size={14} color="#22c55e" /> Basic Reporting</li>
        </ul>
    </div>
);

const PricingCardDark = ({ tier, price, detail, btnText, tag }) => (
    <div className="landing-pricing-card-dark">
        <div className="landing-popular-tag">{tag}</div>
        <h3 className="landing-pricing-tier" style={{ color: 'white' }}>{tier}</h3>
        <div className="landing-price-area">
            <span className="landing-currency" style={{ color: '#94a3b8' }}>KES</span>
            <span className="landing-price-num" style={{ color: 'white' }}>{price}</span>
            <span className="landing-period" style={{ color: '#94a3b8' }}>/mo</span>
        </div>
        <p className="landing-pricing-detail" style={{ color: '#cbd5e1' }}>{detail}</p>
        <button className="landing-pricing-btn-solid">{btnText}</button>
        <ul className="landing-pricing-list">
            <li style={{ color: 'white' }}><CheckCircle size={14} color="#3b82f6" /> Priority Support</li>
            <li style={{ color: 'white' }}><CheckCircle size={14} color="#3b82f6" /> Advanced Analytics</li>
            <li style={{ color: 'white' }}><CheckCircle size={14} color="#3b82f6" /> Unlimited Users</li>
        </ul>
    </div>
);
