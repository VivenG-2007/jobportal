import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = React.memo(({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className="glass job-card-hover"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{job?.company?.name}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: '4px' }}>India</p>
                </div>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '0.5rem',
                    background: 'var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Briefcase size={24} color="var(--primary)" />
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>{job?.title}</h2>
            <p style={{
                color: 'var(--muted)',
                fontSize: '0.875rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '16px'
            }}>
                {job?.description}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '50px',
                    border: '1px solid #6366f1',
                    color: '#6366f1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <MapPin size={12} />
                    {job?.location}
                </span>
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '50px',
                    border: '1px solid #f43f5e',
                    color: '#f43f5e',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <Clock size={12} />
                    {job?.jobtype}
                </span>
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '50px',
                    border: '1px solid #7209b7',
                    color: '#7209b7',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <DollarSign size={12} />
                    {job?.salary} LPA
                </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '16px' }}>
                <button className="btn-primary" style={{ flex: 1, padding: '10px' }}>
                    Details
                </button>
                <button style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    fontWeight: 500
                }}>
                    Save for Later
                </button>
            </div>
        </div >
    );
});

export default LatestJobCards;
