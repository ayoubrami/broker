import React from 'react'
import 'tachyons'
import './styles/main.scss'
import { Header, Footer} from '../../components'

const View = ({children}) => (
    <>
        <Header />
            <div className="min-vh-100 flex flex-column">{children}</div>
        <Footer/>
    </>
)

export default View;