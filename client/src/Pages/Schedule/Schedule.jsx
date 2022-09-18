import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Schedule.css";
import { getSchedules, deleteSchedules } from "../../API";
import {
  Nav,
  ScheduledEvents,
  Footer,
} from "./components";
import Confirmation from "../../Components/Confirmation/Confirmation";

export default function Schedule({ updatePage }) {
  const [editMode, setEditMode] = useState(false);
  const [toDelete, setToDelete] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [schedules, setSchedules] = useState({});
  useEffect(() => {
    getSchedules((success, data) => {
      if (success) setSchedules(data);
      else alert("Error getting schedules");
    });
  }, []);

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };
  const updateSchedules = () => {
    getSchedules((success, data) => {
      if (success) setSchedules(data);
      else alert("Error getting schedules");
    });
  };
  const deleteData = (data) => {
    deleteSchedules(data, (success) => {
      if (success) updateSchedules();
      else alert("Error deleting schedules");
    });
  };
  const resetState = () => {
    setShowConfirmation(false);
    setEditMode(false);
    setToDelete([]);
  };
  const handleConfirmationConfirm = () => {
    // send delete to backend
    deleteData([...toDelete]);
    // cleanup
    resetState();
  };
  return (
    <section id="Schedule">
      <Nav
        editMode={editMode}
        setToDelete={setToDelete}
        setEditMode={setEditMode}
        updatePage={updatePage}
      />
      <ScheduledEvents
        toDelete={toDelete}
        setToDelete={setToDelete}
        schedules={schedules}
        editMode={editMode}
      />
      <Footer
        editMode={editMode}
        toDelete={toDelete}
        setShowConfirmation={setShowConfirmation}
      />
      {showConfirmation ? <Confirmation title={`Deleting ${toDelete.length} schedules`} body="Are you sure you want to delete these schedules" confirmationBtnText="Delete" handleCancel={handleConfirmationCancel} handleConfirm={handleConfirmationConfirm} /> : ""}
    </section>
  );
}

Schedule.propTypes = {
  updatePage: PropTypes.func.isRequired,
};
