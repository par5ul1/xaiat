import "./Card.css";

import React from "react";
import { useState } from "react";

const Card = ({ primary, secondary, tertiary, data, modal }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    document.body.style.overflow = modalOpen ? "unset" : "hidden";
  };

  return (
    <div className='card'>
      <div>
        <h3>{primary}</h3>
        <h5>{secondary}</h5>
        <h6>{tertiary}</h6>
      </div>
      <button className='edit-btn' onClick={toggleModal}>
        <i className='fa-regular fa-pen-to-square'></i>
      </button>
      {modalOpen &&
        React.cloneElement(modal, {
          isOpen: modalOpen,
          toggleModal,
          data
        })}
    </div>
  );
};

export default Card;
