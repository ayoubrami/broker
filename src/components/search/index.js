import React from 'react'
import { useQuery } from '@apollo/client';
import filtredProps from '../../gql/queries/filtredProps'
import Container from '../../Layout/components/Container'
import Grid from '../grid'

const Search = ({filters: {city, foor, type, price}, isLocated}) =>{
    const { loading, data } = useQuery(filtredProps,{
        variables:{
            city: city || isLocated,
            foor,
            type,
        }
    });
    return(
        !loading && data && (
            <Container className='mt4'>
                { !isLocated && 
                    ( <h2 className='tl'>{ city }</h2> )
                }
                { data.FiltredProps.length > 0 ? 
                    <Grid properties={data.FiltredProps}/> : 
                    <p> Sorry, there's no {type ? type : 'property'} in {city} for {foor} <br/> Please check back later 🙂 </p>
                }
            </Container>
            )
    )
}
export default Search;