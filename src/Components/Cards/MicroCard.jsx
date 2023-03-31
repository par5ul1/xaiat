import "./MicroCard.css";

import DOMPurify from "dompurify";

const MicroCard = ({ value, width = "35vw", onDelete }) => {
  return (
    <span style={{ width }} className='micro-card'>
      <span
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
      ></span>
      <button onClick={onDelete}>
        <i className='fa-solid fa-xmark'></i>
      </button>
    </span>
  );
};

export default MicroCard;
