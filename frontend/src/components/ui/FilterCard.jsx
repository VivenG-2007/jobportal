import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "Graphic Designer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1-5lakh"]
    },
];

const FilterCard = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    const changeHandler = (selectedValue) => {
        if (searchedQuery === selectedValue) {
            dispatch(setSearchedQuery(""));
        } else {
            dispatch(setSearchedQuery(selectedValue));
        }
    };

    return (
        <div className="glass" style={{ padding: '24px', borderRadius: '1rem', position: 'sticky', top: '90px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>Filter Jobs</h1>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '20px' }} />
            {filterData.map((data, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '12px' }}>{data.filterType}</h2>
                    {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        return (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <input
                                    type="radio"
                                    name={data.filterType}
                                    id={itemId}
                                    value={item}
                                    checked={searchedQuery === item}
                                    onClick={() => changeHandler(item)}
                                    // Remove onChange to avoid conflict or double triggers, relying on onClick for toggle behavior
                                    readOnly
                                    style={{ cursor: 'pointer' }}
                                />
                                <label htmlFor={itemId} style={{ fontSize: '0.875rem', cursor: 'pointer' }}>{item}</label>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
