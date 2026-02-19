import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../utils/axios';
import { setUser } from '../../redux/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logoutHandler = async () => {
        try {
            const res = await API.get(`/user/logout`);
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

    const NavLinks = ({ mobile = false }) => (
        <ul className={mobile ? "nav-links-list" : "nav-links-list"} style={{ listStyle: 'none', fontWeight: 500 }}>
            {
                user && user.role === 'recruiter' ? (
                    <>
                        <li><Link to="/admin/companies" onClick={() => mobile && setIsOpen(false)}>Companies</Link></li>
                        <li><Link to="/admin/jobs" onClick={() => mobile && setIsOpen(false)}>Jobs</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" onClick={() => mobile && setIsOpen(false)}>Home</Link></li>
                        <li><Link to="/jobs" onClick={() => mobile && setIsOpen(false)}>Jobs</Link></li>
                        <li><Link to="/browse" onClick={() => mobile && setIsOpen(false)}>Browse</Link></li>
                    </>
                )
            }
        </ul>
    );

    const AuthSection = ({ mobile = false }) => (
        !user ? (
            <div style={{ display: 'flex', gap: '1rem', flexDirection: mobile ? 'column' : 'row' }}>
                <Link to="/login" className="btn-primary"
                    style={{ background: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)', textAlign: 'center' }}
                    onClick={() => mobile && setIsOpen(false)}>
                    Login
                </Link>
                <Link to="/signup" className="btn-primary" style={{ textAlign: 'center' }}
                    onClick={() => mobile && setIsOpen(false)}>
                    Signup
                </Link>
            </div>
        ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'start' : 'center' }}>
                <div className="dropdown" style={{ width: mobile ? '100%' : 'auto' }}>
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
                    <div className="dropdown-content" style={{ top: '100%', right: mobile ? 'auto' : 0, left: mobile ? 0 : 'auto', width: mobile ? '100%' : 'auto', position: mobile ? 'static' : 'absolute', display: mobile ? 'block' : 'none', marginTop: mobile ? '10px' : '5px', boxShadow: mobile ? 'none' : '0px 8px 16px 0px rgba(0, 0, 0, 0.1)', border: mobile ? 'none' : '1px solid var(--border)' }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                            <p style={{ fontWeight: 700 }}>{user?.fullname}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{user?.profile?.bio}</p>
                        </div>
                        <Link to="/profile" onClick={() => mobile && setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}>
                            <User size={18} />
                            <span>View Profile</span>
                        </Link>
                        <div
                            onClick={() => { logoutHandler(); mobile && setIsOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', cursor: 'pointer', borderTop: '1px solid var(--border)' }}
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid var(--border)' }}>
            <div className="container nav-container">
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={28} color="var(--primary)" />
                    Job<span style={{ color: 'var(--primary)' }}>Hunt</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-menu-desktop">
                    <NavLinks />
                    <AuthSection />
                </div>

                {/* Mobile Hamburger */}
                <div className="hamburger" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="nav-menu-mobile">
                    <NavLinks mobile={true} />
                    <AuthSection mobile={true} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
