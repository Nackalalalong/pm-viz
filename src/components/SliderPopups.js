import Slider from 'rc-slider';
import React, { useState } from 'react'
import './map.css'
import { Popup } from 'react-mapbox-gl'
import { coordinates } from './data'

const SliderPopups = (props) => {

  const [sliderVal, setSlideVal] = useState(1)

  const handleAfterChange = e => {
    setSlideVal(e)
  }

  const marks = {};
  [...Array(72).keys()].forEach(e => {
    marks[e + 1] = { style: '', label: e + 1 }
  });

  const popups = Object.keys(coordinates).map(province => (
    <Popup 
      className="popup-holder"
      coordinates={[coordinates[province][1], coordinates[province][0]]}
      closeButton={true}
      closeOnClick={false}
      offsetTop={-30}
    >
      <span>{province}</span><br />
      <span className='pm-text'>{`${sliderVal} AQI`}</span>
    </Popup>
  ))

  return (
    <>
      {popups}
      <div className="slider-holder">
        <Slider min={1} max={72} onAfterChange={handleAfterChange} defaultValue={sliderVal} marks={marks} />
      </div>
      <p className="slider-desc-text">next hours to predict</p>
    </>
  )
}

export default SliderPopups;