import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MoreHorizontal } from 'lucide-react';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`http://localhost:8000/api/v1/application/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="glass" style={{ borderRadius: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--border)' }}>
                    <tr>
                        <th style={{ padding: '16px', textAlign: 'left' }}>Full Name</th>
                        <th style={{ padding: '16px', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '16px', textAlign: 'left' }}>Contact</th>
                        <th style={{ padding: '16px', textAlign: 'left' }}>Resume</th>
                        <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants && applicants?.applications?.map((item) => (
                        <tr key={item._id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '16px' }}>{item?.applicant?.fullname}</td>
                            <td style={{ padding: '16px' }}>{item?.applicant?.email}</td>
                            <td style={{ padding: '16px' }}>{item?.applicant?.phonenumber}</td>
                            <td style={{ padding: '16px' }}>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'var(--primary)', fontWeight: 600 }}
                                    >
                                        View Resume
                                    </a>
                                ) : <span>NA</span>}
                            </td>
                            <td style={{ padding: '16px' }}>{item?.applicant?.createdAt?.split("T")[0]}</td>
                            <td style={{ padding: '16px' }}>
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    background: item.status === 'accepted' ? '#d1fae5' : item.status === 'rejected' ? '#fee2e2' : '#f3f4f6',
                                    color: item.status === 'accepted' ? '#059669' : item.status === 'rejected' ? '#dc2626' : '#6b7280'
                                }}>
                                    {item.status || 'Pending'}
                                </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <div className="dropdown">
                                        <button style={{ padding: '8px', cursor: 'pointer' }}>
                                            <MoreHorizontal />
                                        </button>
                                        <div className="dropdown-content">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className="dropdown-item"
                                                    style={{
                                                        padding: '10px 16px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        transition: 'background 0.2s'
                                                    }}
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTable;
