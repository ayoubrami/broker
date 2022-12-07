import React,{ useState } from 'react';
import { Container } from '..';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Broker.svg';
import cx from 'classnames'
import './styles.scss'
import { useMutation, useQuery } from '@apollo/client';
import Me from '../../../gql/queries/me'
import logout from '../../../gql/mutations/logout';
const Header= () =>{
    const { loading, data } = useQuery(Me)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [signOut, { client }] = useMutation(logout)
    return (
    <Container>
        <div className='flex items-center justify-between mv3 '>
                <Link to='/' className='w-50 tl'>
                    <img src={logo} alt='logo' className='w5-ns w4'/>
                </Link>
                {!loading && data && data.Me ? (
                        <div className='flex items-center justify-end relative w-50'>
                            <img src={data.Me[0].avatar || 'images/profile.png'} width='54' height='54' alt='avatar' className='ba br-pill bw1 db-ns dn'/>
                            <button 
                                className='flex items-center bg-transparent shadow-1 br-pill b--sailor bw1 ph4-ns pv2 ml2 pointer'
                                onClick={toggle}
                            >
                                <span className='f4-ns'>{data.Me[0].name}</span>
                                <div className='mr2-ns mr1'/>
                                <img src='images/arrow_down.svg' width='24' height='24' alt='' className={cx({"rotate-180": isOpen})}/>
                            </button>
                            {isOpen && (
                                <div className='mt4 flex flex-column items-center absolute z-1 br4 shadow-1 bg-white top-2'>
                                    <Link 
                                        className='b--none flex items-center ph4-ns ph2 mv1 br-pill sailor shadow-hover grow bg-white tc f4 w-100 pointer' 
                                        to='/profile'
                                        onClick={toggle}
                                    >
                                        <img src={data.Me[0].avatar || 'images/profile.png'} width='25' height='25' alt='' className='ba br-pill bw1'/>
                                        <span className='ml1'>Profile</span>
                                    </Link>
                                    <Link 
                                        className='b--none flex items-center ph4-ns ph2 mv1 br-pill sailor shadow-hover grow bg-white tc f4-ns f7 w-100 pointer'
                                        to='/createprop'
                                        onClick={toggle}
                                    >
                                        <img src='images/pen.svg' width='25' height='25' alt=''/>
                                        <span className='ml1 fw5-ns fw6'>Publish a property</span>
                                    </Link>
                                    <Link 
                                        className='b--none flex items-center ph4-ns ph2 mv1 br-pill sailor shadow-hover grow bg-white tc f4-ns f7 w-100 pointer'
                                        to='/myprops'
                                        onClick={toggle}
                                    >
                                        <img src='images/prop.svg' width='25' height='25' alt=''/>
                                        <span className='ml1 fw5-ns fw6'>My properties</span>
                                    </Link>
                                    <button 
                                        className='b--none flex items-center ph4-ns ph2 mv1 br-pill sailor shadow-hover grow tc f4-ns f7 w-100 bg-white'
                                        onClick={async ()=>{
                                            await signOut();
                                            localStorage.removeItem('accessToken');
                                            await client.resetStore();
                                        }}
                                    >
                                        <img src='images/logout.svg' width='25' height='25' alt=''/>
                                        <span className='ml1 fw5-ns fw6'>Logout</span>
                                    </button>
                                </div>
                            )} 
                        </div>
                ):(
                    <>
                        <Link to='/signin'>
                            <button className='ba bg-white br-pill b--sailor bw1 fw6 ma2 ph5 pv3 f4 pointer grow shadow-5 butt db-ns dn'>
                                Sign In
                            </button>
                        </Link> 
                        <Link to='/register'>
                            <button className='ba bg-mint br-pill b--none sailor fw6 f3 ma2 ph5 pv3 grow pointer shadow-hover buttt db-ns dn'>
                                Register
                            </button>
                            <button className='ba bg-mint br-pill b--none sailor fw6 f4 ma2 pv2 ph3 grow pointer shadow-hover buttt dn-ns db'>
                                Join Now
                            </button>
                        </Link>
                    </>
                )}
        </div>
    </Container> 
)}
export default Header;