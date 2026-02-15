import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid var(--border)' }}>
            <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={28} color="var(--primary)" />
                    Job<span style={{ color: 'var(--primary)' }}>Hunt</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', gap: '1.5rem', fontWeight: 500 }}>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {!user ? (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" className="btn-primary" style={{ background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                                Login
                            </Link>
                            <Link to="/signup" className="btn-primary">
                                Signup
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="dropdown">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                                        <img
                                            src={user?.profile?.profilephoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                            alt="profile"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <span style={{ fontWeight: 500 }}>{user?.fullname}</span>
                                </div>
                                <div className="dropdown-content" style={{ top: '100%', right: 0 }}>
                                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                                        <p style={{ fontWeight: 700 }}>{user?.fullname}</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{user?.profile?.bio}</p>
                                    </div>
                                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}>
                                        <User size={18} />
                                        <span>View Profile</span>
                                    </Link>
                                    <div
                                        onClick={logoutHandler}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', cursor: 'pointer', borderTop: '1px solid var(--border)' }}
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
