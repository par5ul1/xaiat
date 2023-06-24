import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Resume from "./Pages/Resume";
import Settings from "./Pages/Settings";
import Tailor from "./Pages/Tailor";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/resume/new' element={<Tailor />} />
        <Route path='/resume/edit' element={<Tailor />} />
        <Route path='/resume/save' element={<Resume />} />
      </Routes>
    </>
  );
};

export default App;
