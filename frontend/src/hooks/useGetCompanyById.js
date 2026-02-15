import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/company/get/${companyId}`, {
                    withCredentials: true
                });
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById
