import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText, removeCompany } from '../../redux/companySlice';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { Edit2, Trash } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies = [], searchCompanyByText } = useSelector(store => store.company) || {};
    const [filterCompany, setFilterCompany] = useState([]);

    useEffect(() => {
        const filteredCompany = (companies || []).filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const deleteCompanyHandler = async (companyId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/company/delete/${companyId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Remove company from Redux state instead of reloading
                dispatch(removeCompany(companyId));
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '400px' }}>
                        <input
                            type="text"
                            placeholder="Filter by name"
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
                            onClick={() => dispatch(setSearchCompanyByText(input))}
                            className="btn-primary"
                        >
                            Filter
                        </button>
                    </div>
                    <button
                        onClick={() => navigate("/admin/companies/create")}
                        className="btn-primary"
                    >
                        New Company
                    </button>
                </div>

                <div className="glass" style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--border)' }}>
                            <tr>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Logo</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCompany?.length <= 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                                        No companies found.
                                    </td>
                                </tr>
                            ) : (
                                filterCompany?.map((company) => (
                                    <tr key={company._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {company?.name?.charAt(0)}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>{company?.name}</td>
                                        <td style={{ padding: '16px' }}>{company?.createdAt?.split("T")[0]}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                    style={{ padding: '8px', cursor: 'pointer' }}
                                                >
                                                    <Edit2 size={20} color="var(--primary)" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this company?")) {
                                                            deleteCompanyHandler(company._id);
                                                        }
                                                    }}
                                                    style={{ padding: '8px', cursor: 'pointer', color: 'var(--error)' }}
                                                >
                                                    <Trash size={20} />
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

export default Companies;
