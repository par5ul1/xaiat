import Header from "./Header";

// TODO: Templematize the width
// TODO: Needs some TLC
const TextInput = ({
  label,
  placeholder,
  hint,
  width = "35vw",
  updateInputValue,
  inputValue,
  handleSubmit
}) => {
  return (
    <label>
      {label && (
        <>
          <Header hint={hint} large={false} width={width}>
            {label}
          </Header>
          <br />
        </>
      )}
      <input
        onChange={(e) => updateInputValue(e.target.value)}
        onKeyDown={(e) => (e.key == "Enter" ? handleSubmit() : true)}
        style={{ width }}
        type='text'
        placeholder={placeholder}
        value={inputValue}
        data-lpignore
        autoComplete='false'
      />
    </label>
  );
};

export default TextInput;
