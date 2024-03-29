import React from "react";
import PropTypes from "prop-types";

export default function LoadingWheel({ loadingStatus }) {
  return loadingStatus ? (
    <div id="loading-overlay">
      <div id="loading-wheel">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 100 100">
          <path fill="none" stroke="#69c1dc" strokeWidth="7" strokeDasharray="200.13936401367187 56.449564208984384" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{ transform: "scale(1)", transformOrigin: "50px 50px" }}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
          </path>
        </svg>
      </div>
    </div>
  ) : null;
}
LoadingWheel.propTypes = {
  loadingStatus: PropTypes.func.isRequired,
};
