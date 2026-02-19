import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    const latestJobs = useMemo(() => {
        return allJobs?.slice(0, 6) || [];
    }, [allJobs]);

    return (
        <div className="container" style={{ padding: '80px 0' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px' }}>
                Latest & Top <span style={{ color: 'var(--primary)' }}>Job Openings</span>
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {latestJobs.length <= 0 ? (
                    <span>No Job Available</span>
                ) : (
                    latestJobs.map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
