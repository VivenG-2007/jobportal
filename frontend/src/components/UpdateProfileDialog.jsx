import React, { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import API from '../utils/axios'
import { setUser } from '../redux/authSlice'
import { toast } from 'react-hot-toast'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phonenumber: user?.phonenumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        profilePhoto: null,
        resume: null
    });

    const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilephoto || "");

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const photoChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, profilePhoto: file });
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, resume: file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phonenumber", input.phonenumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto);
        }
        if (input.resume) {
            formData.append("file", input.resume);
        }
        try {
            setLoading(true);
            const res = await API.post('/user/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    if (!open) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)'
        }}>
            <div className="glass" style={{
                width: '100%',
                maxWidth: '500px',
                padding: '32px',
                borderRadius: '1.5rem',
                position: 'relative'
            }}>
                <button
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'absolute',
                        right: '24px',
                        top: '24px',
                        color: 'var(--muted)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={20} />
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Update Profile</h2>

                <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Profile Photo Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid var(--border)'
                        }}>
                            <img
                                src={photoPreview || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                alt="profile preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <label style={{
                            cursor: 'pointer',
                            color: 'var(--primary)',
                            fontWeight: 500,
                            fontSize: '0.875rem'
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={photoChangeHandler}
                                style={{ display: 'none' }}
                            />
                            Change Profile Photo
                        </label>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 500 }}>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="input-field"
                            style={{
                                padding: '10px 16px',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'transparent'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 500 }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="input-field"
                            style={{
                                padding: '10px 16px',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'transparent'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 500 }}>Number</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={input.phonenumber}
                            onChange={changeEventHandler}
                            className="input-field"
                            style={{
                                padding: '10px 16px',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'transparent'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 500 }}>Bio</label>
                        <input
                            type="text"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="input-field"
                            style={{
                                padding: '10px 16px',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'transparent'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 500 }}>Skills</label>
                        <input
                            type="text"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="e.g. React, Node, MongoDB"
                            className="input-field"
                            style={{
                                padding: '10px 16px',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'transparent'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: 500 }}>Resume</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            style={{
                                padding: '8px 0'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            marginTop: '12px',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfileDialog
