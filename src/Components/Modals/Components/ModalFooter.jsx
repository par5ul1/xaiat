const ModalFooter = ({ data, toggleModal, onDelete, onSave, isNew }) => {
  const hasData =
    data &&
    Object.values(data).reduce((prev, curr) => prev || curr.length > 0, false);

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
        disabled={!hasData}
      >
        Save
      </button>
    </div>
  );
};

export default ModalFooter;
