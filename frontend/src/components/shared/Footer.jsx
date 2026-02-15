import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--card)',
            borderTop: '1px solid var(--border)',
            marginTop: '80px'
        }}>
            <div className="container" style={{ padding: '60px 0 30px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '40px'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>
                            Job<span style={{ color: 'var(--primary)' }}>Hunt</span>
                        </h3>
                        <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
                            Your gateway to endless career opportunities. Find your dream job with ease.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '1px solid var(--border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                    }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>For Job Seekers</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['Browse Jobs', 'Companies', 'Career Advice', 'Resume Builder'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" style={{ color: 'var(--muted)', transition: 'color 0.2s' }}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>For Employers</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['Post a Job', 'Browse Candidates', 'Pricing', 'Employer Resources'].map((item, index) => (
                                <li key={index}>
                                    <a href="#" style={{ color: 'var(--muted)', transition: 'color 0.2s' }}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>Newsletter</h4>
                        <p style={{ color: 'var(--muted)', marginBottom: '12px', fontSize: '0.875rem' }}>
                            Subscribe to get latest job alerts
                        </p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="email"
                                placeholder="Your email"
                                style={{
                                    flex: 1,
                                    padding: '10px 14px',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    outline: 'none',
                                    background: 'var(--background)'
                                }}
                            />
                            <button style={{
                                padding: '10px',
                                borderRadius: '0.5rem',
                                background: 'var(--primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '30px',
                    textAlign: 'center',
                    color: 'var(--muted)',
                    fontSize: '0.875rem'
                }}>
                    <p>&copy; 2024 JobHunt. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
