import React, { useState } from 'react'
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import allProps from '../gql/queries/allProps'
import Container from '../Layout/components/Container'
import Grid from '../components/grid'
import Find from '../components/find'
import Search from '../components/search'
const CitysProps = () => {
    let { city } = useParams();
    const { loading, data } = useQuery(allProps,{
        variables : {
            city
        }
    })
    const [filters, setFilters]= useState(null)
    const callback = (data) => {
        setFilters(data)
    }
    return (
        <Container className=''>
            <Find callback={callback} isLocated={city}/>
            <h1 className='ma5'> { city } </h1>
            { filters && !(filters.foor || filters.type) && !loading && data && (
                <Grid properties={data.Props}/>
            )}
            {filters && (filters.foor || filters.type) && (
                <Search filters={filters} isLocated/>
            )
            }
        </Container>
)}
export default CitysProps;