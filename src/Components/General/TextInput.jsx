import Header from "./Header";

// TODO: Templematize the width
// TODO: Needs some TLC
const TextInput = ({
  label,
  placeholder,
  hint,
  width = "35vw",
  expandable = false,
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
      {expandable ? (
        <textarea
          rows={1}
          onChange={(e) => updateInputValue(e.target.value)}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit() : true)}
          style={{ width }}
          type='text'
          placeholder={placeholder}
          value={inputValue}
          data-lpignore
          autoComplete='false'
        />
      ) : (
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
      )}
    </label>
  );
};

export default TextInput;
