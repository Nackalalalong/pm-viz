import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { coordinates } from './data'
import predicted from './predicted'
import MyPopup from './MyPopup'

const PopupGroup = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({

        updateVal(e) {
          setSlideVal(e)
        }
    
      }));

    const [slideVal, setSlideVal] = useState(1)

    const popups = Object.keys(coordinates).map((province,index) => 
        <MyPopup slideVal={slideVal} coordinate={coordinates[province]} data={predicted[index]} province={province} />
    )

    return (
        <>
            {popups}
        </>
    )
})

export default PopupGroup