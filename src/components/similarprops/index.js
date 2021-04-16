import React from 'react'
import { useQuery } from '@apollo/client'
import similarProps from '../../gql/queries/similarProps'
import Carousel from '../carousel'
import Container from '../../Layout/components/Container'

const SimilarProps = ({ property:{ id, city, type, foor } }) => {
    const {loading, data} = useQuery(similarProps, {
        variables:{
            id,
            city,
            type,
            foor
        }
    })
    return (
        <Container className='mt4'>
            <div className='flex justify-start'>
                <h2 className=''>Similar Properties</h2>
            </div>
            { !loading && data && ( <Carousel properties={data.SimilarProps}/> ) }
        </Container>
    )
}

export default SimilarProps;