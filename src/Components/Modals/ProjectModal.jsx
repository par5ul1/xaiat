import "./Modal.css";

import AddableTextInput from "../Cards/Adders/MicroCardAdder";
import CardList from "../Lists/CardList";
import Header from "../General/Header";
import MicroCard from "../Cards/MicroCard";
import ModalFooter from "./Components/ModalFooter";
import TextInput from "../General/TextInput";
import { useState } from "react";

const ProjectModal = ({ isOpen, toggleModal, data, onDelete, onSave }) => {
  const [tempData, setTempData] = useState({
    name: data && data.name ? data.name : "",
    link: data && data.link ? data.link : "",
    shortDescription:
      data && data.shortDescription ? data.shortDescription : "",
    date: data && data.date ? data.date : "",
    descriptions: data && data.descriptions ? data.descriptions : [],
    used: data && data.used ? data.used : []
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
            <Header>Project</Header>
          </div>
          <div className='modal-content'>
            <div>
              <TextInput
                label='Name'
                placeholder='e.g. Custom Vespa'
                inputValue={tempData.name}
                updateInputValue={(val) => updateTempData("name", val)}
              ></TextInput>
            </div>

            <div>
              <TextInput
                label='Link'
                inputValue={tempData.link}
                updateInputValue={(val) => updateTempData("link", val)}
              ></TextInput>
            </div>

            <div className='same-line'>
              <TextInput
                label='Short Description'
                placeholder='e.g. Built a Vespa from scratch'
                inputValue={tempData.shortDescription}
                updateInputValue={(val) =>
                  updateTempData("shortDescription", val)
                }
              ></TextInput>
              <TextInput
                label='Date'
                width='25vw'
                inputValue={tempData.date}
                updateInputValue={(val) => updateTempData("date", val)}
              ></TextInput>
            </div>

            <Header large={false}>Descriptions</Header>
            {!tempData.descriptions.length == 0 && (
              <CardList fullWidth={false}>
                {tempData.descriptions.map((description, index) => (
                  <MicroCard
                    key={"descriptions" + index}
                    value={description}
                    width='auto'
                    onDelete={() =>
                      removeFromArrayInTempData("descriptions", index)
                    }
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={(val) =>
                updateTempData("descriptions", [...tempData.descriptions, val])
              }
              expandable={true}
              placeholder='Enter bullet points one at a time'
            ></AddableTextInput>

            <Header large={false}>Skills Used</Header>
            {!tempData.used.length == 0 && (
              <CardList fullWidth={false}>
                {tempData.used.map((skill, index) => (
                  <MicroCard
                    key={"skills" + index}
                    value={skill}
                    width='auto'
                    onDelete={() => removeFromArrayInTempData("used", index)}
                  ></MicroCard>
                ))}
              </CardList>
            )}
            <AddableTextInput
              onAdd={(val) => updateTempData("used", [...tempData.used, val])}
            ></AddableTextInput>
          </div>
          <ModalFooter
            toggleModal={toggleModal}
            onDelete={onDelete}
            onSave={onSave}
            canSave={tempData.name.length && tempData.date.length}
            data={tempData}
            isNew={!data}
          ></ModalFooter>
        </div>
      </div>
    )
  );
};

export default ProjectModal;
