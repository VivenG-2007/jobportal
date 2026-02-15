import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex-center" style={{ minHeight: 'calc(100vh - 70px)', padding: '40px 0' }}>
                <form onSubmit={submitHandler} className="glass" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Login to your account to continue.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="name@company.com"
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="jobseeker"
                                        checked={input.role === 'jobseeker'}
                                        onChange={changeEventHandler}
                                        id="jobseeker"
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <label htmlFor="jobseeker" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>Job Seeker</label>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        id="recruiter"
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <label htmlFor="recruiter" style={{ fontSize: '0.875rem', cursor: 'pointer' }}>Recruiter</label>
                                </div>
                            </div>
                        </div>

                        {
                            loading ? (
                                <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px', opacity: 0.7, cursor: 'not-allowed' }}>
                                    Please wait...
                                </button>
                            ) : (
                                <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
                                    Login
                                </button>
                            )
                        }

                        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)' }}>
                            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Signup</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
