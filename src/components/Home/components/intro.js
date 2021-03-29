import React from 'react'
import house from '../../../static/images/house.svg'
import { useSpring, animated } from 'react-spring'
import cx from 'classnames'
import { Container } from '../../../Layout/components'
import './styles.scss'
const Intro = () => {
  const effect=useSpring({to: {opacity: 1,marginRight:0}, from: {opacity: 0, marginRight: -500}, config: {duration: 5000}})
    return (
          <Container className='ph4 introGradiant '>
            <div className={cx('bg-left relative flex items-center justify-between')}
                        style={{backgroundImage: `url(${house})`}}
            >
                <div className='w-30'/>
                <animated.div style={effect} className='flex flex-column w-70 h-100 '>
                    <h1 className='fw6 ma4'>Looking for a house, apartement ?</h1>
                    <h1 className='fw6 mr6 ma4'>We got you . . .</h1>
                    <h1 className='fw6 mt4 ml7 '>Find your new home now</h1>
                </animated.div>
            </div>
          </Container>
        )
}
export default Intro;