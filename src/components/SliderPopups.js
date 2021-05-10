import Slider from 'rc-slider';
import React, { useState } from 'react'
import './map.css'
import { Popup } from 'react-mapbox-gl'
import { coordinates } from './data'
import useWindowDimensions from './UseWindowDimensions'
import predicted from './predicted'

const SliderPopups = (props) => {

  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

  const [sliderVal, setSlideVal] = useState(1)
  const { height, width } = useWindowDimensions();

  const handleAfterChange = e => {
    setSlideVal(e)
  }

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

  const popups = Object.keys(coordinates).map((province,index) => (
    <Popup 
      className="popup-holder"
      coordinates={[coordinates[province][1], coordinates[province][0]]}
      closeButton={true}
      closeOnClick={false}
      offsetTop={-30}
    >
      <span>{province}</span><br />
      <span className='pm-text'><strong>{`${predicted[index][sliderVal-1]} `}</strong>AQI</span>
    </Popup>
  ))

  return (
    <>
      {popups}
      <div className="slider-holder">
        <SliderWithTooltip min={1} max={72} onAfterChange={handleAfterChange} defaultValue={sliderVal} marks={marks} />
      </div>
      <p className="slider-desc-text">next hours to predict</p>
    </>
  )
}

export default SliderPopups;