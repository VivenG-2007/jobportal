import React, { useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/application/${params.id}/applicants`, {
                    withCredentials: true
                });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '60px 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px' }}>
                    Applicants ({applicants?.applications?.length})
                </h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
