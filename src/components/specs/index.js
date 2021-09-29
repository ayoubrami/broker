import React from "react";
import Select from "../find/components/select";

const Specs = ({specs}) => {
    return (
        <div className='mt4 bt bb b--light-gray bw1 br3 pa2'>
            <div className='flex justify-between'>
                <Select title='Specs' items={['op1','op2']}/>
                <input className='br2 input-reset'/>
            </div>
        </div>
    )
}
export default Specs;