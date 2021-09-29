import React, {useEffect, useRef, useState} from 'react'
import Container from '../../Layout/components/Container'
import { Formik, Form, Field} from 'formik'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import updateProfile from '../../gql/mutations/updateProfile'
import deleteProfile from '../../gql/mutations/deleteProfile'
import logout from '../../gql/mutations/logout'
import updatePassword from '../../gql/mutations/updatePassword'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';



const Profile = ({user: { id, name, email, avatar, phone_number }}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(avatar);
    const [serverError, setServerError] = useState(null)
    const inputFile = useRef(null) ;

    const toggle = () => setIsOpen(!isOpen);

    const validationSchema= yup.object().shape({
        phoneNumber: yup.number().required("This field is requried"),
        fullName: yup.string().min(2,'Too Short!').max(50, "Too Long!")
        .required("Please enter your fullname"),
        email: yup.string().email("Invalid email").required("Please enter your email"),
    });
    const passwordValidationSchema = yup.object().shape({
        phoneNumber: yup.number().required("This field is requried"),
        fullName: yup.string().min(2,'Too Short!').max(50, "Too Long!")
        .required("Please enter your fullname"),
        email: yup.string().email("Invalid email").required("Please enter your email"),
        oldPassword: yup.string().required("Please enter your password"),
        newPassword: yup.string().required("Please enter your password") 
        .min(8, "Password is too short - should be 8 chars minimum"),
        confirmPassword: yup.string().required("Please confirm your password")
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    });

    const [update] = useMutation(updateProfile,{
        onCompleted: ({updateProfile}) => {
            if(updateProfile.success && !serverError)
                toast.success("Account updated successfuly",{
                    position: 'top-center'
                });
        }
    });
    const [changePassword] = useMutation(updatePassword,{
        onError: (ApolloError) => {
            setServerError(ApolloError.message)
            toast.error(ApolloError.message,{
                position: 'top-center'
            })
        }
    });
    const [drop] = useMutation(deleteProfile);
    const [signOut,{ client }] = useMutation(logout);

    useEffect(() => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "coolbeans")
        data.append("cloud_name","ayoubrami")
        fetch("https://api.cloudinary.com/v1_1/ayoubrami/image/upload",{
            method:"POST",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if(!data.error)
                setUrl(data.url)
        })
        .catch(err => console.log(err))
    },[image]) 

    const onImageClick = () => {
        inputFile.current.click();
    }
    return (
        <Container className='mt3'>    
            <ToastContainer/>
            <Formik
                initialValues={{fullName: name, email: email, phoneNumber: phone_number, oldPassword:'', newPassword:'', confirmPassword:'' }}
                validationSchema={isOpen ? passwordValidationSchema : validationSchema}
                onSubmit={({email, phoneNumber, fullName, oldPassword, newPassword})=>{
                    if(newPassword && isOpen)
                        changePassword({
                            variables:{
                                id,
                                password: oldPassword,
                                newPassword
                            }
                        });
                    update({
                        variables:{
                            id,
                            name: fullName,
                            email,
                            phone_number: phoneNumber,
                            avatar:url
                        }
                    });
                }}
            >
                {({errors, touched})=>(
                    <Form>
                        <div className='flex flex-column items-center '>
                            <input type='file' name ='avatar' ref={inputFile} style={{display: 'none'}} onChange= {(e)=> {
                                setImage(e.target.files[0]);
                            }}/>
                            <img src={url || 'images/profile.png'} width='275' height='275' alt='' className='br-pill ba b--white dim bw1 pointer shadow-3' onClick={(e)=>{
                                e.preventDefault();
                                onImageClick();
                            }}/>
                            <Field className='mt3 f3 tc b--none' name='fullName' />
                        </div>
                        <div className='br2 shadow-1 pa4 ma3 flex flex-column w-50-ns center'>
                            <div className="mt4 ">
                                <label className="db fw6 f6 mb2">Phone Number</label>
                                <Field className="pa2 ph3 input-reset b--none br3 bg-transparent shadow-1" name="phoneNumber" placeholder='Enter your phone number'/>
                                {errors.phoneNumber && touched.phoneNumber && (<div className='red mt1'>{errors.phoneNumber}</div>)}
                            </div>
                            <div className="mt4">
                                <label className="db fw6 f6 mb2">Email</label>
                                <Field className="pa2 ph3 input-reset b--none bg-transparent br3 shadow-1" type="email" name="email"/>
                                {errors.email && touched.email && (<div className='red mt1'>{errors.email}</div>)}
                            </div>
                            <div className='mt4 tl'>
                                <span className=' db underline pointer' onClick={toggle}>Change password</span>
                                {isOpen && (
                                    <>
                                        <div className='mt3'>
                                            <label className="db fw6 f6 mb2">Password</label>
                                            <Field className="pa2 input-reset b--none bg-transparent br3 shadow-1" type="password" name="oldPassword"/>
                                            {errors.oldPassword && touched.oldPassword && (<div className='red mt1'>{errors.oldPassword}</div>)}
                                        </div>
                                        <div className='mt3'>
                                            <label className="db fw6 f6 mb2">New password</label>
                                            <Field className="pa2 input-reset b--none bg-transparent br3 shadow-1" type="password" name="newPassword"/>
                                            {errors.newPassword && touched.newPassword && (<div className='red mt1'>{errors.newPassword}</div>)}
                                        </div>
                                        <div className='mt3'>
                                            <label className="db fw6 f6 mb2">confirmPassword</label>
                                            <Field className="pa2 input-reset b--none bg-transparent br3 shadow-1" type="password" name="confirmPassword"/>
                                            {errors.confirmPassword && touched.confirmPassword && (<div className='red mt1'>{errors.confirmPassword}</div>)}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='tr mt4'>
                                <button className='ba bg-white br-pill b--sailor fw5 ma2 ph3 pv1 f6 pointer shadow-5 butt' type='submit'>
                                        Update Account
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className=' w-50-ns center flex justify-end mb3 '>
                <button 
                    className='bg-red b--red br-pill white f6 pa2 mt3 pointer dim shadow-1' 
                    onClick={async () => {
                        if(window.confirm("are you sure about deleting your account ? this can't be undone")){
                            drop({
                                variables:{
                                    id
                                }
                            });
                            await signOut();
                            localStorage.removeItem('accessToken');
                            await client.resetStore();
                            <Redirect to='/'/>
                        }
                }}>
                    Delete account
                </button>
            </div>
        </Container>
    )
}
export default Profile;