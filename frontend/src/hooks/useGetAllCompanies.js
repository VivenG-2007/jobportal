import API from '../utils/axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanies } from '../redux/companySlice'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await API.get(`/company/get`);
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
