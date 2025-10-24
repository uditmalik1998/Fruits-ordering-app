import React from "react";
import "./Signout.css";

const SignoutPopup = ({ isOpen, onClose, onSignout }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="popup-title">Sign Out</h2>
        <p className="popup-message">
          Are you sure you want to sign out? You'll need to sign in again to
          access your account.
        </p>

        <div className="popup-buttons">
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn signout-btn" onClick={onSignout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutPopup;
