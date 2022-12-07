import React from 'react'
import Container from '../../../../Layout/components/Container'
import success from './success.svg'
import failed from './failed.svg'
import { Link } from 'react-router-dom'

const AfterSubmission = ({ data, error, setSubmitted }) => (
    <Container className='mv7 pv6'>
        <div className='flex flex-wrap justify-center items-center'>
            <img src={error ? failed : success} alt='status' height='100' width='100' />
            {data && data.id &&
                <div className='pa2'>
                    <h3 className='pb2'>Property published successfully</h3>
                    <Link className='bg-white br-pill b--sailor sailor fw7 pa3 f6 pointer shadow-5 butt tc' to={`property/${data.id}`}>
                        Go to your property page
                    </Link>
                </div>
            }
            {error && 
                <div className='pa2'>
                    <h3 className='pb2'>Failed publishing your property</h3>
                    <Link className='bg-white br-pill sailor fw7 ph4 pv3 f6 pointer shadow-5 butt tc' to={`/createprop`} onClick={e=>{
                        e.preventDefault();
                        setSubmitted(false);
                    }}>
                        Retry again
                    </Link>
                </div>
            }
        </div>
    </Container>
);


export default AfterSubmission;