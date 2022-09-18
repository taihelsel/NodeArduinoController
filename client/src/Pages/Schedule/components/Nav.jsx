import React from "react";
import PropTypes from "prop-types";
import BackArrow from "../../../Components/BackArrow/BackArrow";

export default function Nav({
  editMode,
  setToDelete,
  setEditMode,
  updatePage,
}) {
  const backArrowClick = () => {
    updatePage("home");
  };
  const handleEditClick = () => {
    if (editMode === true) setToDelete([]);
    setEditMode(!editMode);
  };
  return (
    <nav>
      <div className="nav-back">
        <BackArrow handleClick={backArrowClick} />
      </div>
      <button type="button" id="edit-controls" onClick={handleEditClick}>
        <h3>{editMode ? "Cancel" : "Edit"}</h3>
      </button>
    </nav>
  );
}
Nav.propTypes = {
  setEditMode: PropTypes.func.isRequired,
  setToDelete: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};
