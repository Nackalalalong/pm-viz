import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'rc-slider/assets/index.css';
import SliderPopups from './SliderPopups'

const MapBox = () => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoicGV3dDE0MDMiLCJhIjoiY2tqeTFjYTZkMDlpdTJvcGgxOXVzdG05aSJ9.KLyvIrr_3X4ETvkFdYzE0g"
  });

  const polygonPaint = {
    'fill-color': "#ff0000",
    'fill-opacity': 0.3
  }

  return (
      <Map
        style="mapbox://styles/mapbox/dark-v10"
        center={[100.5316, 13.7386]}
        zoom={[5]}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <SliderPopups />
      </Map>   
  );

}

export default MapBox;