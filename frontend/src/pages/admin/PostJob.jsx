import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import toast from 'react-hot-toast';

const PostJob = () => {
    useGetAllCompanies();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        setInput({ ...input, companyId: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8000/api/v1/job/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <form onSubmit={submitHandler} className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', borderRadius: '1.5rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px' }}>Post New Job</h1>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Requirements</label>
                            <input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Job Type</label>
                            <input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Experience Level</label>
                            <input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>No of Position</label>
                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Select Company</label>
                                    <select
                                        onChange={selectChangeHandler}
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none', background: 'white' }}
                                    >
                                        <option value="">Select a Company</option>
                                        {
                                            companies.map((company) => {
                                                return (
                                                    <option key={company._id} value={company._id}>{company.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? (
                            <button className='btn-primary' style={{ width: '100%', marginTop: '40px', padding: '14px', display: 'flex', justifyContent: 'center' }}>
                                <Loader2 className='animate-spin' /> Please wait
                            </button>
                        ) : (
                            <button type="submit" className='btn-primary' style={{ width: '100%', marginTop: '40px', padding: '14px' }}>
                                Post New Job
                            </button>
                        )
                    }
                    {
                        companies.length === 0 && <p style={{ fontSize: '0.875rem', color: '#f43f5e', fontWeight: 700, textAlign: 'center', marginTop: '12px' }}>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default PostJob;
