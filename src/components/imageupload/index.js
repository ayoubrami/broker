import React, { useState, useEffect } from 'react';


const ImageUpload = () => {
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailURL, setThumbnailURL] = useState(null)
    const [images, setImages] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    const thumbnailinput = React.useRef(null);
    const imagesinput = React.useRef(null);

    const handleThumbnail = event => {
        setThumbnail(...event.target.files);
    }
    const handleImages = event => {
        setImages([...event.target.files]);
    }
    useEffect(() => {
        if(thumbnail)
            setThumbnailURL(URL.createObjectURL(thumbnail));
        if(images.length < 1) return;
        const newImageURLS = [];
        images.map(image => newImageURLS.push(URL.createObjectURL(image)));
        setImageURL(newImageURLS);
    },[images,thumbnail]);

    return (
        <>
            <label className="f9 sailor tc mb3 underline">Thumbnail Image</label>
            <div className='pv5 ba b--black-20 bw1 br2 w-70-ns center pointer' onClick={()=> thumbnailinput.current.click()}>
                {thumbnailURL ? (<img alt='' width='250' height='200' className='br3 shadow-2' src={thumbnailURL}/>) : (<img alt='' width='150' height='100' src='images/imageupload.svg' className='o-70 grow'/>)}
                <input type="file" accept="image/*" className='dn' ref={thumbnailinput} onChange={handleThumbnail}/>
            </div>

            <label className="f9 sailor tc mb3 mt5 underline">Property Images</label>
            <div className='pv5 ba b--black-20 bw1 br2 w-100-ns center pointer' onClick={()=> imagesinput.current.click()}>
                {imageURL.length ? (
                    <div className='flex flex-wrap justify-between '>
                        {imageURL.map((imagesrc,i) => (<img alt='' width='150' height='100' className='br3 shadow-2' src={imagesrc} key={i}/>))}
                    </div>
                    ) : (
                    <div className='flex flex-column'>
                        <span>maximum 5 Photos</span>
                        <img alt='' width='150' height='100' src='images/imageupload.svg' className='o-70 grow center'/>
                    </div>
                )}
                <input type="file" accept="image/*" multiple className='dn' ref={imagesinput} onChange={handleImages}/>
            </div>
        </>
    )
}
export default ImageUpload;