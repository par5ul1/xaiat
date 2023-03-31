import "./Modal.css";

import AddableTextInput from "../Cards/Adders/MicroCardAdder";
import CardList from "../Lists/CardList";
import Header from "../General/Header";
import MicroCard from "../Cards/MicroCard";
import ModalFooter from "./Components/ModalFooter";
import TextInput from "../General/TextInput";
import { useState } from "react";

const ExperienceModal = ({ isOpen, toggleModal, data, onDelete }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [numTitles, setNumTitles] = useState(1);

  const addDescription = (description) => {
    setDescriptions([...descriptions, description]);
  };

  const removeDescription = (index) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const incrementNumTitles = () => {
    setNumTitles((n) => ++n);
  };

  const decrementNumTitles = () => {
    if (numTitles > 1) setNumTitles((n) => --n);
  };

  return (
    isOpen && (
      <div className='modal-container'>
        <div className='modal-base'>
          <div className='modal-header'>
            <Header>Experience</Header>
          </div>

          <div className='modal-content'>
            <TextInput label='Company' placeholder="e.g. Gusteau's"></TextInput>

            {Array(numTitles)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className='same-line' key={"title" + index}>
                    <TextInput
                      label={index === 0 ? "Title(s)" : ""}
                      placeholder='e.g. Head Chef'
                      hint='you can add multiple titles if they share the same description.'
                    ></TextInput>
                    <TextInput
                      label={index === 0 ? "Start Date" : ""}
                      width='12.5vw'
                    ></TextInput>
                    <TextInput
                      label={index === 0 ? "End Date" : ""}
                      width='12.5vw'
                    ></TextInput>
                    <button
                      className='mini-btn'
                      onmouseup='this.style.outline=null;'
                      onClick={incrementNumTitles}
                    >
                      <i className='fa-solid fa-plus'></i>
                    </button>
                    {/* FIXME: Broken. Fix when you have state for all inputs */}
                    {numTitles > 1 && (
                      <button className='mini-btn' onClick={decrementNumTitles}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    )}
                  </div>
                );
              })}

            <Header large={false}>Descriptions</Header>
            {!descriptions.length == 0 && (
              <CardList fullWidth={false}>
                {descriptions.map((description, index) => (
                  <MicroCard
                    key={"descriptions" + index}
                    value={description}
                    width='auto'
                    onDelete={() => removeDescription(index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={addDescription}
              placeholder='Enter bullet points'
            ></AddableTextInput>
          </div>

          <ModalFooter
            toggleModal={toggleModal}
            onDelete={onDelete}
            data={data}
          ></ModalFooter>
        </div>
      </div>
    )
  );
};

export default ExperienceModal;
