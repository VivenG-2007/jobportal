import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '../../redux/jobSlice';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { Edit2, Eye } from 'lucide-react';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '400px' }}>
                        <input
                            type="text"
                            placeholder="Filter by title or company"
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '0.75rem',
                                border: '1px solid var(--border)',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={() => dispatch(setSearchJobByText(input))}
                            className="btn-primary"
                        >
                            Filter
                        </button>
                    </div>
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="btn-primary"
                    >
                        New Job
                    </button>
                </div>

                <div className="glass" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--border)' }}>
                            <tr>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Company Name</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Role</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterJobs?.length <= 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                                        No jobs found.
                                    </td>
                                </tr>
                            ) : (
                                filterJobs?.map((job) => (
                                    <tr key={job._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '16px' }}>{job?.company?.name}</td>
                                        <td style={{ padding: '16px' }}>{job?.title}</td>
                                        <td style={{ padding: '16px' }}>{job?.createdAt?.split("T")[0]}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    style={{ padding: '8px', cursor: 'pointer', color: 'var(--muted)' }}
                                                    title="View Applicants"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                    style={{ padding: '8px', cursor: 'pointer' }}
                                                    title="Edit"
                                                >
                                                    <Edit2 size={20} color="var(--primary)" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminJobs;
