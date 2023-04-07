import "./ResumeCard.css";

import React from "react";

const ResumeCard = ({ title, onClick }) => {
  return (
    <div className='resume-card' onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default ResumeCard;
