import React, { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import HeroSection from '../components/HeroSection';
import CategoryCarousel from '../components/ui/CategoryCarousel';
import LatestJobs from '../components/LatestJobs';
import Footer from '../components/shared/Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    );
};

export default Home;
