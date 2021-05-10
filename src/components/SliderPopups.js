import Slider from 'rc-slider';
import React, { useRef, useState } from 'react'
import './map.css'
import useWindowDimensions from './UseWindowDimensions'
import PopupGroup from './PopupGroup'

const SliderPopups = (props) => {

  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

  const [sliderVal, setSlideVal] = useState(1)
  const { height, width } = useWindowDimensions();
  const popupsRef = useRef()

  const marks = {};
  if ( width <= 1600 ){
    [...Array(18).keys()].forEach(e => {
      marks[(e + 1)*4] = { style: '', label: (e + 1)*4 }
    });
  }
  else {
    [...Array(72).keys()].forEach(e => {
      marks[e + 1] = { style: '', label: e + 1 }
    });
  }
  
  const handleAfterChange = e => {
    setSlideVal(e)
  }

  const handleChange = e => {
    popupsRef.current.updateVal(e)
  }

  return (
    <>
      <PopupGroup ref={popupsRef} />
      <div className="slider-holder">
        <SliderWithTooltip min={1} max={72} onChange={handleChange} onAfterChange={handleAfterChange} defaultValue={sliderVal} marks={marks} />
      </div>
      <p className="slider-desc-text">next hours to predict</p>
    </>
  )
}

export default SliderPopups;