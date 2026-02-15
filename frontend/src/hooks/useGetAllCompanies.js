import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../redux/companySlice'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/company/get`, {
                    withCredentials: true
                });
                console.log('called');
                if (res.data.success) {
                    dispatch(setCompanies(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [dispatch])
}

export default useGetAllCompanies
