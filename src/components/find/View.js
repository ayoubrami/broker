import React, { useState } from 'react'
import Downshift from 'downshift'
import { useQuery } from '@apollo/client'
import availableCities from '../../gql/queries/availableCitites'
import Select from './components/select'
import Container from '../../Layout/components/Container'
import cx from 'classnames'
const View = ({handleFilters, Filters, callback, isLocated}) => {
    const { loading, data } = useQuery(availableCities)

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const foor = ['Buy','Rent']
    const type = ['Apartement','House']
    const price = ['500-1500 MAD','1500-3000 MAD','3000-and above']
    
    callback(Filters)
    return (
        <Container className=''>
            <form onSubmit={e => {
                    e.preventDefault()
                    if(isLocated)
                        handleFilters({city:isLocated})
                    }} 
                className='br-pill-ns br4 ba b--sailor bw1 ma3 pa3 shadow-1 flex-ns justify-between items-center'
            >
                {!isLocated && (<Downshift onChange={selected => handleFilters({city: selected})}>
                    {({
                        getInputProps,
                        getItemProps,
                        inputValue,
                        selectedItem,
                    }) => (
                        !loading && data && (
                            <div>
                                <input 
                                    {...getInputProps({ placeholder: "Location" })} 
                                    className={cx('b--none br-pill tc f3 pv2 mv0-ns mb3 shadow-1 dim',{'b--':true})}
                                    type='text'
                                    onClick={toggle}
                                    required 
                                />
                                {isOpen && (
                                    <div className='mt2 flex flex-column items-center absolute z-1 br4 shadow-1 bg-white ' onClick={toggle}>
                                        {data.Cities
                                            .filter(item => !inputValue || item.city.toLowerCase().includes(inputValue.toLowerCase()))
                                            .slice(0, 4)
                                            .map((Cities, index) => (
                                                <div
                                                    {...getItemProps({ item: Cities.city })}
                                                    key={index}
                                                    className='mv1 ph4 br-pill butt w-100 butt tc pointer'
                                                    style={{
                                                    fontWeight: selectedItem === Cities.city ? "bold" : "normal"
                                                    }}
                                                    
                                                >
                                                    {Cities.city}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>)
                        )}
                </Downshift>
                )}
                <Select title={'For'} items={foor} onChange={selected => handleFilters({foor: selected})}/>
                <Select title={'Type'} items={type} onChange={selected => handleFilters({type: selected})}/>
                <Select title={'Price'} items={price} onChange={selected => handleFilters({price: selected})}/>
            </form>
        </Container>
    )
}
export default View;