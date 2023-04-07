const ModalFooter = ({
  data,
  toggleModal,
  onDelete,
  canSave,
  onSave,
  isNew
}) => {
  return (
    <div className='modal-footer'>
      <button
        className='cancel-btn'
        onClick={() => {
          if (confirm("Confirm Cancel")) {
            console.warn(
              'If you\'re getting an "Uncaught TypeError: Cannot read properties of undefined..." error, the culprit is likely your autofill manager such as LastPass.'
            );
            toggleModal();
          }
        }}
      >
        Cancel
      </button>
      {!isNew && (
        <button
          className='delete-btn'
          onClick={() => {
            if (confirm("Confirm Delete")) {
              console.warn(
                'If you\'re getting an "Uncaught TypeError: Cannot read properties of undefined..." error, the culprit is likely your autofill manager such as LastPass.'
              );
              toggleModal();
              onDelete();
            }
          }}
        >
          Delete
        </button>
      )}
      <button
        className='save-btn'
        onClick={() => {
          console.warn(
            'If you\'re getting an "Uncaught TypeError: Cannot read properties of undefined..." error, the culprit is likely your autofill manager such as LastPass.'
          );
          toggleModal();
          onSave(data);
        }}
        disabled={!canSave}
      >
        Save
      </button>
    </div>
  );
};

export default ModalFooter;
