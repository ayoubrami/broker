import React from 'react';
import { Formik, Form, Field} from 'formik'
import { Link } from 'react-router-dom'
const View = ({isSignup}) =>(
    <>
        {isSignup ? (
            <>
                <h2>You have a property for sale or rent?</h2>
                <h2>you're in the right place, Join us</h2>
            </>
            ) : <h1>Welcome back!</h1>}
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 pa3">
            <main className="pa4 black-80">
                    <fieldset className="b--transparent ph0 mh0">
                        <Formik
                            initialValues={{ email: '', password: '', confirmPassword:'' }}
                            onSubmit={ (data)=>{
                                console.log(data)
                            }}
                        >
                            <Form>
                                <legend className="f2 fw6 ph0 mh0 center">{isSignup ? 'Sign Up' : 'Sign in'}</legend>
                                <div className="mt4">
                                    <label className="db fw6 lh-copy f6">Email</label>
                                    <Field className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-75 br2" type="email" name="email" required/>
                                </div>
                                <div className="mv4">
                                    <label className="db fw6 lh-copy f6">Password</label>
                                    <Field className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-75 br2" type="password" name="password" required/>
                                </div>
                                {isSignup ? (
                                    <>
                                        <div className="mv4">
                                            <label className="db fw6 lh-copy f6">Confirm password</label>
                                            <Field className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-75 br2" type="password" name="confirmPassword" required/>
                                        </div>
                                        <button className='ma2 ph4 pv2 input-reset br2 bg-transparent grow pointer fw6 butt' type='submit'>
                                            Join Broker
                                        </button>
                                        <div className="lh-copy mt3">
                                            <p className='f6'>Already have an account?</p>
                                            <Link to="/signin" className="f4 link dim black db underline mt3">Sign in</Link>
                                        </div>
                                    </>
                                    
                                ) : (
                                    <>
                                        <button className='ma2 ph4 pv2 br2 bg-transparent butt fw6' type='submit'>
                                            let me in
                                        </button>
                                        <div className="lh-copy mt3">
                                            <Link to="/register" className="f4 link grow black db underline mb4">Sign up</Link>
                                            <a href="#0" className="f6 link dim black db underline">Forgot your password?</a>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </Formik>
                    </fieldset>
            </main>
        </article>
        
    </>
    
)
export default View;