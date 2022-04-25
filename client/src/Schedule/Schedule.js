import React, { useState, useEffect } from 'react';
import "./Schedule.css";
import BackArrow from "../Components/BackArrow/BackArrow";
import ScheduleCard from "../Components/ScheduleCard/ScheduleCard";
import AddSchedBtn from "../Components/AddSchedBtn/AddSchedBtn";
function Schedule({ updatePage }) {
    const [schedules, setSchedules] = useState({});
    useEffect(() => {
        fetch("/schedule/list")
            .then(res => res.json())
            .then(({ data, ok }) => {
                if (ok === true) {
                    setSchedules(data);
                }
            }).catch(err => {
                console.log("handle err getting schedules", err);
            })
    }, [])
    const backArrowClick = () => {
        updatePage("home");
    }
    const addSchedClick = () => {
        updatePage("schedulebuilder");
    }
    const loadCards = () => {
        const schedKeys = Object.keys(schedules);
        if (schedKeys.legnth === 0) return null;
        return schedKeys.map(key => {
            const data = schedules[key];
            return <ScheduleCard data={data} />
        });
    }
    return (
        <section id="Schedule">
            <nav>
                <div className="nav-back">
                    <BackArrow handleClick={backArrowClick} />
                </div>
                <h3>Edit</h3>
            </nav>
            <div id="schedule-content">
                {loadCards()}
            </div>
            <div id="add-sched-btn">
                <AddSchedBtn handleClick={addSchedClick} />
            </div>
        </section>
    );
}

export default Schedule;