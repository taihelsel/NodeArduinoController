import React from "react";
import PropTypes from "prop-types";
import TrashBtn from "../../../Components/TrashBtn/TrashBtn";
import AddSchedBtn from "./AddSchedBtn";

export default function Footer({
  editMode,
  toDelete,
  setShowConfirmation,
  updatePage,
}) {
  const trashClick = () => {
    if (toDelete.length > 0) setShowConfirmation(true);
  };
  const addSchedClick = () => {
    updatePage("schedulebuilder");
  };
  return editMode === true ? (
    <button type="button" id="trash-sched-btn" onClick={trashClick}>
      <TrashBtn />
    </button>
  ) : (
    <button type="button" id="add-sched-btn" onClick={addSchedClick}>
      <AddSchedBtn />
    </button>
  );
}
Footer.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toDelete: PropTypes.arrayOf(PropTypes.shape({
    exeTime: PropTypes.shape({
      command: PropTypes.string,
      interval: PropTypes.string,
      exeTime: PropTypes.string,
    }),
  })).isRequired,
  setShowConfirmation: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
};
