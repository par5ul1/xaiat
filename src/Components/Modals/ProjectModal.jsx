import "./Modal.css";

import AddableTextInput from "../Cards/Adders/MicroCardAdder";
import CardList from "../Lists/CardList";
import Header from "../General/Header";
import MicroCard from "../Cards/MicroCard";
import ModalFooter from "./Components/ModalFooter";
import TextInput from "../General/TextInput";
import { useState } from "react";

const ProjectModal = ({ isOpen, toggleModal, data, onDelete }) => {
  const [descriptions, setDescriptions] = useState(
    data ? data.descriptions : []
  );

  const [skills, setSkills] = useState(data ? data.used : []);

  const addDescription = (description) => {
    setDescriptions([...descriptions, description]);
  };

  const removeDescription = (index) => {
    setDescriptions(descriptions.filter((_, i) => i !== index));
  };

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    isOpen && (
      <div className='modal-container'>
        <div className='modal-base'>
          <div className='modal-header'>
            <Header>Project</Header>
          </div>
          <div className='modal-content'>
            <div>
              <TextInput
                label='Name'
                placeholder='e.g. Custom Vespa'
                inputValue={data ? data.name : ""}
              ></TextInput>
            </div>

            <div className='same-line'>
              <TextInput
                label='Short Description'
                placeholder='e.g. Built a Vespa from scratch'
                inputValue={data ? data.shortDescription : ""}
              ></TextInput>
              <TextInput
                label='Date'
                width='25vw'
                inputValue={data ? data.date : ""}
              ></TextInput>
            </div>

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

            <Header large={false}>Skills Used</Header>
            {!skills.length == 0 && (
              <CardList fullWidth={false}>
                {skills.map((skill, index) => (
                  <MicroCard
                    key={"skills" + index}
                    value={skill}
                    width='auto'
                    onDelete={() => removeSkill(index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput onAdd={addSkill}></AddableTextInput>
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

export default ProjectModal;
