import API from '../utils/axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await API.get(`/job/get?keyword=${searchedQuery}`);
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }

        const debounceHandler = setTimeout(() => {
            fetchAllJobs();
        }, 300);

        return () => clearTimeout(debounceHandler);
    }, [dispatch, searchedQuery])
}

export default useGetAllJobs
