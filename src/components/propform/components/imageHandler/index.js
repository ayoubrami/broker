import React, { useState, useEffect } from 'react';

const ImageHandler = ({ setFieldValue }) => {
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailURL, setThumbnailURL] = useState(null)
    const [images, setImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);
    const thumbnailinput = React.useRef(null);
    const imagesinput = React.useRef(null);


    const handleThumbnail = event => {
        setThumbnail(...event.target.files);
    }
    const handleImages = event => {
        setImagesURL([]);
        setImages((prevState) => [...prevState, ...event.target.files]);
    }
    const removeImage = index => {
        let newImages = images.filter((_,i) => i !== index );
        setImagesURL([]);
        setImages(newImages);
    }

    useEffect(()=> {
        if (thumbnail && !thumbnailURL) 
            setThumbnailURL(URL.createObjectURL(thumbnail));
        if(images.length > imagesURL.length)
            images.map(image => setImagesURL((prevState) => [...prevState,URL.createObjectURL(image)]));
        if(thumbnail && images.length >= 2) {
            setFieldValue('photos', {
                main_photo: thumbnail,
                images
            });
        }
    },[images, imagesURL, thumbnail, thumbnailURL, setFieldValue])
   
    return (
        <>
            <div className='pv3 mb4 ba b--black-20 bw1 br2 w-70-ns center '>
                {thumbnailURL ? (
                    <div className='w-70 center flex flex-column items-end relative'>
                        <button className='ba br-pill b--white bg-red z-1 absolute grow pointer mt1 mr1 white' type='button' onClick={() => {
                            setThumbnailURL(null);
                            setThumbnail(null);
                        }}>
                            x
                        </button>
                        <img alt='Thumbnail' width='250' height='200' className='br2 shadow-1 z-0' src={thumbnailURL}/>
                    </div>
                ) :
                (
                    <div className='ba br2 b--dashed w-70 flex flex-column  center pv5 pointer' onClick={()=> thumbnailinput.current.click()}>
                        <span className='mb2'>
                            Add thumbnail image
                        </span>
                        <span className='f7'>(Max image size is 1Mb)</span>
                        <img alt='' width='60' height='60' src='images/photo.png' className='o-80 grow center'/>
                    </div>
                )}
                <input type="file" accept="image/*" className='dn' ref={thumbnailinput} onChange={handleThumbnail}/>
            </div>
            <div className='pv4 ph3 ba b--black-20 bw1 br2 w-100-ns center pointer'>
                    <div className='flex flex-wrap'>
                        {imagesURL.length ? (
                        <div className='flex-column center'>
                            <div className='flex flex-wrap justify-center pa2 relative'>
                                {imagesURL.map((imagesrc,i) => (
                                    <div key={i}>
                                        <button className='ba br-pill b--white bg-red z-1 absolute grow pointer mt1 mr1 white' type='button' onClick={()=> {removeImage(i)}}>
                                            x
                                        </button> 
                                        <img alt='' width='150' height='100' className='br2 shadow-2 ma1' src={imagesrc}/>
                                    </div>
                                    ))
                                }
                            </div>
                            {imagesURL.length < 5 && (<img alt='' width='50' height='50' src='images/photo.png' className='o-80 grow center' onClick={()=> imagesinput.current.click()}/>)}
                        </div>
                        ) : (
                        <div className='flex flex-column center' onClick={()=> imagesinput.current.click()}>
                            <span>Add up to 5 images</span>
                            <span className='f7'>(Max image size is 1Mb)</span>
                            <img alt='' width='80' height='80' src='images/addPhotos.png' className='o-80 grow center'/>
                        </div>
                        )}
                        <input type="file" accept="image/*" multiple className='dn' ref={imagesinput} onChange={handleImages}/>
                    </div>
            </div>
        </>
    )
}
export default ImageHandler;