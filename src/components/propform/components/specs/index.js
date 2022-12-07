import React from "react";

const Specs = ({onChange}) => {
    const pieces = [
        'LivingRoom',
        'BedRoom',
        'BathRoom',
        'Toilet',
        'Kitchen',
        'Garage',
        'Balcony',
        'Basement'
    ];
    
    const handleChange = (event) => {
        onChange(event.target.name, event.target.value);
    }
    return (
        <>
            <div className='flex flex-column-ns flex-wrap justify-between items-start '>
                {pieces.slice(0,4).map((piece, i) =>(
                    <div className="flex items-center br--right br-pill bg-light-gray ma2" key={i}>
                        <div className="flex items-center bg-mint br--right br-pill pa1">
                            <img alt="" src={`https://res.cloudinary.com/ayoubrami/image/upload/v1618334650/icons/${piece}.svg`} width='25'height='25'/>
                            <span className='f6 ph1'>{piece}</span>
                        </div>
                        <input type="number" min='0' className='w3 b--none mh1 bg-light-gray' placeholder='0' name={piece} onChange={(event) => handleChange(event)}/>
                    </div>
                ))}                
            </div>
            <div className='flex flex-column-ns flex-wrap justify-between items-start '>
                {pieces.slice(4,8).map((piece, i) => (
                    <div className="flex items-center br--right br-pill bg-light-gray ma2" key={i}>
                        <div className="flex items-center bg-mint br--right br-pill pa1">
                            <img alt="" src={`https://res.cloudinary.com/ayoubrami/image/upload/v1618334650/icons/${piece}.svg`} width='25'height='25'/>
                            <span className='f6 ph1'>{piece}</span>
                        </div>
                        <input type="number" min='0' className='w3 b--none mh1 bg-light-gray' placeholder='0' name={piece} onChange={(event) => handleChange(event)}/>
                    </div>
                ))}                
            </div>

        </>
    )
}
export default Specs;