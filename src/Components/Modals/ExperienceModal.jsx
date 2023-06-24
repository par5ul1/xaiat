import "./Modal.css";

import AddableTextInput from "../Cards/Adders/MicroCardAdder";
import CardList from "../Lists/CardList";
import Header from "../General/Header";
import MicroCard from "../Cards/MicroCard";
import ModalFooter from "./Components/ModalFooter";
import TextInput from "../General/TextInput";
import { useState } from "react";

const ExperienceModal = ({ isOpen, toggleModal, data, onDelete, onSave }) => {
  const [tempData, setTempData] = useState({
    company: data ? data.company : "",
    titles: data ? data.titles : [{ title: "", startDate: "", endDate: "" }],
    descriptions: data ? data.descriptions : []
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
            <Header>Experience</Header>
          </div>

          <div className='modal-content'>
            <TextInput
              label='Company'
              placeholder="e.g. Gusteau's"
              inputValue={tempData.company}
              updateInputValue={(val) => updateTempData("company", val)}
            ></TextInput>

            {tempData.titles.map((title, index) => {
              return (
                <div className='same-line' key={"title" + index}>
                  <TextInput
                    label={index === 0 ? "Title(s)" : ""}
                    placeholder='e.g. Head Chef'
                    hint='you can add multiple titles if they share the same description.'
                    inputValue={title.title}
                    updateInputValue={(val) => {
                      let updatedTitle = [...tempData.titles];
                      updatedTitle[index].title = val;
                      updateTempData("titles", updatedTitle);
                    }}
                  ></TextInput>
                  <TextInput
                    label={index === 0 ? "Start Date" : ""}
                    width='12.5vw'
                    inputValue={title.startDate}
                    updateInputValue={(val) => {
                      let updatedTitle = [...tempData.titles];
                      updatedTitle[index].startDate = val;
                      updateTempData("titles", updatedTitle);
                    }}
                  ></TextInput>
                  <TextInput
                    label={index === 0 ? "End Date" : ""}
                    width='12.5vw'
                    inputValue={title.endDate}
                    updateInputValue={(val) => {
                      let updatedTitle = [...tempData.titles];
                      updatedTitle[index].endDate = val;
                      updateTempData("titles", updatedTitle);
                    }}
                  ></TextInput>
                  <button
                    className='mini-btn'
                    onClick={() =>
                      updateTempData("titles", [
                        ...tempData.titles,
                        { title: "", startDate: "", endDate: "" }
                      ])
                    }
                  >
                    <i className='fa-solid fa-plus'></i>
                  </button>
                  {tempData.titles.length > 1 && (
                    <button
                      className='mini-btn'
                      onClick={() => removeFromArrayInTempData("titles", index)}
                    >
                      <i className='fa-solid fa-minus'></i>
                    </button>
                  )}
                </div>
              );
            })}

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
          </div>

          <ModalFooter
            toggleModal={toggleModal}
            onDelete={onDelete}
            onSave={onSave}
            canSave={
              tempData.company.length &&
              tempData.titles[0].title.length &&
              tempData.titles[0].startDate.length &&
              tempData.titles[0].endDate.length
            }
            data={tempData}
            isNew={!data}
          ></ModalFooter>
        </div>
      </div>
    )
  );
};

export default ExperienceModal;
