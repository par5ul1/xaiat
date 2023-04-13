import "./Tailor.css";

import { json, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import AddableTextInput from "../Components/Cards/Adders/MicroCardAdder";
import Card from "../Components/Cards/Card";
import CardList from "../Components/Lists/CardList";
import Header from "../Components/General/Header";
import Hint from "../Components/General/Hint";
import MicroCard from "../Components/Cards/MicroCard";
import Resume from "./Resume";
import TextInput from "../Components/General/TextInput";
import localforage from "localforage";

const Tailor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // XXX: Potential derived states
  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState({ title: "", content: {} });

  const [profile, setProfile] = useState({
    contacts: {
      name: "",
      email: "",
      telephone: "",
      address: ""
    },
    links: [],
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
    interests: []
  });

  const loadedResumes = useRef(false);

  const toggleItem = (key, value) => {
    const index = findContentIndexInProfile(key, value);
    if (index > -1) {
      let newItem = [...resume.content[key]];
      newItem.splice(index, 1);
      console.log(newItem);
      setResume({
        ...resume,
        content: {
          ...resume.content,
          [key]: newItem
        }
      });
    } else {
      setResume({
        ...resume,
        content: {
          ...resume.content,
          [key]: resume.content?.[key]
            ? [...resume.content[key], value]
            : [value]
        }
      });
    }
  };

  const findContentIndexInProfile = (key, value) => {
    let index = -1;
    resume.content?.[key]?.forEach((item, i) => {
      JSON.stringify(item) == JSON.stringify(value) && (index = i);
    });
    return index;
  };

  const loadProfile = async () => {
    try {
      const profile = await localforage.getItem("profile");
      if (profile) {
        setProfile(profile);
      } else {
        // FIXME: Okay for now, but change the body to prompt the user to create a profile
        console.error("No profile found in local storage.");
      }
    } catch (err) {
      console.error("Error loading profile from local storage:", err);
    }
  };

  const loadResumes = async () => {
    try {
      const resumes = await localforage.getItem("resumes");
      if (resumes) {
        setResumes(resumes);
        resumes[location.state?.index] &&
          setResume(resumes[location.state?.index]);
        loadedResumes.current = true;
      } else {
        console.warn("No resumes found in local storage.");
      }
    } catch (err) {
      console.error("Error loading resumes from local storage:", err);
    }
  };

  const saveResumes = async () => {
    try {
      let newResumes = [...resumes];
      newResumes[location.state?.index] = resume;
      await localforage.setItem("resumes", newResumes);
    } catch (err) {
      console.error("Error saving resume to local storage:", err);
    }
  };

  useEffect(() => {
    loadResumes();
    loadProfile();
  }, []);

  useEffect(() => {
    loadedResumes.current && saveResumes();
    console.log(resume);
  }, [resumes, resume]);

  const [resumeTransform, setResumeTransform] = useState(1);
  useEffect(() => {
    // This is on purpose. The function should run once, and then be reusable
    const updateResumeTransform = setResumeTransform(
      (0.9 * window.innerHeight) /
        document.getElementById("resume-container").clientHeight
    );
    window.addEventListener("resize", updateResumeTransform);
  }, []);

  const handleDownload = () => {
    navigate("/resume/save", {
      state: {
        content: {
          header: { contacts: profile.contacts, links: profile.links },
          info: resume.content
        }
      }
    });
  };

  return (
    <>
      <div id='tailor'>
        <div id='sidebar'>
          <button onClick={handleDownload}>Download</button>
          <TextInput
            label={"Resume Name"}
            inputValue={resume.title ? resume.title : ""}
            updateInputValue={(title) => setResume({ ...resume, title: title })}
            width='auto'
          ></TextInput>

          <hr />

          <div>
            <h2 style={{ fontWeight: "var(--extra-bold-wt)" }}>
              Let's Tailor!
            </h2>
            <Hint>
              simply click to (de)select the elements you want to appear on your
              resume. Also, you can drag each section in the resume view on the
              right to change the order.
            </Hint>
          </div>

          <Header
            hint={
              "you can create and drag skills into different tags to add them to your resume."
            }
          >
            Skills
          </Header>
          {resume.content.skills &&
            resume.content.skills.map(({ title, skills }) => {
              return (
                <>
                  <span style={{ display: "flex", gap: "1vmin" }}>
                    <Header large={false}>{title}</Header>
                    <button
                    // onClick={() =>
                    //   // TODO: Implement category delete
                    // }
                    >
                      <i className='fa-solid fa-xmark'></i>
                    </button>
                  </span>
                  <CardList fullWidth={false}>
                    {skills.map((skill, index) => {
                      return (
                        <div className='enabled'>
                          <MicroCard
                            key={"skill" + index}
                            width='auto'
                            value={skill}
                          />
                        </div>
                      );
                    })}
                  </CardList>
                </>
              );
            })}
          <Header large={false}>Uncategorized</Header>
          <CardList fullWidth={false}>
            {profile.skills.map((skill, index) => {
              return (
                <MicroCard key={"skill" + index} width='auto' value={skill} />
              );
            })}
          </CardList>
          <AddableTextInput
            width='25vw'
            placeholder='Enter a tag (e.g. Technical, Languages, etc.)'
            onAdd={(tag) => toggleItem("skills", { title: tag, skills: [] })}
          />

          <Header>Education</Header>
          <CardList>
            {profile.educations.map((education, index) => {
              return (
                <div
                  onClick={() => toggleItem("educations", education)}
                  className={
                    findContentIndexInProfile("educations", education) > -1
                      ? "active"
                      : null
                  }
                >
                  <Card
                    key={"education" + index}
                    primary={education.institution}
                    tertiary={education.startDate + " - " + education.endDate}
                  />
                </div>
              );
            })}
          </CardList>

          <Header>Experience</Header>
          <CardList>
            {profile.experiences.map((experience, index) => {
              return (
                <div
                  onClick={() => toggleItem("experiences", experience)}
                  className={
                    findContentIndexInProfile("experiences", experience) > -1
                      ? "active"
                      : null
                  }
                >
                  <Card
                    key={"experience" + index}
                    primary={
                      experience.titles[0].title +
                      (experience.titles.length > 1
                        ? " + " + (experience.titles.length - 1) + " more"
                        : "")
                    }
                    secondary={experience.company}
                    tertiary={
                      experience.titles[0].startDate +
                      " - " +
                      experience.titles[0].endDate
                    }
                  />
                </div>
              );
            })}
          </CardList>

          <Header>Projects</Header>
          <CardList>
            {profile.projects.map((project, index) => {
              return (
                <div
                  onClick={() => toggleItem("projects", project)}
                  className={
                    findContentIndexInProfile("projects", project) > -1
                      ? "active"
                      : null
                  }
                >
                  <Card
                    key={"project" + index}
                    primary={project.name}
                    tertiary={project.date}
                  />
                </div>
              );
            })}
          </CardList>

          <Header>Interests</Header>
          <CardList fullWidth={false}>
            {profile.interests.map((interest, index) => {
              return (
                <div
                  onClick={() => toggleItem("interests", interest)}
                  className={
                    findContentIndexInProfile("interests", interest) > -1
                      ? "active"
                      : null
                  }
                >
                  <MicroCard
                    key={"interest" + index}
                    width='auto'
                    value={interest}
                  />
                </div>
              );
            })}
          </CardList>
        </div>
        {/* XXX: This transform is hardcoded-sh for now. */}
        <div
          id='resume-container'
          style={{
            transform: `scale(${resumeTransform})`
          }}
        >
          <Resume
            header={{ contacts: profile.contacts, links: profile.links }}
            info={resume.content}
          />
        </div>
      </div>
    </>
  );
};

export default Tailor;
