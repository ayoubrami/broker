import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../Layout/components/Container'
import Card from '../card'
import './styles.scss'
const Grid = ({properties}) => (
    <Container>
        <div className='container'>
            {properties && properties.map((property) => (
                <Link key={property.id} to={`property/${property.id}`}>
                    <Card property={property} className='shadow-2'/>
                </Link>
          ))}
        </div>
    </Container>
)
export default Grid;
