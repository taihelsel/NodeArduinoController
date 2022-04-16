import React, { useState } from 'react';
import PowerBtn from "../Components/PowerBtn/PowerBtn";
import TempSlider from "../Components/TempSlider/TempSlider";
import Temp5deg from "../Components/Temp5deg/Temp5deg";
import SetTimerBtn from "../Components/SetTimerBtn/SetTimerBtn";
import CustomSched from "../Components/CustomSchedBtn/CustomSchedBtn";
import "./Home.css";
function Home() {
    const [tempVal, setTempVal] = useState({
        lastVal: 70,
        currentVal: 70,
    });
    const genericPOST = (url) => {
        fetch(url, { method: "POST" })
            .then(res => res.json())
            .then(data => alert(data.msg));
    }
    const powerClick = () => {
        const url = "/power/";
        genericPOST(url);
    }
    const handle5degClick = direction => e => {
        const url = `/temp/${direction === "cold" ? "dec5" : "inc5"}`
        genericPOST(url);
    }
    const handleTimerClick = () => {
        alert("handle timer");
    }
    const handleSchedClick = () => {
        alert("handle sched");
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
                alert(data.msg);
            });

    }
    return tempVal.currentVal === tempVal.lastVal ? (
        <section id="Home">
            <PowerBtn handlePower={powerClick} />
            <TempSlider handleSliderChange={handleSliderChange} tempVal={tempVal.currentVal} />
            <div id="controls-container">
                <div className="home-btns-row">
                    <Temp5deg handleClick={handle5degClick} direction={"cold"} />
                    <Temp5deg handleClick={handle5degClick} direction={"hot"} />
                </div>
                <div className="home-btns-row">
                    <SetTimerBtn handleClick={handleTimerClick} />
                    <CustomSched handleClick={handleSchedClick} />
                </div>
            </div>
        </section>
    ) : (
        <section id="Home">
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