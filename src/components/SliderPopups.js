import Slider from 'rc-slider';
import React, { useRef, useState } from 'react'
import './map.css'
import useWindowDimensions from './UseWindowDimensions'
import PopupGroup from './PopupGroup'
import { Visibility, VisibilityOff } from '@material-ui/icons';

const SliderPopups = (props) => {

  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

  const [sliderVal, setSlideVal] = useState(1)
  const { height, width } = useWindowDimensions();
  const popupsRef = useRef()
  const [popupVisible, setPopupVisible] = useState(true)

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
    if (popupsRef.current){
      popupsRef.current.updateVal(e)
    }
  }

  const setPopupsOn = () => {
    setPopupVisible(true)
  }

  const setPopupsOff = () => {
    setPopupVisible(false)
  }

  return (
    <>
      {popupVisible && <PopupGroup ref={popupsRef} initialSlideVal={sliderVal} />}
      <div className="slider-holder">
        <SliderWithTooltip min={1} max={72} onChange={handleChange} onAfterChange={handleAfterChange} defaultValue={sliderVal} marks={marks} />
      </div>
      <span className="slider-desc-text">next hours to predict</span>
      <div className="popups-toggle-holder">
        {popupVisible && <Visibility className='popups-toggle' onClick={setPopupsOff} />}
        {!popupVisible && <VisibilityOff className='popups-toggle' onClick={setPopupsOn} />}
        <span>toggle popups</span>
      </div>
    </>
  )
}

export default SliderPopups;