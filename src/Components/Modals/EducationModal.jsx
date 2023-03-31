import "./Modal.css";

import AddableTextInput from "../Cards/Adders/MicroCardAdder";
import CardList from "../Lists/CardList";
import Header from "../General/Header";
import MicroCard from "../Cards/MicroCard";
import ModalFooter from "./Components/ModalFooter";
import TextInput from "../General/TextInput";
import { useState } from "react";

const EducationModal = ({ isOpen, toggleModal, data, onDelete }) => {
  const [awards, setAwards] = useState(data ? data.awards : []);

  const [courses, setCourses] = useState(data ? data.courses : []);

  const addAward = (award) => {
    setAwards([...awards, award]);
  };

  const removeAward = (index) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
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
                inputValue={data ? data.institution : ""}
              ></TextInput>
              <TextInput
                label='Start Date'
                width='15vw'
                inputValue={data ? data.startDate : ""}
              ></TextInput>
              <TextInput
                label='End Date'
                width='15vw'
                inputValue={data ? data.endDate : ""}
              ></TextInput>
            </div>

            <TextInput
              label='Degree'
              placeholder='e.g. B.S. in Canister Design'
              inputValue={data ? data.degree : ""}
            ></TextInput>

            <Header large={false}>Awards</Header>
            {!awards.length == 0 && (
              <CardList fullWidth={false}>
                {awards.map((award, index) => (
                  <MicroCard
                    key={"awards" + index}
                    value={award}
                    width='auto'
                    onDelete={() => removeAward(index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={addAward}
              placeholder='Enter an award (e.g. Top Scarer, GPA)'
            ></AddableTextInput>

            <Header large={false}>Relevant Coursework</Header>
            {!courses.length == 0 && (
              <CardList fullWidth={false}>
                {courses.map((course, index) => (
                  <MicroCard
                    key={"courses" + index}
                    value={course}
                    width='auto'
                    onDelete={() => removeCourse(index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={addCourse}
              placeholder='Enter a course (e.g. Scaring 101)'
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

export default EducationModal;
