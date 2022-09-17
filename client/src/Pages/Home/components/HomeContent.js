import React, {useState } from "react";
import { setCustomTemp } from "../../../API";
import HomeControls from "./HomeControls";
import TempSlider from "../../../Components/TempSlider/TempSlider";
export default function HomeContent({
    originalTemp,
    setTemp,
    setLoading,
    updatePage,
}) {
    const [currentTemp, setCurrentTemp] = useState(originalTemp);
    const handleSliderChange = (temp) => {
        setCurrentTemp(temp);
    }
    const handleSliderConfirm = () => {
        setLoading(true);
        setCustomTemp(currentTemp, function (success) {
            setLoading(false);
            if (success) {
                setTemp(currentTemp);
                alert("Temp set");
            } else alert("Error setting temp");
        })
    }
    const handleSliderCancel = () => {
        setCurrentTemp(originalTemp);
    }
    const updateTemp = (newTemp) => {
        if (newTemp < 60) setTemp(60);
        else if (newTemp > 86) setTemp(86);
        else setTemp(newTemp);
    }
    return (
        <>
            <TempSlider handleSliderChange={handleSliderChange} tempVal={currentTemp} />
            <HomeControls
                originalTemp={originalTemp}
                currentTemp={currentTemp}
                updateTemp={updateTemp}
                setLoading={setLoading}
                updatePage={updatePage}
                handleSliderConfirm={handleSliderConfirm}
                handleSliderCancel={handleSliderCancel}
            />
        </>
    );
}