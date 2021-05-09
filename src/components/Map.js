import React, { useState } from 'react'
import ReactMapboxGl, { Marker, Popup, GeoJSONLayer } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import province from './mapSegment'

const MapBox = () => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoicGV3dDE0MDMiLCJhIjoiY2tqeTFjYTZkMDlpdTJvcGgxOXVzdG05aSJ9.KLyvIrr_3X4ETvkFdYzE0g"
  });

  const [popupData,setPopupData] = useState([
    "test","test","test","test","test","test"
  ])
const polygonPaint = {
    'fill-color': "#ff0000",
    'fill-opacity': 0.3
}

  const [popupOpens,setPopupOpens] = useState([false,false,false,false,false,false])

  const pinCoors = [ // lat long
    [12.60961, 102.10447], // chanthaburi
    [18.796143, 98.979263], // chiangmai
    [14.611752, 99.451660], // kanchanaburi
    [13.736717, 100.523186], // bangkok 
    [16.439625, 102.828728], // konka    [7.19882, 100.5951] // songkkla
  ]

  const markers = pinCoors.map( arr => (
    <Marker
    coordinates={[arr[1], arr[0]]}s
    >
      <div className="marker">asd</div>
    </Marker>
  ))

  const popups = pinCoors.map(arr => (
    <Popup
    coordinates={[arr[1], arr[0]]}
    // latitude={arr[0]}
    // longitude={arr[1]}
    // onClose={closePopup}
    closeButton={true}
    closeOnClick={false}
    offsetTop={-30}
  >
    <p>test</p>
  </Popup>
  ))


  // return (
  //   <h1>kuy</h1>
  // )

  return (
    <>
    <Map
      style="mapbox://styles/mapbox/dark-v10"
      center={[100.5316,13.7386]}
      zoom={[5]}
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
    >
      {markers}
      {popups}
      <GeoJSONLayer fillPaint={polygonPaint} data={province}/>
    </Map>
    <Slider />
    <Range />
    
    </>
  );

}

export default MapBox;