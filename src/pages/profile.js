import React from 'react'
import { useQuery } from '@apollo/client'
import Me from '../gql/queries/me'
import Profile from '../components/profile'
import { Redirect } from 'react-router-dom'

const UserProfile = () => {
    const { loading, data } = useQuery(Me);
    return (
        <>
            { !loading && data.Me && ( 
                <Profile user={data.Me[0]}/>
            )}
            {!loading && data.Me == null && <Redirect to='/'/>}
        </>
)}

export default UserProfile