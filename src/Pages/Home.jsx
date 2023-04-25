import "./Home.css";

import { useEffect, useRef, useState } from "react";

import CardList from "../Components/Lists/CardList";
import ResumeCard from "../Components/Cards/ResumeCard";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);

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
      <button className='profile-btn' onClick={() => navigate("/profile")}>
        <i className='fa-solid fa-user'></i>
      </button>
      <button className='settings-btn' onClick={() => navigate("/settings")}>
        <i className='fa-solid fa-gear'></i>
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
                    index
                  }
                })
              }
              onDelete={() => {
                setResumes((resumes) => {
                  resumes.splice(index, 1);
                  return [...resumes];
                });
              }}
              onClone={() => {
                setResumes((resumes) => {
                  const element = resumes[index];
                  resumes.splice(index, 0, element);
                  return [...resumes];
                });
              }}
            />
          ))}
          <button
            className='new-card-btn'
            onClick={() => {
              navigate("/resume/new", {
                state: {
                  index: resumes.length
                }
              });
            }}
          >
            <i className='fa-solid fa-plus'></i>
          </button>
          {/* TEMP: for debug only */}
          {/* <div onClick={() => setResumes([])}>Clear</div> */}
        </CardList>
      </div>
    </>
  );
};

export default Home;
