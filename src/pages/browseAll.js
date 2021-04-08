import React from 'react'
import Container from '../Layout/components/Container'
import Find from '../components/find'
import PropsByCity from '../components/propsbycity'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import availableCities from '../gql/queries/availableCitites'


const BrowseAll = () => {

    const { loading, data }=useQuery(availableCities)
    return(
    <div>
        <Find/>
        <Container className=''>
            {!loading && data && ( 
                data.Cities.map(({city},i) => 
                    (
                    <div classname='' key={i}>
                        <div className='flex justify-between items-center'>
                            <h2 className=''>{city}</h2>
                            <Link to ={`/${city}`} className='underline sailor'>See more</Link>
                        </div>
                        <PropsByCity city={city}/>
                    </div>
                   
                ))
            )}
          
        </Container>
    </div>    
)};

export default BrowseAll;