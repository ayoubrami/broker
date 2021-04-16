import React from 'react'
import Container from '../../Layout/components/Container'

const Description = ({
    property: {
        price,
        address,
        description,
        specs
    }}) =>{
    return (   
        <Container className='mt3'>
            <div className='flex'>
                <div className='br2 w-70 shadow-1 pa4'>
                    <div className='flex flex-wrap justify-between items-center '>
                        {
                            Object.keys(specs).map(key=>(
                                <div key={key} className='br-pill bg-light-gray flex items-center ph3 mb3'>
                                    <img src={`https://res.cloudinary.com/ayoubrami/image/upload/v1618334650/${key}.svg`} width='25px' height='25px'/>
                                    <p className='mh2 fw5'>{key} : {specs[key]}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='bb b--light-gray mt3'/>
                    <div className='flex flex-column items-start'>
                        <h3>Description :</h3>
                        <p className='tj'>{description}</p>
                    </div>
                    <div className='bb b--light-gray mt3'/>
                    <div className='flex items-center mt3'>
                        <img src={`https://res.cloudinary.com/ayoubrami/image/upload/v1618334650/Location.svg`} width='30px' height='30px'/>
                        <p className='ml3 fw7'>{address}</p>
                    </div>
                    <div className='bb b--light-gray mt3'/>
                    <div className='flex items-center mt3'>
                        <img src={`https://res.cloudinary.com/ayoubrami/image/upload/v1618334650/price-tag.svg`} width='30px' height='30px'/>
                        <p className='ml3 fw7'>{price} MAD</p>
                    </div>
                </div>
                <div className='br2 w-30 shadow-1 pa4 ml3'>
                    agent-info
                </div> 
            </div>
            
        </Container>
)}
export default Description;