import React, { useState } from 'react'
import Container from '../Layout/components/Container'
import Find from '../components/find'
import PropsByCity from '../components/propsbycity'
import Search from '../components/search'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import availableCities from '../gql/queries/availableCitites'

const BrowseAll = () => {

    const { loading, data }=useQuery(availableCities)
    const [filters, setFilters]= useState(null)
    const callback = (data) => {
        setFilters(data)
    }
    return(
    <div>
        <Find callback={callback}/>
        { filters && !filters.city && (
        <Container>
            {!loading && data && ( 
                data.Cities.map(({city},i) => 
                    (
                    <div key={i}>
                        <div className='flex justify-between items-center'>
                            <h2 className=''>{city}</h2>
                            <Link to ={`properties/${city}`} className='underline sailor'>See more</Link>
                        </div>
                        <PropsByCity city={city}/>
                    </div>
                   
                ))
            )}
          
        </Container>)}
        { filters && filters.city && (
            <Search filters={filters}/>
        )}
    </div>    
)};

export default BrowseAll;