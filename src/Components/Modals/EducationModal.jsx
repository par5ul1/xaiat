import "./Modal.css";

import AddableTextInput from "../Cards/Adders/MicroCardAdder";
import CardList from "../Lists/CardList";
import Header from "../General/Header";
import MicroCard from "../Cards/MicroCard";
import ModalFooter from "./Components/ModalFooter";
import TextInput from "../General/TextInput";
import { useState } from "react";

const EducationModal = ({ isOpen, toggleModal, data, onDelete, onSave }) => {
  const [tempData, setTempData] = useState({
    institution: data ? data.institution : "",
    startDate: data ? data.startDate : "",
    endDate: data ? data.endDate : "",
    degree: data ? data.degree : "",
    awards: data ? data.awards : [],
    courses: data ? data.courses : []
  });

  const updateTempData = (key, value) => {
    setTempData({
      ...tempData,
      [key]: value
    });
  };

  const removeFromArrayInTempData = (key, index) => {
    let value = [...tempData[key]];
    value.splice(index, 1);
    setTempData({
      ...tempData,
      [key]: value
    });
  };

  return (
    isOpen && (
      <div className='modal-container'>
        <div className='modal-base'>
          <div className='modal-header'>
            <Header>Education</Header>
          </div>

          <div className='modal-content'>
            <div className='same-line'>
              <TextInput
                label='Institution'
                placeholder='e.g. Monsters University'
                inputValue={tempData.institution}
                updateInputValue={(val) => updateTempData("institution", val)}
              ></TextInput>
              <TextInput
                label='Start Date'
                width='15vw'
                inputValue={tempData.startDate}
                updateInputValue={(val) => updateTempData("startDate", val)}
              ></TextInput>
              <TextInput
                label='End Date'
                width='15vw'
                inputValue={tempData.endDate}
                updateInputValue={(val) => updateTempData("endDate", val)}
              ></TextInput>
            </div>

            <TextInput
              label='Degree'
              placeholder='e.g. B.S. in Canister Design'
              inputValue={tempData.degree}
              updateInputValue={(val) => updateTempData("degree", val)}
            ></TextInput>

            <Header large={false}>Awards</Header>
            {!tempData.awards.length == 0 && (
              <CardList fullWidth={false}>
                {tempData.awards.map((award, index) => (
                  <MicroCard
                    key={"awards" + index}
                    value={award}
                    width='auto'
                    onDelete={() => removeFromArrayInTempData("awards", index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={(val) =>
                updateTempData("awards", [...tempData.awards, val])
              }
              placeholder='Enter an award (e.g. Top Scarer, GPA)'
            ></AddableTextInput>

            <Header large={false}>Relevant Coursework</Header>
            {!tempData.courses.length == 0 && (
              <CardList fullWidth={false}>
                {tempData.courses.map((course, index) => (
                  <MicroCard
                    key={"courses" + index}
                    value={course}
                    width='auto'
                    onDelete={() => removeFromArrayInTempData("courses", index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={(val) =>
                updateTempData("courses", [...tempData.courses, val])
              }
              placeholder='Enter a course (e.g. Scaring 101)'
            ></AddableTextInput>
          </div>

          <ModalFooter
            toggleModal={toggleModal}
            onDelete={onDelete}
            onSave={onSave}
            data={tempData}
            isNew={!data}
          ></ModalFooter>
        </div>
      </div>
    )
  );
};

export default EducationModal;
