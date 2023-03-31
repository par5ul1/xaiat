import "./Header.css";

import Hint from "./Hint";

const Header = ({ children, hint, large = true, width = "auto" }) => {
  return (
    <span className='header' style={{ width }}>
      {large ? <h2>{children}</h2> : <>{children}</>}
      {hint && <Hint>{hint}</Hint>}
    </span>
  );
};

export default Header;
