import React, { useState, useEffect } from 'react';
import "./Schedule.css";
import BackArrow from "../Components/BackArrow/BackArrow";
import ScheduleCard from "../Components/ScheduleCard/ScheduleCard";
import AddSchedBtn from "../Components/AddSchedBtn/AddSchedBtn";
import TrashBtn from "../Components/TrashBtn/TrashBtn";
import Confirmation from '../Components/Confirmation/Confirmation';
function Schedule({ updatePage }) {
    const [editMode, setEditMode] = useState(false);
    const [toDelete, setToDelete] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
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
            setShowConfirmation(true);
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
    const handleConfirmationCancel = () => {
        //just hide cancel 
        setShowConfirmation(false);
    }
    const updateSchedules = () => {
        fetch("/schedule/list")
            .then(res => res.json())
            .then(({ data, ok }) => {
                if (ok === true) {
                    setSchedules(data);
                }
            }).catch(err => {
                console.log("handle err getting schedules", err);
            })
    }
    const deleteData = (data) => {
        const body = { list: data };
        fetch("/schedule/delete", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            method: "DELETE",
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(({ msg }) => {
                alert(msg);
                updateSchedules();
            }).catch(err => {
                console.log("handle err getting schedules", err);
            })
    }
    const handleConfirmationConfirm = () => {
        //send delete to backend
        console.log("send delete data");
        //send copy of delete list
        deleteData([...toDelete]);
        //cleanup
        setShowConfirmation(false);
        setEditMode(false);
        setToDelete([]);
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
            {showConfirmation ? <Confirmation title={`Deleting ${toDelete.length} schedules`} body={"Are you sure you want to delete these schedules"} confirmationBtnText={"Delete"} handleCancel={handleConfirmationCancel} handleConfirm={handleConfirmationConfirm} /> : ""}
        </section>
    );
}

export default Schedule;