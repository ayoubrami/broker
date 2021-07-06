import View from './View'
import {compose, withHandlers, withStateHandlers} from 'recompose'
const enhance = compose(
    withStateHandlers(
        ()=>({
            Filters:{
                foor: null,
                type: null,
                price: null,
                city: null
            }
        }),
        {
            setFilters : ({Filters: prevFilters}) => Filters => ({
                Filters:{
                    ...prevFilters,
                    ...Filters
                }
            })
        }
    ),

    withHandlers({
        handleFilters : ({setFilters}) => filters => {
            setFilters({
                ...filters
            })
        },
    }),

)
export default enhance(View);