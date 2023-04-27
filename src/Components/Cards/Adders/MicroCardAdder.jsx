import "./MicroCardAdder.css";

import TextInput from "../../General/TextInput";
import { is } from "@babel/types";
import { useState } from "react";

// TODO: Fix prop drilling
// TODO: Needs some TLC
const AddableTextInput = ({
  label,
  placeholder,
  width = "35vw",
  expandable,
  onAdd
}) => {
  const [inputValue, setInputValue] = useState("");

  const updateInputValue = (val) => {
    setInputValue(val);
  };

  const addText = () => {
    onAdd(inputValue.trim());
    setInputValue("");
  };

  const handleSubmit = () => {
    inputValue != "" ? addText() : undefined;
  };

  return (
    <div className='micro-card-adder'>
      <TextInput
        label={label}
        placeholder={placeholder}
        width={width}
        expandable={expandable}
        updateInputValue={updateInputValue}
        inputValue={inputValue}
        handleSubmit={handleSubmit}
      ></TextInput>
      <button onClick={handleSubmit} className='add-btn'>
        Add
      </button>
    </div>
  );
};

export default AddableTextInput;
