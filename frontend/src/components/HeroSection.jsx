import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="hero-section">
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
                <h1 className="hero-title">
                    Search, Apply & <br /> Get Your <span style={{ color: 'var(--primary)' }}>Dream Jobs</span>
                </h1>
                <p className="hero-subtitle">
                    Connecting talent with opportunity. Explore thousands of job listings from top companies around the globe.
                </p>

                <div className="hero-search-container">
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
