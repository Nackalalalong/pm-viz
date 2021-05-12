import React, { useEffect, useState } from 'react'
import { GeoJSONLayer } from 'react-mapbox-gl'
import province from './mapSegment'
import turf from '@turf/turf'

const AreaColor = props =>{
    const [areaData, setAreaData] = useState(JSON.parse(JSON.stringify(province)))
    useEffect(() => {
        console.log("EWW")
        let temp = JSON.parse(JSON.stringify(province))
        for(let i = 0; i < temp["features"].length; i++){
            temp["features"][i]["properties"]["PM"] = 50
            // console.log(i)
            // console.log(temp["features"][i]["properties"])
        }
        setAreaData(temp)
    }
    ,[])

    const fillPaintOption = {
        "fill-color":[
          "interpolate",
          ["linear"],
          ["get", "PM"],
          0,
          "#FF0000",
          20,
          "#00FF00",
          100,
          "#0000FF"
        ],
        'fill-opacity': 0.5
      }
    return(
        <GeoJSONLayer fillPaint={fillPaintOption} data={areaData} />
    )
}

export default AreaColor