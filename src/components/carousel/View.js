import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-alice-carousel'
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import Card from '../card'

const View = ({
    properties,
    className=''
}) =>{ 
    const [index, setIndex]=useState(0);
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
            <div className='flex items-center'>
                <div className="f2 ma2 mb5 pointer sailor" onClick={prevSlide} >&lang;</div>
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
                        <Link key={property.id} to='#'>
                            <Card property={property} className='ma3 shadow-2'/>
                        </Link>      
                    )}
                />
                <div className="f2 ma2 mb5 pointer sailor" onClick={nextSlide} >&rang;</div>
            </div>  
        ))
}
export default View;