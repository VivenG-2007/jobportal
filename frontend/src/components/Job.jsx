import React from 'react';
import { Bookmark, MapPin, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const today = new Date();
        const diff = today - createdAt;
        return Math.floor(diff / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="glass" style={{ padding: '24px', borderRadius: '1rem', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <button style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '50%' }}>
                    <Bookmark size={18} />
                </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '0.5rem',
                    background: 'var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'var(--primary)'
                }}>
                    {job?.company?.name?.charAt(0)}
                </div>
                <div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{job?.company?.name}</h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>India</p>
                </div>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>{job?.title}</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {job?.description}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '24px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '50px', border: '1px solid #6366f1', color: '#6366f1', fontSize: '0.75rem', fontWeight: 600 }}>{job?.location}</span>
                <span style={{ padding: '4px 10px', borderRadius: '50px', border: '1px solid #f43f5e', color: '#f43f5e', fontSize: '0.75rem', fontWeight: 600 }}>{job?.jobtype}</span>
                <span style={{ padding: '4px 10px', borderRadius: '50px', border: '1px solid #7209b7', color: '#7209b7', fontSize: '0.75rem', fontWeight: 600 }}>{job?.salary} LPA</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    style={{ flex: 1, padding: '10px', borderRadius: '0.5rem', border: '1px solid var(--border)', fontWeight: 500 }}
                >
                    Details
                </button>
                <button className="btn-primary" style={{ flex: 1, padding: '10px' }}>
                    Save For Later
                </button>
            </div>
        </div>
    );
};

export default Job;
