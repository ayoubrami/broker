import { compose, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import View from './View'
 
const enhance = compose (
    setPropTypes({
        proprieties: PropTypes.array,
    })
)
export default enhance(View);