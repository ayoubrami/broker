import { useQuery } from '@apollo/client'
import React from 'react'
import { Redirect } from 'react-router-dom'
import AuthCard from '../components/authcard'
import Me from '../gql/queries/me'
import './styles.scss'
const SignIn = () =>{
    const { loading, data } = useQuery(Me)
    return (
        <>
            { !loading && data && data.Me ? <Redirect to='/'/> : <AuthCard/> }
        </>
)}

export default SignIn;