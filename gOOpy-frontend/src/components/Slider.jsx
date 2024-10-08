import React, { useState, useEffect } from 'react';
function Slider({
    defaultValue,
    callback,
    callbackParams = [],
    max = 5,
    min = -5,
}) {
    const [val, setVal] = useState(defaultValue);
    useEffect(() => setVal(defaultValue), [defaultValue]);

    return (
        <input
            className='grow'
            value={val}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setVal(newValue);
                callback(newValue, ...callbackParams);
            }}
            type='range'
            min={min}
            max={max}
            step='0.001'
        ></input>
    );
}

export default Slider;
