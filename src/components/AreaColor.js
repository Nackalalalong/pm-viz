import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { GeoJSONLayer } from 'react-mapbox-gl'
import province from './mapSegment'
import {point, polygon, inside} from '@turf/turf'
import {latlong} from "./data"
import predictedValue from "./predicted"

const AreaColor = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({

        changeAreaColor(e) {
            temp_geoJson = JSON.parse(JSON.stringify(areaData))
            for (let i = 0; i < temp_geoJson["features"].length; i++) {
                if (provinceIdx[i].length == 0) {
                    temp_geoJson["features"][i]["properties"]["PM"] = 0
                }
                else {
                    sum = 0
                    for (let j = 0; j < provinceIdx[i].length; j++) {
                        sum += predictedValue[provinceIdx[i][j]][e - 1]
                    }
                    temp_geoJson["features"][i]["properties"]["PM"] = sum / provinceIdx[i].length
                }
    
            }
            setAreaData(temp_geoJson)
        }
    
      }));

    const { sliderVal } = props

    const [areaData, setAreaData] = useState(JSON.parse(JSON.stringify(province)))
    const [provinceIdx, setProvinceIdx] = useState(null)

    let temp_area;
    let temp_location;
    let sum;
    let temp_geoJson;
    let provinceNum2Idx = {}

    useEffect(() => {
        temp_geoJson = JSON.parse(JSON.stringify(areaData))
        for (let i = 0; i < temp_geoJson["features"].length; i++) {
            let temp_arr = []
            if (temp_geoJson["features"][i]["geometry"]["coordinates"][0].length >= 4) {
                for (let idx = 0; idx < latlong.length; idx++) {
                    temp_location = point([latlong[idx][1], latlong[idx][0]])
                    temp_area = polygon(temp_geoJson["features"][i]["geometry"]["coordinates"])
                    if (inside(temp_location, temp_area)) {
                        temp_arr.push(idx)
                    }
                }
            }
            provinceNum2Idx[i] = temp_arr;
        }
        setProvinceIdx(provinceNum2Idx)
        for (let i = 0; i < temp_geoJson["features"].length; i++) {
            if (provinceNum2Idx[i].length == 0) {
                temp_geoJson["features"][i]["properties"]["PM"] = 0
            }
            else {
                sum = 0
                for (let j = 0; j < provinceNum2Idx[i].length; j++) {
                    sum += predictedValue[provinceNum2Idx[i][j]][sliderVal - 1]
                }
                temp_geoJson["features"][i]["properties"]["PM"] = sum / provinceNum2Idx[i].length
            }

        }
        setAreaData(temp_geoJson)
        console.log('end effect')
    }, [] )


    const fillPaintOption = {
        "fill-color": [
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

    return <GeoJSONLayer fillPaint={fillPaintOption} data={areaData} />
})

export default AreaColor