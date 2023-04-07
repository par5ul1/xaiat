import { useEffect, useState } from "react";

import localforage from "localforage";
import { useLocation } from "react-router-dom";

const Tailor = () => {
  const location = useLocation();
  const [resume, setResume] = useState(
    location.state?.resumes[location.state?.index]
      ? location.state?.resumes[location.state?.index]
      : {}
  );

  const saveResume = async () => {
    try {
      let newResumes = [...location.state?.resumes];
      newResumes[location.state?.index] = resume;
      await localforage.setItem("resumes", newResumes);
    } catch (err) {
      console.error("Error saving resume to local storage:", err);
    }
  };

  useEffect(() => {
    saveResume();
  }, [resume]);

  return (
    <>
      <div>Hello {true ? "World!" : "Friend!"}</div>
      <button onClick={() => setResume({ ...resume, title: "Rick" })}></button>
    </>
  );
};

export default Tailor;
