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
      <button className='cancel-btn' onClick={toggleModal}>
        Cancel
      </button>
      {!isNew && (
        <button
          className='delete-btn'
          onClick={() => {
            toggleModal();
            onDelete();
          }}
        >
          Delete
        </button>
      )}
      <button
        className='save-btn'
        onClick={() => {
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
