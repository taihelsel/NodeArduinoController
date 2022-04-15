import React, { useState } from 'react';
import { CircleSlider } from "react-circle-slider";
import "./TempSlider.css";
function TempSlider() {
    const [tempVal, setTempVal] = useState(70);
    const handleChange = (event) => {
        setTempVal(event.target.valueAsNumber);
    }
    return (
        <div className="temp-slider">
            <CircleSlider
                value={tempVal}
                min={60}
                max={86}
                size={330}
                showTooltip={true}
                gradientColorFrom="#DC6969"
                gradientColorTo="#69C1DC"
                onChange={handleChange}
                tooltipColor="#F3F4F6"
                tooltipSize={48}
                circleColor="#3F434D"
            />
        </div>
    )
}
export default TempSlider;