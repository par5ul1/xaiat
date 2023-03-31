const ModalFooter = ({ data, toggleModal, onDelete }) => {
  return (
    <div className='modal-footer'>
      <button className='cancel-btn' onClick={toggleModal}>
        Cancel
      </button>
      {data && (
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
      <button className='save-btn' onClick={toggleModal}>
        Save
      </button>
    </div>
  );
};

export default ModalFooter;
