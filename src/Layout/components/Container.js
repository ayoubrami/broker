import React from 'react';
import cx from 'classnames'
const Container = ({children, className="", ...props}) => (
    <div className={cx('ph4-ns ph3', className)} {...props}>
        <div className='center' style={{maxWidth : 1120}}>
            {children}
        </div>
    </div>
);
export default Container;