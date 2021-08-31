import React from 'react'
import { useQuery } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import Me from '../gql/queries/me'
import AuthCard from '../components/authcard'
import './styles.scss'
const Register = () =>{
    const { loading, data } = useQuery(Me)
    return (
        <>
            { !loading && data.Me ? <Redirect to='/'/> :  <AuthCard isSignup/> }
        </>
)}

export default Register;