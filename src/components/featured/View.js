import React from 'react'
import Container from '../../Layout/components/Container'
import Carousel from '../carousel'
import data from '../../data.json'
import { Link } from 'react-router-dom'

const View = () => (  
    <Container className=''>
        <div className='flex justify-start'>
            <h2 className=''>Featured Properties</h2>
        </div>
        <Carousel properties={data}/>
        <Link to='#'>
            <button 
                className='ba b--sailor bg-white f4 fw6 br-pill bw1 ph4 pv3 butt shadow-2 mb5 pointer grow'
            >
                Browse all properties
            </button>
        </Link>
    </Container>
);

export default View;