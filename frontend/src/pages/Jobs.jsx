import React, { useMemo } from 'react';
import Navbar from '../components/shared/Navbar';
import FilterCard from '../components/ui/FilterCard';
import Job from '../components/Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);

    const filterJobs = useMemo(() => {
        if (!searchedQuery) return allJobs;

        const query = searchedQuery.toLowerCase();
        return allJobs.filter((job) => {
            return job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.location.toLowerCase().includes(query) ||
                (job.salary && job.salary.toString().toLowerCase().includes(query))
        });
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '40px 0' }}>
                <div className="sidebar-layout">
                    <div className="sidebar-container">
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className="jobs-content" style={{ paddingBottom: '20px' }}>
                                <div className="grid-responsive">
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id} >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
