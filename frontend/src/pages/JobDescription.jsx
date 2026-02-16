import React, { useEffect, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import toast from 'react-hot-toast';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const userApplication = singleJob?.applications?.find(application => application.applicant === user?._id);
    const isApplied = !!userApplication;
    const [applied, setApplied] = useState(isApplied);
    const status = userApplication?.status || "pending";

    const applyJobHandler = async () => {
        // Check if user is logged in
        if (!user) {
            toast.error("Please login to apply for jobs");
            navigate('/login');
            return;
        }

        try {
            const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id, status: 'pending' }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    const isUserApplied = res.data.job.applications.some(application => application.applicant === user?._id);
                    setApplied(isUserApplied);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const getButtonText = () => {
        if (!user) return 'Login to Apply';
        if (!applied) return 'Apply Now';
        if (status === 'accepted') return 'Accepted';
        if (status === 'rejected') return 'Rejected';
        return 'Already Applied';
    };

    const getButtonColor = () => {
        if (!user) return 'var(--primary)';
        if (!applied) return 'var(--primary)';
        if (status === 'accepted') return '#059669'; // success green
        if (status === 'rejected') return '#dc2626'; // error red
        return '#64748b'; // muted slate
    };

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <div className="job-description-header">
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{singleJob?.title}</h1>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '12px' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '50px', border: '1px solid #6366f1', color: '#6366f1', fontSize: '0.875rem', fontWeight: 600 }}>{singleJob?.applications?.length} Applicants</span>
                            <span style={{ padding: '4px 10px', borderRadius: '50px', border: '1px solid #f43f5e', color: '#f43f5e', fontSize: '0.875rem', fontWeight: 600 }}>{singleJob?.jobtype}</span>
                            <span style={{ padding: '4px 10px', borderRadius: '50px', border: '1px solid #7209b7', color: '#7209b7', fontSize: '0.875rem', fontWeight: 600 }}>{singleJob?.salary}</span>
                        </div>
                    </div>
                    <button
                        onClick={applyJobHandler}
                        disabled={user && applied}
                        className={(!user || !applied) ? "btn-primary" : ""}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '0.5rem',
                            backgroundColor: getButtonColor(),
                            color: 'white',
                            cursor: (user && applied) ? 'not-allowed' : 'pointer',
                            fontWeight: 600,
                            textTransform: 'capitalize'
                        }}
                    >
                        {getButtonText()}
                    </button>
                </div>

                <div className="glass job-description-card">
                    <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border)', paddingBottom: '16px', marginBottom: '24px' }}>Job Description</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Role: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.title}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Location: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.location}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Description: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.description}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Experience: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.experience} yrs</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Salary: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.salary} LPA</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total Applicants: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.applications?.length}</span>
                        </div>
                        <div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Posted Date: </span>
                            <span style={{ color: 'var(--muted)' }}>{singleJob?.createdAt?.split("T")[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
