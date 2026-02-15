import React from 'react';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    return (
        <div style={{ padding: '40px 0' }}>
            <div className="container">
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>
                    Browse by <span style={{ color: 'var(--primary)' }}>Category</span>
                </h2>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '50px',
                                border: '1px solid var(--border)',
                                background: 'var(--card)',
                                whiteSpace: 'nowrap',
                                fontWeight: 500,
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'var(--primary)';
                                e.target.style.color = 'white';
                                e.target.style.borderColor = 'var(--primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'var(--card)';
                                e.target.style.color = 'var(--foreground)';
                                e.target.style.borderColor = 'var(--border)';
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
