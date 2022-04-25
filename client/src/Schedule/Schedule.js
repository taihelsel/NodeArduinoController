import React, { useState, useEffect } from 'react';
import "./Schedule.css";
import BackArrow from "../Components/BackArrow/BackArrow";
import ScheduleCard from "../Components/ScheduleCard/ScheduleCard";
import AddSchedBtn from "../Components/AddSchedBtn/AddSchedBtn";
import TrashBtn from "../Components/TrashBtn/TrashBtn";
function Schedule({ updatePage }) {
    const [editMode, setEditMode] = useState(false);
    const [toDelete, setToDelete] = useState([]);
    const [schedules, setSchedules] = useState({
        "1650880079787": {
            "exeTime": 1650880079787,
            "command": "temp-4",
            "reoccuring": true,
            "interval": 180,
            "desc": {
                "every": [
                    "hours",
                    "3"
                ],
                "task": "Set",
                "command": "Temp - 4"
            }
        }
    });
    // useEffect(() => {
    //     fetch("/schedule/list")
    //         .then(res => res.json())
    //         .then(({ data, ok }) => {
    //             if (ok === true) {
    //                 setSchedules(data);
    //             }
    //         }).catch(err => {
    //             console.log("handle err getting schedules", err);
    //         })
    // }, [])
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
            const fillEdit = toDelete.indexOf(data.exeTime) !== -1;
            return <ScheduleCard data={data} editMode={editMode} fillEdit={fillEdit} handleBtnClick={handleDeleteList} />
        });
    }
    const handleEditClick = () => {
        if (editMode === true) {
            //cleanup before disabling edit mode
            setToDelete([]);
        }
        setEditMode(!editMode);
    }
    const handleDeleteList = (exeTime) => {
        const newDelList = [...toDelete];
        const index = newDelList.indexOf(exeTime);
        if (index !== -1) newDelList.splice(index, 1);
        else newDelList.push(exeTime);
        setToDelete(newDelList);
    }
    const trashClick = () => {
        console.log("tash");
        if (toDelete.length > 0) {
            console.log("Delete", toDelete);
        }
    }
    const renderFooter = (editMode) => {
        return editMode ? (
            <div id="trash-sched-btn" onClick={trashClick}>
                <TrashBtn />
            </div >
        ) : (
            <div id="add-sched-btn" onClick={addSchedClick}>
                <AddSchedBtn />
            </div >
        )
    }
    return (
        <section id="Schedule">
            <nav>
                <div className="nav-back">
                    <BackArrow handleClick={backArrowClick} />
                </div>
                <div id="edit-controls" onClick={handleEditClick}>
                    <h3>{editMode ? "Cancel" : "Edit"}</h3>
                </div>
            </nav>
            <div id="schedule-content">
                {loadCards()}
            </div>
            {renderFooter(editMode)}
        </section>
    );
}

export default Schedule;