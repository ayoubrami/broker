import React, { useState } from 'react'
import Intro from '../../components/intro'
import Find from '../../../find'
import Featured from '../../../featured' 
import Search from '../../../search'
import { Link } from 'react-router-dom'
const View = () => {
        const [filters, setFilters] = useState(null)
        const callback= (data) => {
                setFilters(data)
        }
        return (
                <>
                        <Intro/>
                        <Find callback={callback}/>
                        <Featured/>
                        {filters && filters.city && (
                                <Search filters={filters}/>
                        )}
                        <div>
                                <Link to='/allproperties'>
                                        <button 
                                                className='ba b--sailor bg-white f4 fw6 br-pill bw1 ph4 pv3 butt shadow-2 mb5 mt5 pointer grow'
                                        >
                                                Browse all properties
                                        </button>
                                </Link>
                        </div>
                        
                </>
        )
}
export default View;