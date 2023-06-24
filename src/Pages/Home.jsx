import "./Home.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import CardList from "../Components/Lists/CardList";
import ResumeCard from "../Components/Cards/ResumeCard";
import localforage from "localforage";

const Home = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
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

  const loadProfile = async () => {
    try {
      const profile = await localforage.getItem("profile");
      if (profile) {
        setProfile(profile);
      } else {
        console.warn("No profile found in local storage.");
        setProfile(null);
      }
    } catch (err) {
      console.error("Error loading profile from local storage:", err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    loadedResumes.current && saveResumes();
  }, [resumes]);

  return (
    <>
      {profile != null ? (
        JSON.stringify(profile) === "{}" ? (
          <>
            <h1
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }}
            >
              Loading...
            </h1>
          </>
        ) : (
          <>
            <button
              className='profile-btn'
              onClick={() => navigate("/profile")}
            >
              <i className='fa-solid fa-user'></i>
            </button>
            <button
              className='settings-btn'
              onClick={() => navigate("/settings")}
            >
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
                        confirm("Confirm Delete") && resumes.splice(index, 1);
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
        )
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%"
            }}
          >
            <h1>Welcome to Xaiat! 🪡</h1>
            <p>
              We'll get to building and tailoring your resumes in just a moment.
              Right now, it seems you don't have a profile set up, so we don't
              know much about you. You'll need to fill out your information
              (kind of like on LinkedIn — except everything is stored locally on
              your browser) and we'll use that to create the perfect resume to
              get you that job!
              <br />
              <br />
              You can either manually enter your information on the{" "}
              <Link to={"profile"}>profile page</Link>, or you can import it in
              the <Link to={"settings"}>settings page</Link> if you've used
              Xaiat before.
              <br />
              <br />
              TL;DR: In order to{" "}
              <a href='https://youtube.com/shorts/VL9esLIkabs'>
                gift wrap your resume in our 4D suit
              </a>
              , we need to measure you. Get measured{" "}
              <Link to={"profile"}>here</Link> or enter your measurements{" "}
              <Link to={"settings"}>here</Link>.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
