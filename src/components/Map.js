import React, { useState } from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = () => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoicGV3dDE0MDMiLCJhIjoiY2tqeTFjYTZkMDlpdTJvcGgxOXVzdG05aSJ9.KLyvIrr_3X4ETvkFdYzE0g"
  });

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
      longitude={arr[1]}
      latitude={arr[0]}>
      <div className="marker"><span></span></div>
    </Marker>
  ))

  const popups = pinCoors.map(arr => (
    <Popup
    latitude={arr[0]}
    longitude={arr[1]}
    // onClose={closePopup}
    closeButton={true}
    closeOnClick={false}
    offsetTop={-30}
  >
    <p>test</p>
  </Popup>
  ))

  return (
    <h1>kuy</h1>
  )

  // return (
  //   <Map
  //     style="mapbox://styles/mapbox/dark-v10"
  //     center={[100.5316,13.7386]}
  //     zoom={[5]}
  //     containerStyle={{
  //       height: '100vh',
  //       width: '100vw'
  //     }}
  //   >
  //     {markers}
  //     {popups}
  //   </Map>
  // );

}

export default MapBox;