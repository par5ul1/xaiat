import "./Tailor.css";

import * as ReactDOMServer from "react-dom/server";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
  const [resume, setResume] = useState({ title: "", content: {}, order: [] });

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

  const [settings, setSettings] = useState({});

  const resumeComponent = (
    <Resume
      header={{ contacts: profile.contacts, links: profile.links }}
      info={resume.content}
      order={resume.order}
      settings={settings}
    />
  );

  const loadedResumes = useRef(false);

  const toggleItem = (key, value) => {
    const index = findContentIndexInProfile(key, value);
    if (index > -1) {
      // FIXME: Buggy removing elements when stuff is still there. Only cleanup if fully empty
      let newItem = [...resume.content[key]];
      newItem.splice(index, 1);

      let newOrder = [...resume.order];
      !newItem.length && newOrder.splice(resume.order.indexOf(key), 1);
      setResume({
        ...resume,
        order: newOrder,
        content: {
          ...resume.content,
          [key]: newItem
        }
      });
    } else {
      const newOrder =
        resume.order.indexOf(key) > -1 ? resume.order : [...resume.order, key];
      setResume({
        ...resume,
        order: newOrder,
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

  // TEMP: This should go once I move to Immer or something. For now, I'll make it work.
  const addSkillToCategory = (category, skill) => {
    let newResume = { ...resume };
    newResume.content?.skills?.map((skillEntry) => {
      if (skillEntry.title == category) skillEntry.skills.push(skill);
    });
    setResume(newResume);
  };

  const removeSkillFromCategory = (category, index) => {
    let newResume = { ...resume };
    newResume.content?.skills?.map((skillEntry) => {
      if (skillEntry.title == category) skillEntry.skills.splice(index, 1);
    });
    setResume(newResume);
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

  const loadSettings = async () => {
    try {
      const settings = await localforage.getItem("settings");
      if (settings) {
        setSettings(settings);
      } else {
        console.warn("No settings found in local storage.");
      }
    } catch (err) {
      console.error("Error loading settings from local storage:", err);
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
    loadSettings();
  }, []);

  useEffect(() => {
    loadedResumes.current && saveResumes();
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

  const resumeToHTML = () => {
    // Temporarily suppressing errors for rendering
    const originalConsoleError = console.error;
    console.error = () => {};
    const html = ReactDOMServer.renderToStaticMarkup(resumeComponent);

    // Restore errors
    console.error = originalConsoleError;

    const stylesheet = Array.from(document.styleSheets)
      .filter((sheet) => sheet.href === null)
      .map((sheet) =>
        Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n")
      )
      .join("\n");

    const finalHtml = `<!DOCTYPE html>
<html>
  <head>
    <style>
      ${stylesheet}
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>
`;

    return finalHtml;
  };

  const handleDownload = () => {
    const iframe = document.createElement("iframe");

    iframe.width = "0";
    iframe.height = "0";

    document.body.appendChild(iframe);

    (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML =
      resumeToHTML();

    iframe.addEventListener("load", () => {
      iframe.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 100);
    });
  };

  return (
    <>
      <div id='tailor'>
        <div id='sidebar'>
          <button
            onClick={handleDownload}
            style={{
              width: "fit-content",
              alignSelf: "flex-end"
            }}
          >
            <i className='fa-solid fa-download'></i>
          </button>
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
          <DragDropContext
            onDragEnd={(result) => {
              console.log(result);
              if (
                !result.destination ||
                result.destination.droppableId == "skills-Uncategorized"
              )
                return;
              addSkillToCategory(
                result.destination.droppableId.split("-")[1],
                profile.skills[result.source.index]
              );
            }}
          >
            {resume.content.skills &&
              resume.content.skills.map(({ title, skills }) => {
                return (
                  <Droppable droppableId={"skill-" + title}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
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
                              <div className='active'>
                                <MicroCard
                                  key={"skill" + index}
                                  width='auto'
                                  value={skill}
                                  onDelete={() =>
                                    removeSkillFromCategory(title, index)
                                  }
                                />
                              </div>
                            );
                          })}
                        </CardList>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            <Header large={false}>Uncategorized</Header>
            <Droppable droppableId='skills-Uncategorized'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <CardList fullWidth={false}>
                    {profile.skills.map((skill, index) => (
                      <Draggable
                        key={"skill-uncategorized" + index}
                        draggableId={"skill-uncategorized" + index}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <MicroCard width='auto' value={skill} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </CardList>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
        {/* XXX: This transform is hardcoded-ish for now. */}
        <div
          id='resume-container'
          style={{
            transform: `scale(${resumeTransform})`
          }}
        >
          {resumeComponent}
        </div>
      </div>
    </>
  );
};

export default Tailor;
