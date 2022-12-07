import React from 'react'
import PropForm from '../components/propform'
import { useQuery } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import Me from '../gql/queries/me'

const CreateProp = () => {
    const { loading, data } = useQuery(Me);
    return (
        <div className=''>
            { !loading && data.Me && ( 
                <PropForm owner={data.Me[0].id}/> 
            )}
            {!loading && data.Me == null && <Redirect to='/'/>}
        </div>
        
)}

export default CreateProp