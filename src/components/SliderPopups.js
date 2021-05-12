import Slider from 'rc-slider';
import React, { useRef, useState, useEffect } from 'react'
import './map.css'
import useWindowDimensions from './UseWindowDimensions'
import PopupGroup from './PopupGroup'
import { Visibility, VisibilityOff } from '@material-ui/icons';

// import React, { useEffect, useState } from 'react'
import { GeoJSONLayer } from 'react-mapbox-gl'
import province from './mapSegment'
import {point, polygon, inside} from '@turf/turf'
import {latlong} from "./data"
import predictedValue from "./predicted"

const SliderPopups = (props) => {

  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider)

  const [sliderVal, setSlideVal] = useState(1)
  const { height, width } = useWindowDimensions();
  const popupsRef = useRef()
  // const areaRef = useRef()
  const [popupVisible, setPopupVisible] = useState(true)
  const [areaData, setAreaData] = useState(JSON.parse(JSON.stringify(province)))
  const [provinceIdx, setProvinceIdx] = useState(null)

  let provinceNum2Idx = {}
  const marks = {};
  let temp_area;
  let temp_location;
  let sum;
  let temp_geoJson;

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
  useEffect(() => {
    // console.log(latlong)
    temp_geoJson = JSON.parse(JSON.stringify(areaData))
    for(let i = 0; i < temp_geoJson["features"].length; i++){
        let temp_arr = []
        // console.log(temp_geoJson["features"][i]["properties"]["PM"] == null)
        // temp_geoJson["features"][i]["properties"]["PM"] = 50
        // temp_geoJson["features"][i]["geometry"]["coordinates"][0]
        // console.log(temp_geoJson["features"][i]["geometry"]["coordinates"][0])
        if(temp_geoJson["features"][i]["geometry"]["coordinates"][0].length >= 4){
          for(let idx = 0; idx < latlong.length; idx++){
            // console.log([latlong[idx][0], latlong[idx][1]])
            temp_location = point([latlong[idx][1], latlong[idx][0]])
            temp_area = polygon(temp_geoJson["features"][i]["geometry"]["coordinates"])
            if(inside(temp_location, temp_area)){
              temp_arr.push(idx)
            }
          }
        }
        provinceNum2Idx[i] = temp_arr;
        
        // console.log(temp["features"][i]["properties"])
    }
    setProvinceIdx(provinceNum2Idx)
    // console.log(provinceNum2Idx)
    for(let i = 0; i < temp_geoJson["features"].length; i++){
      if(provinceNum2Idx[i].length == 0){
        temp_geoJson["features"][i]["properties"]["PM"] = 0
      }
      else{
        sum = 0
        for(let j = 0; j < provinceNum2Idx[i].length; j++){
          sum += predictedValue[provinceNum2Idx[i][j]][sliderVal - 1]
          // console.log(predictedValue[provinceNum2Idx[i][j]][sliderVal - 1])
        }
        temp_geoJson["features"][i]["properties"]["PM"] = sum / provinceNum2Idx[i].length
      }
      
    }
    setAreaData(temp_geoJson)
  },[])
  
  const changeAreaColor = e => {
    temp_geoJson = JSON.parse(JSON.stringify(areaData))
    for(let i = 0; i < temp_geoJson["features"].length; i++){
      if(provinceIdx[i].length == 0){
        temp_geoJson["features"][i]["properties"]["PM"] = 0
      }
      else{
        sum = 0
        for(let j = 0; j < provinceIdx[i].length; j++){
          sum += predictedValue[provinceIdx[i][j]][e - 1]
        }
        temp_geoJson["features"][i]["properties"]["PM"] = sum / provinceIdx[i].length
      }
      
    }
    setAreaData(temp_geoJson)
  }

  const handleAfterChange = e => {
    setSlideVal(e)
  }

  const handleChange = e => {
    if (popupsRef.current){
      popupsRef.current.updateVal(e)
    }
    if ( props.onSlideChange ){
      props.onSlideChange(e)
    }
  }

  const setPopupsOn = () => {
    setPopupVisible(true)
  }

  const setPopupsOff = () => {
    setPopupVisible(false)
  }

  const fillPaintOption = {
    "fill-color":[
      "interpolate",
      ["linear"],
      ["get", "PM"],
      0,
      "#FFFFFF",
      50,
      "#00FF00",
      100,
      "#FFFF00",
      150,
      "#FF0000"
    ],
    'fill-opacity': 0.4
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
      <GeoJSONLayer fillPaint={fillPaintOption} data={areaData} />
    </>
  )
}

export default SliderPopups;