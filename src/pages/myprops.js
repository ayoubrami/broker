import React from 'react'
import { useQuery } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import Me from '../gql/queries/me'

const MyProps = () => {
    const { loading, data } = useQuery(Me);
    return (
        <div className=''>
            { !loading && data.Me && ( 
                <h2>ON CONSTRUCTION :)</h2> 
            )}
            {!loading && data.Me == null && <Redirect to='/'/>} 
        </div>
        
)}

export default MyProps