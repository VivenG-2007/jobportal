import React, { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import Job from '../components/Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px' }}>
                    Search Results ({allJobs.length})
                </h1>
                <div className="grid-responsive">
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse
