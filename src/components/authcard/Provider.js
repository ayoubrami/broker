import { compose, withState, withStateHandler } from 'recompose';

import View from './View'

const enhance = compose(
    withState('user','setUser',null),
    


)

export default enhance(View);