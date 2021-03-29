import React from 'react'
import Container from '../../Layout/components/Container'
import '../Home/components/styles.scss'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl' 
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const View = ({
    handleFoor,
    handleType,
    handleCity,
    handlePrice,
}) => (
        <Container className='findGradiant pv4'>
            <div className='flex items-center justify-between pa2 ba br-pill b--none shadow-1 ph5 pb3'>
                <FormControl className=''>
                    <InputLabel>For</InputLabel>
                    <Select className='ph4' onChange={handleFoor}>
                        <MenuItem value={'Rent'}>Rent</MenuItem>
                        <MenuItem value={'Buy'}>Buy</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className=''>
                    <InputLabel>Type</InputLabel>
                    <Select className='ph4' onChange={handleType}>
                        <MenuItem value={'House'}>House</MenuItem>
                        <MenuItem value={'Apartement'}>Apartement</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className=''>
                    <InputLabel>City</InputLabel>
                    <Select className='ph4' onChange={handleCity}>
                        <MenuItem value={'Casablanca'}>Casablanca</MenuItem>
                        <MenuItem value={'Agadir'}>Agadir</MenuItem>
                        <MenuItem value={'Tiznit'}>Tiznit</MenuItem>
                        <MenuItem value={'Marrakech'}>Marrakech</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className=''>
                    <InputLabel>Price</InputLabel>
                    <Select className='ph4' onChange={handlePrice}>
                        <MenuItem value={'500-1500'}>500-1500 MAD</MenuItem>
                        <MenuItem value={'1500-3000'}>1500-3000 MAD</MenuItem>
                        <MenuItem value={'3000-and above'}>3000-and above</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='mt4'/>
            <div className='flex justify-center'>
                <button className='ba br-pill bg-white sailor b--sailor grow pv2 ph5 butt fw6 shadow-1 pointer'>Find</button>
            </div>
        </Container>
    )

export default View;