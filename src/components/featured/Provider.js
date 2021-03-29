import { compose, withProps, withState } from 'recompose'
import View from './View'
import getProp from '../Home/actions/getProp'
import data from '../../data.json'
const enhance = compose(
    withState('proprieties','setProprieties',null),
    withProps(({setProprieties})=>{
    setProprieties(data)
    })
)
export default enhance(View);