import React from "react";
import PropTypes from "prop-types";
import ScheduleCard from "./ScheduleCard";

export default function ScheduledEvents({
  toDelete,
  setToDelete,
  schedules,
  editMode,
}) {
  const handleDeleteList = (exeTime) => {
    const newDelList = [...toDelete];
    const index = newDelList.indexOf(exeTime);
    if (index !== -1) newDelList.splice(index, 1);
    else newDelList.push(exeTime);
    setToDelete(newDelList);
  };
  const loadCards = () => {
    const schedKeys = Object.keys(schedules);
    if (schedKeys.legnth === 0) return null;
    return schedKeys.map((key) => {
      const data = schedules[key];
      const fillEdit = toDelete.indexOf(data.exeTime) !== -1;
      return (
        <ScheduleCard
          data={data}
          editMode={editMode}
          fillEdit={fillEdit}
          handleBtnClick={handleDeleteList}
          key={key}
        />
      );
    });
  };
  return (
    <div id="schedule-content">
      {loadCards()}
    </div>
  );
}
ScheduledEvents.propTypes = {
  toDelete: PropTypes.arrayOf(PropTypes.shape({
    exeTime: PropTypes.shape({
      command: PropTypes.string,
      interval: PropTypes.string,
      exeTime: PropTypes.string,
    }),
  })).isRequired,
  setToDelete: PropTypes.func.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.shape({
    exeTime: PropTypes.shape({
      command: PropTypes.string.isRequired,
      interval: PropTypes.string.isRequired,
      exeTime: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  editMode: PropTypes.bool.isRequired,
};
