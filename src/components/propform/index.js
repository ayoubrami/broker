import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik';
import Container from '../../Layout/components/Container';
import Select from '../find/components/select'
import Specs from '../specs';
const PropForm = () => {
    // const specs = [
    //     {
    //         id: 1,
    //         name: 'BedRoom',
    //         isSelected: false
    //     },
    //     {
    //         id: 2,
    //         name: 'LivingRoom',
    //         isSelected: false
    //     },
    //     {
    //         id: 3,
    //         name: 'Kitchen',
    //         isSelected: false
    //     },
    //     {
    //         id: 4,
    //         name: 'Toilet',
    //         isSelected: false
    //     },
    //     {
    //         id: 5,
    //         name: 'BathRoom',
    //         isSelected: false
    //     },
    //     {
    //         id: 6,
    //         name: 'Garage',
    //         isSelected: false
    //     },
    //     {
    //         id: 6,
    //         name: 'Floors',
    //         isSelected: false
    //     },
    // ]
    const [cities, setCities] = useState([]); 
    useEffect(()=>{
        async function fetchData(){
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
    },[])
    return (
        <Container className='mt3 '>
            <Formik
                initialValues={{title:'', foor:'', type:'', city:'', address:''}}
                //  validationSchema={}
                onSubmit={(data)=> console.log(data)}
            >
                {({errors, touched, setFieldValue})=>(
                    <Form className=''>
                        <h2 className='center sailor'>Proprety Details</h2>
                        <div className='br3 bw1 pa5-ns pa3 ma3 flex flex-column w-60-ns center ba b--mint shadow-4'>
                            <div className="tl ">
                                <label className="db f9 mb2 sailor">Title</label>
                                <Field className="pa2-ns pv2 w-100 input-reset b--none br4 bg-transparent shadow-1" name="title" placeholder='Property title'/>
                                {errors.title && touched.title && (<div className='red mt1'>{errors.title}</div>)}
                            </div>
                            <div className='mt4 tl flex flex-wrap justify-between'>
                                <Select title='For' items={['Sell','Rent']} onChange={value => setFieldValue('foor',value)}/>
                                <Select title='Type' items={['Apartement','House']} onChange={value => setFieldValue('type',value)}/>
                                <Select title='City' items={cities} className='scroll' onChange={value => setFieldValue('city',value)}/>
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
                            <div className='mt4 bt bb b--black-20 bw1 br3 pa2 flex justify-between'>
                                <Select title='Specs' items={['op1','op2']}/>
                                <input className='input-reset'/>
                            </div> 
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
export default PropForm;