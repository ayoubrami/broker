import React,{ useState } from 'react'
import { useQuery } from '@apollo/client'
import gallery from '../../gql/queries/gallery'
import { Container } from '../../Layout/components'
import Lightbox from 'react-image-lightbox'
import './grid.scss'


const MyGallery = ({ property:{ id, title, type, foor } }) => {
    const {loading, data}=useQuery(gallery,{
        variables:{
            id
        }
    })

    const [index, setIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    let IMAGES=[];

    if(!loading && data){
        Object.keys(data.Gallery[0]).forEach((key)=>{
            if(data.Gallery[0][key] !== null && data.Gallery[0][key] !== 'Gallery'){
                IMAGES.push({
                    key,
                    photo:data.Gallery[0][key]
                })
            }  
        })
    }
    return (
            <Container className='gradiant pb3'>
                <div className='flex flex-column items-start mb2'>
                    <h1 className='mb0'>{title}</h1>
                    <p>{`${type} For ${foor}`}</p>
                </div>
                <div className='grid-container vh-50 '>
                    {
                        IMAGES.map(({key, photo},index)=>(
                            <div 
                                key={index}
                                className={`${key} pointer dim shadow-2 br2`}
                                onClick={()=>{
                                    setIndex(index)
                                    setIsOpen(true)
                                }}
                                style={{backgroundImage:`url(${photo})`, backgroundSize:'cover'}}
                            />
                        ))
                    }
                    {isOpen && (
                        <Lightbox
                            mainSrc={IMAGES[index]['photo']}
                            nextSrc={IMAGES[(index + 1) % IMAGES.length]['photo']}
                            prevSrc={IMAGES[(index + IMAGES.length - 1) % IMAGES.length]['photo']}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>setIndex((index + IMAGES.length - 1) % IMAGES.length)}
                            onMoveNextRequest={() =>setIndex((index + 1) % IMAGES.length)}
                        />
                    )}
                </div>
            </Container>
        
           );
}

export default MyGallery;