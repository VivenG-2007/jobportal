import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { Contact, Mail, Pen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateProfileDialog from '../components/UpdateProfileDialog';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { allAppliedJobs } = useSelector(store => store.job);

    useGetAppliedJobs();

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <div className="glass" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px', borderRadius: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={user?.profile?.profilephoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                    alt="profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>{user?.fullname}</h1>
                                <p style={{ color: 'var(--muted)', marginBottom: '12px' }}>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(true)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Pen size={16} /> Edit Profile
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Mail size={20} color="var(--muted)" />
                            <span>{user?.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Contact size={20} color="var(--muted)" />
                            <span>{user?.phonenumber}</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Skills</h2>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {user?.profile?.skills?.length !== 0 ? (
                                user?.profile?.skills?.map((item, index) => (
                                    <span key={index} style={{
                                        padding: '8px 16px',
                                        borderRadius: '50px',
                                        background: 'var(--border)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}>
                                        {item}
                                    </span>
                                ))
                            ) : <span>NA</span>}
                        </div>
                    </div>


                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Resume</h2>
                        {user?.profile?.resume ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {user?.profile?.resumeoriginalname && (
                                    <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
                                        {user.profile.resumeoriginalname}
                                    </span>
                                )}
                                <a
                                    href={user?.profile?.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ display: 'inline-block', padding: '12px 24px', width: 'fit-content' }}
                                >
                                    View Resume
                                </a>
                            </div>
                        ) : <span>NA</span>}
                    </div>
                </div>

                <div className="glass" style={{ maxWidth: '900px', margin: '40px auto 0', padding: '40px', borderRadius: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Applied Jobs</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {allAppliedJobs.length === 0 ? (
                            <p style={{ color: 'var(--muted)' }}>You haven't applied to any jobs yet.</p>
                        ) : (
                            allAppliedJobs.map((application) => (
                                <div key={application._id} className="glass" style={{ padding: '20px', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                                                {application.job?.title}
                                            </h3>
                                            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>
                                                {application.job?.company?.name}
                                            </p>
                                            <div style={{ display: 'flex', gap: '12px', fontSize: '0.875rem', color: 'var(--muted)' }}>
                                                <span>📍 {application.job?.location}</span>
                                                <span>💰 {application.job?.salary} LPA</span>
                                                <span>📅 Applied: {new Date(application.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span style={{
                                                padding: '6px 16px',
                                                borderRadius: '50px',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                backgroundColor:
                                                    application.status === 'accepted' ? '#dcfce7' :
                                                        application.status === 'rejected' ? '#fee2e2' :
                                                            '#f1f5f9',
                                                color:
                                                    application.status === 'accepted' ? '#166534' :
                                                        application.status === 'rejected' ? '#991b1b' :
                                                            '#475569',
                                                textTransform: 'capitalize'
                                            }}>
                                                {application.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
