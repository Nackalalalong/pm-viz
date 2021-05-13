import React, { useEffect, useState } from 'react'
import { Popup } from 'react-mapbox-gl'
import LineGraph from 'react-line-graph'
import { ShowChart } from '@material-ui/icons'

const MyPopup = props => {

    const { province, data, coordinate, slideVal } = props

    const [isGraphShow, setgraphShow] = useState(false)
    const [hoverVal, setHoverVal] = useState(null)

    useEffect(() => {
        setHoverVal(null)
    }, [props.slideVal])

    const handleToggleChart = () => {
        setgraphShow(!isGraphShow)
    }

    const handleGraphHover = e => {
        setHoverVal(e)
    }

    const handleMouseLeaveGraph = () => {
        setHoverVal(null)
    }

    return (
        <Popup
            className="popup-holder"
            coordinates={[coordinate[1], coordinate[0]]}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
        >
            <span>{province}</span>
            <button className='chart-button' onClick={handleToggleChart}>
                {/* <img src={graphIcon} /> */}
                <ShowChart />
            </button>
            <br />
            <span className='pm-text'><strong>{hoverVal && `next ${hoverVal[0]+1} hrs ${hoverVal[1]} ` || `${data[slideVal - 1]} `}</strong>AQI</span>
            {isGraphShow && (
            <div className='line-graph-container' onMouseLeave={handleMouseLeaveGraph}>
                <LineGraph 
                data={data} 
                smoothing={0.3}
                accent='palevioletred'
                fillBelow='rgba(200,67,23,0.1)'
                hover={true}
                onHover={handleGraphHover}
                />
            </div>
            )}
        </Popup>
    )
}

export default MyPopup