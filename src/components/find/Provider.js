import View from './View'
import {compose, withState, withHandlers} from 'recompose'

const enhance = compose(
    withState('foor','setFoor',''),
    withState('type','setType',''),
    withState('city','setCity',''),
    withState('price','setPrice',''),

    withHandlers({
        handleFoor: ({setFoor}) => (event) => {
            setFoor(event.target.value)
        },
        handleType: ({setType}) => (event) => {
            setType(event.target.value)
        },
        handleCity: ({setCity}) => (event) => {
            setCity(event.target.value)
        },
        handlePrice: ({setPrice}) => (event) => {
            setPrice(event.target.value)
        }
    }),

)
export default enhance(View);