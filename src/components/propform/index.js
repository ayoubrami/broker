import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik';
import Container from '../../Layout/components/Container';
import Select from '../find/components/select'
import ImageHandler from './components/imageHandler';
import Specs from './components/specs';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import createProp from '../../gql/mutations/createProp';
import AfterSubmission from './components/afterSubmission';
import { ToastContainer, toast } from 'react-toastify'

const PropForm = ({ owner }) => {
    const FILE_SIZE = 1048576;
    const [cities, setCities] = useState([]); 
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [createProperty, { data, error }] = useMutation(createProp, {
        onCompleted: (data) => {
            setIsLoading(false);
            setSubmitted(true)
            toast.success('Looks Great 😀',{
                position: 'top-center'
            })
        },
        onError: () => {
            setIsLoading(false);
            setSubmitted(true)
            toast.error('Something went wrong 🙁',{
                position: 'top-center'
            })
        }
    });

    useEffect(()=>{
        async function fetchData() {
            fetch('https://countriesnow.space/api/v0.1/countries/cities',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({country: 'Morocco'})
            })
                .then(res => res.json())
                .then(cities => setCities(cities.data.sort()))
        }
        fetchData()
    },[]);

    const validationSchema = yup.object().shape({
        title: yup.string().max(50,'Too long title, 50 characters max').required('this field is required'),
        foor: yup.string().required(),
        type: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required('this field is required'),
        price: yup.number().required('this field is required'),
        description: yup.string().required('this field is required'),
        photos: yup.object().shape({
            main_photo: yup.mixed().required('photos are required.')
                .test('fileSize','Thumbnail image is too large!', value => 
                    value && value.size <= FILE_SIZE
                ),
            images: yup.array().min(2,'At least two photos are required')
                .max(5,'maximum 5 photos')
                .test('filesSize','some image is too large!', values => {
                    let isValid = true;
                    values.map( value => {
                        if(value && value.size > FILE_SIZE)
                            isValid = false;
                        return 0;
                    })
                    return isValid;
                })
        })
    });
    const initialValues = {
        title:'', 
        foor:'', 
        type:'', 
        city:'', 
        address:'', 
        price:'', 
        description:'',
        specs:{
            "LivingRoom":"0",
            "BedRoom":"0",
            "BathRoom":"0",
            "Toilet":"0",
            "Kitchen":"0",
            "Garage":"0",
            "Balcony":"0",
            "Basement":"0"
        },
        photos: {
            main_photo: null,
            images:[]
        },
    };

    const upload = async (main_photo, images) => {
        // upload images
        let imgs = images.map(async img => {
            const image = new FormData();
            image.append("file", img);
            image.append("upload_preset", "coolbeans");
            image.append("cloud_name", "ayoubrami");

            const res = await fetch("https://api.cloudinary.com/v1_1/ayoubrami/image/upload", {
                method:"POST",
                body: image
            })
            .then(res => res.json())
            .then(data => { return data.url })
            .catch(err => console.log('error in uploading images: ',err))
            return res;
        });
        // upload thumbnail photo
        const image = new FormData();
        image.append("file", main_photo);
        image.append("upload_preset", "coolbeans");
        image.append("cloud_name", "ayoubrami");
        let thumb = await fetch("https://api.cloudinary.com/v1_1/ayoubrami/image/upload", {
            method:"POST",
            body: image
        })
        .then(res => res.json())
        .then(data => { return data.url  })
        .catch(err => console.log('error in uploading thumbnail: ',err));

        return {
            main_photo: thumb,
            images: imgs
        }            
    }

    const handleSubmit = async ({
        title,
        foor,
        type,
        city,
        address,
        price,
        description,
        specs,
        photos: {
            main_photo,
            images
        }
    }) => {
        setIsLoading(true)
        const data = await upload(main_photo, images)
        if(data && data.images.length === images.length && data.main_photo){
            const imgs = Promise.all(data.images)
            createProperty({
                variables:{
                    owner,
                    title,
                    foor,
                    type,
                    city,
                    address,
                    price,
                    description,
                    specs,
                    main_photo: data.main_photo,
                    images: await imgs,
                }
            });
        }
    }

    return (
        <Container className='mt3'>
            {!submitted ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <h2 className='center sailor'>Proprety Details</h2>
                            <div className='br3 bw1 pa5-ns pa3 ma3 flex flex-column w-60-ns center ba b--mint shadow-4'>
                                <div className="tl ">
                                    <label className="db f9 mb2 sailor">Title</label>
                                    <Field className="pa2-ns pv2 w-100 input-reset b--none br4 bg-transparent shadow-1" name="title" placeholder='Property title'/>
                                    {errors.title && touched.title && (<div className='red mt1'>{errors.title}</div>)}
                                </div>
                                <div className='mt4 tl flex flex-wrap justify-between'>
                                    <Select title='For' items={['Sell','Rent']} onChange={value => setFieldValue('foor',value)}/>
                                    <Select title='Type' items={['Apartment','House']} onChange={value => setFieldValue('type',value)}/>
                                    <Select title='City' items={cities} className='scroll' onChange={value => setFieldValue('city',value)}/>
                                    {( (errors.foor && touched.foor) || (errors.type && touched.type) || (errors.city && touched.city) ) 
                                        && (<div className='red mt1'>these fields are required</div>)
                                    }
                                </div>
                                <div className=" mt4 tl">
                                    <label className="db f9 mb2 sailor">Address</label>
                                    <Field className="pa2-ns pv2 w-100 input-reset b--none br4 bg-transparent shadow-1" name="address" placeholder='Property address'/>
                                    {errors.address && touched.address && (<div className='red mt1'>{errors.address}</div>)}
                                </div>
                                <div className="mt4 tl">
                                    <label className="db f9 mb2 sailor">Price</label>
                                    <Field className="pa2-ns pv2 w-60-ns input-reset b--none br4 bg-transparent shadow-1" name="price" type='number' placeholder='Property price(in MAD)'/>
                                    {errors.price && touched.price && (<div className='red mt1'>{errors.price}</div>)}
                                </div>
                                <div className="mt4 tl">
                                    <label className="db f9 mb2 sailor">Description</label>
                                    <Field className="pa3 w-100 input-reset b--none br4 bg-transparent shadow-1 h3" name="description" as='textarea'  placeholder='Please describe your property' />
                                    {errors.description && touched.description && (<div className='red mt1'>{errors.description}</div>)}
                                </div>
                                <label className="tl f9 mt4 sailor">Property pieces</label>
                                <div className='mt2 bt bb b--black-20 bw1 br3 pa2 flex justify-between'>
                                    <Specs onChange={(name,value) =>  setFieldValue(`specs.${name}`, value)}/>
                                </div> 
                            </div>
                            <h2 className='center sailor pt3'>Proprety Images</h2>
                            <div className='br3 bw1 pa5-ns pa3 ma3 flex flex-column w-60-ns center ba b--mint shadow-4'>
                                <Field name="photos" type="file">
                                    {({ 
                                        form: { setFieldValue, errors},
                                    })=>(
                                        <>
                                            <ImageHandler setFieldValue={setFieldValue}/>
                                            {(errors.photos && touched.photos && errors.photos.main_photo) && (<div className='red mt3'>{errors.photos.main_photo}</div>)}
                                            {(errors.photos && touched.photos && errors.photos.images) && (<div className='red mt1'>{errors.photos.images}</div>)}
                                        </>
                                    )}
                                </Field>
                            </div>
                            <button className='ba bg-white br-pill b--sailor fw6 ma2 mb4 pv2 f4 pointer shadow-5 butt w-60-ns tc' type='submit' disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'SUBMIT'}
                            </button>
                        </Form>
                    )}
                </Formik> ) : (
                <>
                    <ToastContainer/>
                    <AfterSubmission data={data} error={error} setSubmitted={setSubmitted}/>
                </>
            )}
        </Container>
    )
}
export default PropForm;