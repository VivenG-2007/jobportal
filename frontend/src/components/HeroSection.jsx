import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
    return (
        <div style={{ textAlign: 'center', padding: '100px 0', background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.05) 0%, transparent 70%)' }}>
            <div className="container">
                <span style={{
                    padding: '8px 16px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                }}>
                    No. 1 Job Hunt Website
                </span>
                <h1 style={{ fontSize: '4rem', fontWeight: 800, marginTop: '24px', lineHeight: '1.1' }}>
                    Search, Apply & <br /> Get Your <span style={{ color: 'var(--primary)' }}>Dream Jobs</span>
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginTop: '16px', maxWidth: '600px', marginInline: 'auto' }}>
                    Connecting talent with opportunity. Explore thousands of job listings from top companies around the globe.
                </p>

                <div style={{
                    marginTop: '40px',
                    maxWidth: '500px',
                    marginInline: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '50px',
                    padding: '6px 6px 6px 20px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                }}>
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', padding: '10px 0' }}
                    />
                    <button style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}>
                        <Search size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
