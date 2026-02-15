import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';
import toast from 'react-hot-toast';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: ""
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:8000/api/v1/company/update/${params.id}`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || ""
            })
        }
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <form onSubmit={submitHandler} className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', borderRadius: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '32px' }}>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            style={{
                                padding: '8px',
                                border: '1px solid var(--border)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Company Setup</h1>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Website</label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '40px', padding: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    >
                        {loading ? <><Loader2 className='animate-spin' /> Please wait</> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
