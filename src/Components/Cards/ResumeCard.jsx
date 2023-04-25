import "./ResumeCard.css";

import React, { useState } from "react";

const ResumeCard = ({ title, onClick, onDelete, onClone }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen((open) => !open);
  };
  return (
    <div className='resume-card'>
      <h3 onClick={onClick}>{title ? title : "Untitled"}</h3>
      <div
        className={"resume-card-drop-down" + (dropDownOpen ? " open" : "")}
        onClick={toggleDropdown}
      >
        <button>
          {!dropDownOpen ? (
            <i className='fa-solid fa-ellipsis-vertical'></i>
          ) : (
            <i className='fa-solid fa-xmark'></i>
          )}
        </button>
        <div className='resume-card-drop-down-options'>
          <button onClick={onClone}>Clone</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
