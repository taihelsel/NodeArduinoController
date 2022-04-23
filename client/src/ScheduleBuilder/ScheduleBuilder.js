import React, { useState } from 'react';
import "./ScheduleBuilder.css";

function ScheduleBuilder({ updatePage }) {
    const [currentStep, setCurrentStep] = useState("schedule");
    const [selectedStepOption, setSelectedStepOption] = useState(null);
    const [schedInput, setSchedInput] = useState("");
    const [nextAction, setNextAction] = useState({ showNext: false, nextStep: null });
    const [schedConfig, setSchedConfig] = useState({
        exeTime: null,
        command: null,
        reoccuring: null,
        interval: null, //min to add each time new schedule is added
        desc: {
            every: null,
            task: null,
            command: null,
        }
    });
    const handleCancel = () => {
        updatePage("schedule")
    }
    const handleNext = () => {
        if (nextAction.showNext === true) {
            setCurrentStep(nextAction.nextStep);
            setNextAction({
                showNext: false,
                nextStep: null,
            });
            setSchedInput("");
        }
    }
    const handleOptionClick = (nextStep, option) => e => {
        setSelectedStepOption(option);
        if (nextStep === "tod-input") {
            const newSchedConfig = { ...schedConfig };
            newSchedConfig.desc.every = ["day"];
            setSchedConfig(newSchedConfig);
            setNextAction({
                showNext: true,
                nextStep,
            })
        }
        if (nextStep === "set-task") {
            if (option === "am" || option === "pm") {
                const newSchedConfig = { ...schedConfig };
                newSchedConfig.desc.every[1] = schedInput + option;
                setSchedConfig(newSchedConfig);
                setNextAction({
                    showNext: true,
                    nextStep,
                });
            }
        }
    }
    const handleSchedInput = e => {
        const val = e.target.value;
        setSchedInput(val);
    }
    const renderCurrentStep = (step) => {
        if (step === "schedule") {
            return (
                <div className="sched-step-container">
                    <h1 className="sched-step-title">Set Schedule</h1>
                    <div className="sched-step-body-row">
                        <div onClick={handleOptionClick("tod-input", "day")} id={selectedStepOption === "day" ? "sched-step-option-selected" : null} className="sched-step-option">Every Day</div>
                        <div onClick={handleOptionClick("x-min-input", "x-minutes")} id={selectedStepOption === "x-minutes" ? "sched-step-option-selected" : null} className="sched-step-option">Every X Minutes</div>
                        <div onClick={handleOptionClick("command", "hour")} id={selectedStepOption === "hour" ? "sched-step-option-selected" : null} className="sched-step-option">Every Hour</div>
                        <div onClick={handleOptionClick("x-hour-input", "x-hour")} id={selectedStepOption === "x-hour" ? "sched-step-option-selected" : null} className="sched-step-option">Every X Hours</div>
                    </div>
                </div>
            )
        }
        if (step === "tod-input") {
            return (
                <div className="sched-step-container">
                    <h1 className="sched-step-title">Set Time</h1>
                    <div className="sched-step-body-column">
                        <input className="sched-step-input" onChange={handleSchedInput} value={schedInput} type="text" />
                        <div className="sched-step-option-container">
                            <div onClick={handleOptionClick("set-task", "am")} id={selectedStepOption === "am" ? "sched-step-option-selected" : null} className="sched-step-option">AM</div>
                            <div onClick={handleOptionClick("set-task", "pm")} id={selectedStepOption === "pm" ? "sched-step-option-selected" : null} className="sched-step-option">PM</div>
                        </div>
                    </div>
                </div>
            )
        }
        if (step === "set-task") {
            return (
                <div className="sched-step-container">
                    {JSON.stringify(schedConfig)}
                </div>
            )
        }
    }
    return (
        <section id="ScheduleBuilder">
            <div id="sched-builder-content">
                {renderCurrentStep(currentStep)}
            </div>
            <div className="sched-builder-controls-container">
                <div className="sched-builder-controls sched-builder-cancel" onClick={handleCancel}><h3>Cancel</h3></div>
                <div className={`sched-builder-controls sched-builder-confirm ${nextAction.showNext === false ? "sched-builder-confirm-disabled" : null}`} onClick={handleNext}><h3>Next</h3></div>
            </div>
        </section>
    );
}
export default ScheduleBuilder;