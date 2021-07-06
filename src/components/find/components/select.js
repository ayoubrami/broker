import React, { useState } from 'react'
import cx from 'classnames'
import PropTypes from "prop-types"
import './styles.scss'

const Select = ({title,items,className,onChange}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [selected, setSelected] = useState(null);
    const onOptionClicked = (value) => ()=> {
        setSelected(value)
        setIsOpen(false)
        onChange(value)
    }
    
    return (
    <div className={cx('f3 br-pill shadow-1',className)}>
        <button className='b--none bg-transparent flex items-center justify-between ph4 pv2 pointer' onClick={toggle}>
            <div className='flex-auto'>
                {isOpen ? (
                    <span>{title}</span>
                ): selected !== null ? (
                    <span className="f6 fw6">{selected}</span>
                ): (
                    <span className="">{title}</span>
                  )}
            </div>
            <div className='mr2'/>
            <img src="/images/arrow_down.svg" alt="" className={cx('',{"rotate-180": isOpen})}/>
        </button>
        {isOpen && (
                <div className='mt2 flex flex-column items-center absolute z-0 br4 shadow-1 bg-white'>
                    {items.map((item,i) => (
                        <button 
                            className={cx('b--none mv1 ph4 br-pill bg-transparent butt w-100 tc f4 pointer',{'bg-sailor white': selected===item})} 
                            onClick={onOptionClicked(item)} 
                            key={i}
                        >
                            {item}
                        </button>
                    ))}
                </div>
        )} 
    </div>
    )
}
Select.protoTypes = {
    title : PropTypes.string,
    items : PropTypes.array,
    onChange : PropTypes.func
}
export default Select;