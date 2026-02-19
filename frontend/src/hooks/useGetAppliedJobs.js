import { setAllAppliedJobs } from '../redux/jobSlice'
import API from '../utils/axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await API.get(`/application/get`);
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, []);
};

export default useGetAppliedJobs;
