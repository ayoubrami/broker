import React from 'react'
import { motion } from 'framer-motion'
import './styles.scss'
import { Link } from 'react-router-dom'
const Intro = () => {
  const variants={
    visible: { 
      opacity: 1,
      x:0,
      transition:{
        type:'spring',
        delay: 0.8,
        stiffness: 60,
      } 
    },
    hidden: { opacity: 0, x:'-100vw' },
    hover: {
      scale: 1.1,
      
    }
  }
    return (
      <div className="introGradiant">
        <div className="shape-divider">
          <div className='flex '>
            <motion.img src='images/house.svg' className='w-40 db-ns dn self-center ' width='500' height='450' initial='hidden' animate='visible' variants={variants}/>
            <div className='flex flex-column self-center content-around w-60-ns ma4  '>
              <h1 className='pt3 lh-title fw6 f2-ns sailor tl color-underline '>Looking for a house, apartement ?</h1>
              <motion.h2 className='pt3 fw5 f2-ns sailor tl' variants={variants} whileHover='hover' initial='hidden' animate='visible'>We got you . . .</motion.h2>
              <motion.h2 className='pt3 fw5 f2-ns sailor tl' variants={variants} whileHover='hover' initial='hidden' animate='visible'>Find your new home now</motion.h2>
              <Link to='/allproperties' className='self-end'>
                <button className='ba b--sailor bg-mint f4 fw6 br-pill bw1 pa3 tc butt shadow-2 mt3 mr5 pointer grow '>
                  Discover properties
                </button>
              </Link>
            </div>
          </div>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className='pb3' style={{transform: 'rotate(180deg)'}}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </div>
    )
}
export default Intro;