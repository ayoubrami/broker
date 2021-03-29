import React from 'react';
import { Container } from '..';
import { Link } from 'react-router-dom';
import logo from '../../../static/images/Broker.svg';
const Header= () =>(
   <Container>
       <div className='flex items-center justify-between mt3'>
            <Link to='/' className=''>
                <img src={logo} alt='logo' width='' height=''/>
            </Link>
            <Link to='/signin'>
                <button className='ba bg-white br-pill b--sailor bw1 fw6 ma2 ph5 pv3 f4 pointer grow shadow-5 butt'>
                    Sign In
                </button>
            </Link> 
            <Link to='/register'>
                <button className='ba bg-mint br-pill b--none sailor fw6 f3 ma2 ph5 pv3 grow pointer shadow-hover buttt'>
                    Register
                </button>
            </Link>
       </div>
   </Container> 
)
export default Header;