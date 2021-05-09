import Slider from 'rc-slider';
import React, { useState } from 'react'
import './map.css'

const MySlider = (props) => {

    const [sliderVal, setSlideVal] = useState(1)

    const handleAfterChange = e => {
        setSlideVal(e)
        props.handleSlideValueChange(e)
    }

    return (
        <div className="slider-holder">
            <Slider min={1} max={72} onAfterChange={handleAfterChange} defaultValue={sliderVal} />
        </div>
    )
}

export default MySlider;