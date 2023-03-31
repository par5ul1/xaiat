import React from "react";
import { useState } from "react";

const CardAdder = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    document.body.style.overflow = modalOpen ? "unset" : "hidden";
  };

  return (
    <>
      <button className='new-card-btn' onClick={toggleModal}>
        <i className='fa-solid fa-plus'></i>
      </button>

      {modalOpen &&
        React.cloneElement(children, {
          isOpen: modalOpen,
          toggleModal
        })}
    </>
  );
};

export default CardAdder;
