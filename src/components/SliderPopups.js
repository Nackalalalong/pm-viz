import Slider from 'rc-slider';
import React, { useState } from 'react'
import './map.css'
import { Popup } from 'react-mapbox-gl'

const SliderPopups = (props) => {

  const [sliderVal, setSlideVal] = useState(1)

  const handleAfterChange = e => {
    setSlideVal(e)
    props.handleSlideValueChange(e)
  }

  const marks = {};
  [...Array(72).keys()].forEach(e => {
    marks[e + 1] = { style: '', label: e + 1 }
  });

  const pinCoors = [ // lat long
    [12.60961, 102.10447], // chanthaburi
    [18.796143, 98.979263], // chiangmai
    [14.611752, 99.451660], // kanchanaburi
    [13.736717, 100.523186], // bangkok 
    [16.439625, 102.828728], // konka    [7.19882, 100.5951] // songkkla
  ]

  const popups = pinCoors.map((arr, i) => (
    <Popup
      coordinates={[arr[1], arr[0]]}
      closeButton={true}
      closeOnClick={false}
      offsetTop={-30}
    >
      <p>{sliderVal}</p>
    </Popup>
  ))

  return (
    <>
      {popups}
      <div className="slider-holder">
        <Slider min={1} max={72} onAfterChange={handleAfterChange} defaultValue={sliderVal} marks={marks} />
      </div>
    </>
  )
}

export default SliderPopups;