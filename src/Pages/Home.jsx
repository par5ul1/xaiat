import "./Home.css";

import { useEffect, useRef, useState } from "react";

import CardList from "../Components/Lists/CardList";
import ResumeCard from "../Components/Cards/ResumeCard";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);

  // TEMP: This is for debug only
  const newResume = () => {
    setResumes((resumes) => {
      return [...resumes, {}];
    });
  };

  const saveResumes = async () => {
    try {
      await localforage.setItem("resumes", resumes);
    } catch (err) {
      console.error("Error saving resumes to local storage:", err);
    }
  };

  const loadResumes = async () => {
    try {
      const resumes = await localforage.getItem("resumes");
      if (resumes) {
        setResumes(resumes);
      } else {
        console.warn("No resumes found in local storage.");
      }
    } catch (err) {
      console.error("Error loading resumes from local storage:", err);
    }
  };

  const loadedResumes = useRef(false);
  useEffect(() => {
    loadResumes();
    loadedResumes.current = true;
  }, []);

  useEffect(() => {
    loadedResumes.current && saveResumes();
  }, [resumes]);

  return (
    <>
      <button
        href='build.html'
        className='profile-btn'
        onClick={() => navigate("/profile")}
      >
        <i className='fa-solid fa-user'></i>
      </button>
      <div className='container' id='resumes'>
        <h2>Resumes</h2>
        <CardList fullWidth={false}>
          {resumes.map((resume, index) => (
            <ResumeCard
              key={"resume" + index}
              title={resume.title}
              onClick={() =>
                navigate("/resume/edit", {
                  state: {
                    resumes,
                    index
                  }
                })
              }
            />
          ))}
          <button
            className='new-card-btn'
            onClick={() =>
              navigate("/resume/new", {
                state: {
                  resumes,
                  index: resumes.length
                }
              })
            }
          >
            <i className='fa-solid fa-plus'></i>
          </button>
          {/* TEMP: for debug only */}
          <div onClick={() => setResumes([])}>Clear</div>
          <div onClick={() => newResume()}>Add</div>
        </CardList>
      </div>
    </>
  );
};

export default Home;
