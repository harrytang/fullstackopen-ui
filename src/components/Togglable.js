/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React, {useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref)  => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = {display: visible ? 'none' : ''};
    const showWhenVisible = {display: visible ? '' : 'none'};

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
});

export default Togglable