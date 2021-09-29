import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-alice-carousel'
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import Card from '../card'
import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

const View = ({
    properties,
}) => { 
    const [index, setIndex] = useState(0);
    const nextSlide = () => {
        if(index < properties.length - 1){
            setIndex(index + 1)
        } 
    }
    const prevSlide = () => {
        if(index > 0){
            setIndex(index - 1)
        } 
    }
    return ( 
        properties && (
            <div className='flex justify-center items-center'>
                <div className="f3 mb5 pointer sailor db-ns dn" onClick={prevSlide} >&lang;</div>
                <Carousel
                    activeIndex={index}
                    mouseTracking
                    disableButtonsControls
                    responsive={{
                    425: {
                        items: 1,
                    },
                    768: {
                        items: 2,
                    },
                    1024: {
                        items: 3,
                    },
                    }}
                    infinite={false}
                    
                    items={properties.map(property=>
                        <Link key={property.id} to={`property/${property.id}`}>
                            <Card property={property} className='ma3 shadow-2'/>
                        </Link>      
                    )}
                />
                <div className="f3 mb5 pointer sailor db-ns dn" onClick={nextSlide} >&rang;</div>
            </div>  
        ))
}
export default compose (
    setPropTypes({
        proprieties: PropTypes.array,
    }) 
)(View);