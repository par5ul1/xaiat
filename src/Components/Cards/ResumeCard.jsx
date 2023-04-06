import "./ResumeCard.css";

import React from "react";

const ResumeCard = ({ title }) => {
  return (
    <div className='resume-card'>
      <h3>{title}</h3>
    </div>
  );
};

export default ResumeCard;
