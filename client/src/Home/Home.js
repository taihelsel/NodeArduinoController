import React, { useState } from 'react';
import "./Home.css";
import {
    togglePower,
    increaseTemp,
    decreaseTemp,
} from '../API';
/* Components */
import PowerBtn from "../Components/PowerBtn/PowerBtn";
import TempSlider from "../Components/TempSlider/TempSlider";
import Temp5deg from "../Components/Temp5deg/Temp5deg";
import SetTimerBtn from "../Components/SetTimerBtn/SetTimerBtn";
import CustomSched from "../Components/CustomSchedBtn/CustomSchedBtn";

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
    const handleTimerClick = () => {
        // alert("handle timer");
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
        const data = { "temp": tempVal.currentVal };
        const url = "/temp/custom/";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                setTempVal({
                    lastVal: tempVal.currentVal,
                    currentVal: tempVal.currentVal,
                });
                setLoading(false);
                alert(data.msg);
            });

    }
    const loadingWheel = (loadingStatus) => {
        return loadingStatus ? (
            <div id="loading-overlay">
                <div id="loading-wheel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 100 100" >
                        <path fill="none" stroke="#69c1dc" strokeWidth="7" strokeDasharray="200.13936401367187 56.449564208984384" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{ "transform": "scale(1)", "transformOrigin": "50px 50px" }}>
                            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate>
                        </path>
                    </svg>
                </div>
            </div>
        ) : null;
    }
    return tempVal.currentVal === tempVal.lastVal ? (
        <section id="Home">
            {loadingWheel(loading)}
            <PowerBtn handlePower={powerClick} />
            <TempSlider handleSliderChange={handleSliderChange} tempVal={tempVal.currentVal} />
            <div id="controls-container">
                <div className="home-btns-row">
                    <Temp5deg handleClick={decreaseTempClick} direction={"cold"} />
                    <Temp5deg handleClick={increaseTempClick} direction={"hot"} />
                </div>
                <div className="home-btns-row">
                    <SetTimerBtn handleClick={handleTimerClick} />
                    <CustomSched handleClick={handleSchedClick} />
                </div>
            </div>
        </section>
    ) : (
        <section id="Home">
            {loadingWheel(loading)}
            <PowerBtn handlePower={powerClick} />
            <TempSlider handleSliderChange={handleSliderChange} tempVal={tempVal.currentVal} />
            <div id="controls-container">
                <div className="home-btns-row">
                    <div className="temp-slider-controls temp-slider-cancel" onClick={handleSliderCancel}><h3>Cancel</h3></div>
                    <div className="temp-slider-controls temp-slider-confirm" onClick={handleSliderConfirm}><h3>Confirm</h3></div>
                </div>
            </div>
        </section>
    )
}

export default Home;