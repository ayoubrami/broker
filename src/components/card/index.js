import React from 'react'
import cx from 'classnames'
const Card = ({
    property : {
        type,
        foor,
        title,
        price,
        main_photo,
        agent_logo,
    },
    className=""
}) => (
    <div className={cx('bg-white sailor hover-brand pointer grow ',className)}>
        <div
        className="relative cover bg-center "
        style={{
            height: 0,
            paddingTop: `62%`,
            backgroundImage: `url('${main_photo}')`,
        }}
        >
            <div className='absolute absolute-fill '/>
        </div>
        <div className='pa3 '>
            <div className='flex flex-column items-start'>
                <h5 className='fw6 f6 sailor mv0'>{title}</h5>
                <p className='gray mt2 f6 h1'>
                    {type} For {foor}
                </p>
            </div>
            <div className='mt3 flex items-center justify-between'>
                <img src={agent_logo} alt="agent's logo" className=""/>
                <div className='mh2'/>
                <p className='items-end'>{price} MAD</p>

            </div>
        </div>
    </div>
);

export default Card;