import React, { useState } from 'react';
import { Formik, Form, Field} from 'formik'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import register from '../../gql/mutations/register'
import login from '../../gql/mutations/login'
import Me from '../../gql/queries/me'

const View = ({isSignup}) => {
    let history = useHistory();
    const [formErrors, setFormErrors]= useState('');

    const [createUser] = useMutation(register,{
        onCompleted: (data) =>{
            localStorage.setItem('accessToken',data.register.accessToken)
            history.push('/');
        },
        onError: (ApolloError) =>{
            setFormErrors(ApolloError.message);
        }
    }); 
    const [signIn] = useMutation(login,{
        onCompleted: (data) => {
            localStorage.setItem('accessToken', data.login.accessToken)
            history.push('/')
        },
        onError: (ApolloError) =>{
            setFormErrors(ApolloError.message);
        }
    });

    const loginValidation = yup.object().shape({
        email: yup.string().email("Invalid email").required("Please enter your email"),
        password: yup.string().required("Please enter your password") 
        .min(8, "Password is too short - should be 8 chars minimum")
    });
    const registerValidation = yup.object().shape({
        fullname: yup.string().min(2,'Too Short!').max(50, "Too Long!")
        .required("Please enter your fullname"),
        email: yup.string().email("Invalid email").required("Please enter your email"),
        password: yup.string().required("Please enter your password") 
        .min(8, "Password is too short - should be 8 chars minimum"),
        confirmPassword: yup.string().required("Please confirm your password")
        .when("password", {
            is: password => (password && password.length > 0 ? true : false),
            then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
        })
    })

    return (
    <>
        {isSignup ? (
            <>
                <h3>You have a property for sale or rent?</h3>
                <h3>you're in the right place, Join us</h3>
            </>
            ) : <h1 className='sailor mt4'>Welcome back!</h1>
        }
        <div className="br3 ba b--black-10 ma4 flex justify-center w-25-ns center-ns shadow-5">
            <main className="w-75-ns w-100 pa3 ma3 bb bt br4 b--black-20">
                    <Formik
                        initialValues={{ email: '', fullname:'', password: '', confirmPassword:'' }}
                        validationSchema={isSignup ? registerValidation : loginValidation}
                        onSubmit={ ({email, fullname, password})=> {
                            isSignup ? createUser({ 
                                    variables: {
                                        name: fullname,
                                        email,
                                        password
                                    },
                                }) : signIn({
                                    variables: {
                                        email,
                                        password
                                    },
                                    update: (store, { data }) => {
                                        if(data.login){
                                            store.writeQuery({
                                                query:Me,
                                                data:{
                                                    Me: [data.login.user]
                                                }
                                            })
                                        }
                                    },
                                })
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <legend className="lh-title tracked f2 fw6 center ttu sailor">{isSignup ? 'Sign Up' : 'Sign in'}</legend>
                                {isSignup && (
                                <div className="mt4">
                                    <label className="db fw6 lh-copy f6 sailor">FullName</label>
                                    <Field className="pa2 input-reset ba bg-transparent hover-bg-sailor hover-white w-75 br2 sailor" name="fullname"/>
                                    {errors.fullname && touched.fullname && (<div className='red mt1'>{errors.fullname}</div>)}
                                </div>
                                )}
                                <div className="mt4">
                                    <label className="db fw6 lh-copy f6 sailor">Email</label>
                                    <Field className="pa2 input-reset ba bg-transparent hover-bg-sailor hover-white w-75 br2 sailor" type="email" name="email"/>
                                    {errors.email && touched.email && (<div className='red mt1'>{errors.email}</div>)}
                                </div>
                                <div className="mv4">
                                    <label className="db fw6 lh-copy f6 sailor">Password</label>
                                    <Field className="pa2 input-reset ba bg-transparent hover-bg-sailor hover-white w-75 br2 sailor" type="password" name="password"/>
                                    {errors.password && touched.password && (<div className='red mt1'>{errors.password}</div>)}
                                </div>
                                {isSignup ? (
                                    <>
                                        <div className="mv4">
                                            <label className="db fw6 lh-copy f6 sailor">Confirm password</label>
                                            <Field className="b pa2 input-reset ba bg-transparent hover-bg-sailor hover-white w-75 br2 sailor" 
                                                type="password" name="confirmPassword"/>
                                            {errors.confirmPassword && touched.confirmPassword && (<div className='red mt1'>{errors.confirmPassword}</div>)}                                        
                                        </div>
                                            {formErrors.length > 0 && (<div className='red fw6'>{formErrors}</div>)}
                                        <button className='ma2 ph4 pv2 br3 b--sailor bg-transparent grow pointer fw6 butt' type='submit'>
                                            Join Broker
                                        </button>
                                        <div className="lh-copy mt3">
                                            <p className='f6 sailor'>Already have an account?</p>
                                            <Link to="/signin" className="f4 link dim db underline mt3 sailor">Sign in</Link>
                                        </div>
                                    </> 
                                ) : (
                                    <>  
                                        {formErrors.length > 0 && (<div className='red fw6'>{formErrors}</div>)}
                                        <button className='ma2 ph4 pv2 br3 b--sailor bg-transparent butt fw6' type='submit'>
                                            let me in
                                        </button>
                                        <div className="lh-copy mt3">
                                            <Link to="/register" className="f4 link grow db underline mb4 sailor">Sign up</Link>
                                            <a href="#0" className="f6 link dim db underline sailor">Forgot your password?</a>
                                        </div>
                                    </>
                                )}
                            </Form>
                        )}
                    </Formik>
            </main>
        </div>
        
    </>
    
)}
export default View;