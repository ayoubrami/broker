import React from 'react'
import Container from '../../Layout/components/Container'
import Carousel from '../carousel'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import featuredProps from '../../gql/queries/featuredProps'
const View = () => {
    const { loading, data} = useQuery(featuredProps);
 
    return (  
    <Container>
        <div className='flex justify-start'>
            <h2 className=''>Featured Properties</h2>
        </div>
        { !loading && data && ( <Carousel properties={data.FeaturedProps}/> ) }
        <Link to='/allproperties'>
            <button 
                className='ba b--sailor bg-white f4 fw6 br-pill bw1 ph4 pv3 butt shadow-2 mb5 mt5 pointer grow'
            >
                Browse all properties
            </button>
        </Link>
        
    </Container>
    
);
}

export default View;