import React from 'react'
import Container from '../../Layout/components/Container'
import Carousel from '../carousel'
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
    </Container>
    
);
}

export default View;