import React from 'react'
import { Link } from 'react-router-dom'
import Media from 'react-media'
import Carousel from 'react-alice-carousel'
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import Card from '../card'

const View = ({
    properties,
    className=''
}) => (
    <div className='relative flex items-center '>
        {
            properties && (
                <Media
                    queries={{
                        small: "(min-width: 30em)",
                        medium: "(min-width: 30em) and (max-width: 60em)",
                        large: "(min-width: 60em)",
                    }}
                >
                    {matches=>
                        (matches.small && properties.length === 1) ||
                        (matches.medium && properties.length === 2) ||
                        (matches.large && properties.length <= 3) ? (
                            <div className=' flex flex-auto items-start'>
                                {properties.map(property=>(
                                   
                                        <Link key={property.id} to='#'>
                                            <Card property={property}/>
                                        </Link>
                                ))}
                            </div>
                        ):(
                            <div className='flex-auto'>
                                <Carousel
                                    autoPlayDirection={'ltr'}
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
                                    infinite={true}
                                    items={properties.map(property=>(
                                            <Link key={property.id} to='#'>
                                                <Card property={property} className='ma3 shadow-2'/>
                                            </Link>
                                    ))}
                                />

                            </div>
                        )
                    }
                </Media>
            )
        }
    </div>
)
export default View;