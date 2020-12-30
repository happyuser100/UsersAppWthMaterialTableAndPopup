import React from "react";
import "./Popup.css";

const Popup = ({salonUserPopupData,closePopup}) => {
  debugger;
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <div className="popup">
          <div className="popup_inner">
            <h1 className="display-4">User: {salonUserPopupData.username}</h1>
            <hr />
            <ul className="list-group w-50">
              <li className="list-group-item">
                Created Date: {salonUserPopupData.createdTime}
              </li>
              <li className="list-group-item">
                Arrived Date: {salonUserPopupData.arriveTime}
              </li>
            </ul>

            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
