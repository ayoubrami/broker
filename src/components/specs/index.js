import React from "react";
import Select from "../find/components/select";

const Specs = ({specs}) => {
    return (
            <div className='flex justify-between'>
                <Select title='Specs' items={['op1','op2']}/>
                
            </div>
    )
}
export default Specs;