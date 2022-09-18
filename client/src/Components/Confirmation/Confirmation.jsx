import React from "react";
import PropTypes from "prop-types";
import "./Confirmation.css";

export default function Confirmation({
  title,
  body,
  confirmationBtnText,
  handleConfirm,
  handleCancel,
}) {
  return (
    <div className="confirmation-background">
      <div className="confirmation">
        <h2 className="confirmation-title">
          {title}
        </h2>
        <div className="confirmation-body">
          {body}
        </div>
        <div className="confirmation-footer">
          <button
            type="button"
            className="confirmation-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirmation-confirm-btn"
            onClick={handleConfirm}
          >
            {confirmationBtnText}
          </button>
        </div>
      </div>
    </div>
  );
}
Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  confirmationBtnText: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};
