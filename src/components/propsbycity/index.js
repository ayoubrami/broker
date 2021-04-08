import React from 'react'
import allProps from '../../gql/queries/allProps'
import Carousel from '../carousel'
import { useQuery } from '@apollo/client'

const PropsByCity = ({ city }) => {
    const {loading, data} = useQuery(allProps,{
        variables:{
            city
        }
    });
    return (
        !loading && data &&(
            <Carousel properties={data.Props}/>
        )
    )
}
export default PropsByCity;