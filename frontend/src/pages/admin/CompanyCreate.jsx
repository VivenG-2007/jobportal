import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import toast from 'react-hot-toast';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/company/register`, { name: companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', borderRadius: '1.5rem' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Your Company Name</h1>
                        <p style={{ color: 'var(--muted)' }}>What would you like to give your company name? You can change this later.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Company Name</label>
                            <input
                                type="text"
                                placeholder="JobHunt, Microsoft etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '0.75rem',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                            <button
                                onClick={() => navigate("/admin/companies")}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--border)',
                                    fontWeight: 500
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={registerNewCompany}
                                className="btn-primary"
                                style={{ flex: 1, padding: '12px' }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
