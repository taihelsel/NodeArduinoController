import React from "react";
import PropTypes from "prop-types";

export default function ScheduleCard({
  data,
  fillEdit,
  editMode,
  handleBtnClick,
}) {
  const { desc, command, exeTime } = data;
  const setSidebarColor = (cmd) => {
    if (cmd === "power") return "yellow";
    if (cmd.indexOf("temp=") !== -1) {
      const tempCmd = cmd.split("=");
      const temp = parseInt(tempCmd[1]);
      if (temp > 75) return "red";
      if (temp <= 74) return "blue";
    }
    if (cmd.indexOf("temp-") !== -1) return "blue";
    if (cmd.indexOf("temp+") !== -1) return "red";
    return null;
  };
  const cardHighlight = (txt) => <h3 className="schedule-card-highlight">{txt}</h3>;
  const renderEvery = (arr) => {
    if (arr[0] === "day") {
      return ["Every ", cardHighlight(arr[0]), <h4 className="schedule-card-every-splitter">at</h4>, cardHighlight(arr[1])];
    } if (arr[0] === "hours" || arr[0] === "minutes") {
      return ["Every ", cardHighlight(arr[1]), cardHighlight(arr[0])];
    }
    if (arr[0] === "hour") {
      return ["Every ", cardHighlight(arr[0])];
    }

    console.error("something weird happened getting 'every' rendering cards");
    return "";
  };
  const handleDeleteBtnClick = () => {
    handleBtnClick(exeTime);
  };
  const renderDeleteBtn = () => (editMode ? (
    <button type="button" className={`schedule-delete-btn ${fillEdit ? "schedule-delete-btn-fill" : ""}`} onClick={handleDeleteBtnClick}>
                &nbsp;
    </button>
  ) : "");
  return (
    <div className="schedule-card">
      {renderDeleteBtn(editMode)}
      <div className="schedule-card-content">
        <div className={`schedule-card-sidebar schedule-card-sidebar-${setSidebarColor(command.toLowerCase())}`}>&nbsp;</div>
        <ul className="schedule-card-details">
          <li className="schedule-card-row">
            {renderEvery(desc.every)}
          </li>
          <li className="schedule-card-row">
            {desc.task}
            {cardHighlight(desc.command)}
          </li>
        </ul>
      </div>
    </div>
  );
}
ScheduleCard.propTypes = {
  data: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    command: PropTypes.string.isRequired,
    exeTime: PropTypes.string.isRequired,
  }).isRequired,
  fillEdit: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleBtnClick: PropTypes.func.isRequired,
};
