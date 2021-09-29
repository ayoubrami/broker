import React from 'react'
import Container from '../../Layout/components/Container'
import Carousel from '../carousel'
import { useQuery } from '@apollo/client'
import featuredProps from '../../gql/queries/featuredProps'
const View = () => {
    const { loading, data} = useQuery(featuredProps);
 
    return (  
    <Container>
        <h2 className='tl sailor'>Featured Properties</h2>
        { !loading && data && ( <Carousel properties={data.FeaturedProps}/> ) }        
    </Container>
    
);
}

export default View;