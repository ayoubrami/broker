import React from 'react';
import Container from '../Container'
import { Link } from 'react-router-dom'
const Footer = () =>(
    <Container className='bg-sailor pv4'>
        <div className='flex flex-wrap justify-between mint'>
            <div className='tl mt3'>
                <h4>Contact Us</h4>
                <div className='bt o-20'/>
                <div className='flex pb2'>
                    <img src='images/email.svg' alt=''/>
                    <p className='ml2'>contact@broker.ma</p>
                </div>
                <Link to='https://www.facebook.com/' className='mr3'>
                    <img src='images/facebook.svg' className='grow' wdith='30px' height='25px' alt=''/>
                </Link>
                <Link to='https://www.instagram.com/' className='ml2'>
                    <img src='images/instagram.svg' className='grow' wdith='30px' height='25px' alt=''/>
                </Link>
            </div>
            <div className='tl mt3'>
                <h4>Broker</h4>
                <div className='bt o-20'/>
                <Link to='/terms'><p className='dim'>Terms and conditions</p></Link>
                <Link to='/privacy'><p className='dim'>Privacy policy</p></Link>
            </div>
            <div className='tl mt3'>
                <h4>Newsletter Subscription</h4>
                <div className='bt o-20'/>
                <p>Get the latest properties near you</p>
                <div className='br-pill'>
                    <form>
                        <input type='email' placeholder='Enter your email' className='br--left br-pill tc b--none pv3 ph2-ns' required/>
                        <button type='submit' className='ph4 br--right br-pill b--none pv3 pointer tc bg-mint sailor fw6 grow'>Subscribe</button> 
                    </form>
                </div>
            </div>
        </div>
       <p className='mt6 mb0 mint'>Copyright © 2021 Broker</p>
    </Container>
);
export default Footer;