import React, { useState } from 'react';
import "./Home.css";
import {
    togglePower,
    increaseTemp,
    decreaseTemp,
    setCustomTemp
} from '../../API';
/* Components */
import {
    PowerBtn,
    MainControls,
    SliderControls,
} from "./components";
import TempSlider from "../../Components/TempSlider/TempSlider";
import LoadingWheel from '../../Components/LoadingWheel/LoadingWheel';

function Home({ updatePage }) {
    const [tempVal, setTempVal] = useState({
        lastVal: 70,
        currentVal: 70,
    });
    const [loading, setLoading] = useState(false);
    const powerClick = () => {
        setLoading(true);
        togglePower(function (success) {
            setLoading(false);
            if (success) alert("Power toggled");
            else alert("Error updating power state");
        })
    }
    const decreaseTempClick = () => {
        setLoading(true);
        const amount = 5; //decrease temp by 5 degrees
        decreaseTemp(amount, function (success) {
            setLoading(false);
            if (success) alert("Temp decreased");
            else alert("Error updating temp");
        });
    }
    const increaseTempClick = () => {
        setLoading(true);
        const amount = 5; //increase temp by 5 degrees
        increaseTemp(amount, function (success) {
            setLoading(false);
            if (success) alert("Temp increased");
            else alert("Error updating temp");
        });
    }
    const handleSchedClick = () => {
        updatePage("schedule")
    }
    const handleSliderChange = (temp) => {
        setTempVal({
            lastVal: tempVal.lastVal,
            currentVal: temp,
        });
    }
    const handleSliderCancel = () => {
        setTempVal({
            lastVal: tempVal.lastVal,
            currentVal: tempVal.lastVal,
        });
    }
    const handleSliderConfirm = () => {
        setLoading(true);
        const newTemp = tempVal.currentVal;
        setCustomTemp(newTemp, function (success) {
            setLoading(false);
            if (success) {
                setTempVal({
                    lastVal: tempVal.currentVal,
                    currentVal: tempVal.currentVal,
                });
                alert("Temp set");
            } else alert("Error setting temp");
        })
    }
    return (
        <section id="Home">
            <LoadingWheel loadingStatus={loading} />
            <PowerBtn handlePower={powerClick} />
            <TempSlider handleSliderChange={handleSliderChange} tempVal={tempVal.currentVal} />
            {
                tempVal.currentVal === tempVal.lastVal ? (
                    <MainControls
                        decreaseTempClick={decreaseTempClick}
                        increaseTempClick={increaseTempClick}
                        handleSchedClick={handleSchedClick}
                    />
                ) : (
                    <SliderControls
                        handleSliderCancel={handleSliderCancel}
                        handleSliderConfirm={handleSliderConfirm}
                    />
                )
            }
        </section>
    )
}

export default Home;