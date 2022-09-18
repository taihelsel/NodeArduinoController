import React from "react";
import "./Confirmation.css";

function Confirmation({
  title, body, confirmationBtnText, handleConfirm, handleCancel,
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
          <div className="confirmation-cancel-btn" onClick={handleCancel}>Cancel</div>
          <div className="confirmation-confirm-btn" onClick={handleConfirm}>{confirmationBtnText}</div>
        </div>
      </div>
    </div>
  );
}
export default Confirmation;
