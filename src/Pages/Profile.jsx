import "./Profile.css";

import { Link, json, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Card from "../Components/Cards/Card";
import CardAdder from "../Components/Cards/Adders/CardAdder";
import CardList from "../Components/Lists/CardList";
import EducationModal from "../Components/Modals/EducationModal";
import ExperienceModal from "../Components/Modals/ExperienceModal";
import Header from "../Components/General/Header";
import MicroCard from "../Components/Cards/MicroCard";
import MicroCardAdder from "../Components/Cards/Adders/MicroCardAdder";
import ProjectModal from "../Components/Modals/ProjectModal";
import TextInput from "../Components/General/TextInput";
import localforage from "localforage";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    Contact: {
      name: "",
      email: "",
      telephone: "",
      address: ""
    },
    Links: [],
    Education: [],
    "Work Experience": [],
    Projects: [],
    Skills: [],
    Interests: []
  });

  // TODO: useCallback
  const updateProfile = (key, value) => {
    setProfile({
      ...profile,
      [key]: value
    });
  };

  // TODO: useCallback
  const removeFromArrayInProfile = (key, index) => {
    let value = [...profile[key]];
    value.splice(index, 1);
    setProfile({
      ...profile,
      [key]: value
    });
  };

  const profileLoaded = useRef(false);

  const saveProfile = async () => {
    try {
      await localforage.setItem("profile", profile);
    } catch (err) {
      console.error("Error saving profile to local storage:", err);
    }
  };

  const loadProfile = async () => {
    try {
      const profile = await localforage.getItem("profile");
      if (profile) {
        setProfile(profile);
        profileLoaded.current = true;
      } else {
        console.warn("No profile found in local storage.");
      }
    } catch (err) {
      console.error("Error loading profile from local storage:", err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Auto-save
  useEffect(() => {
    profileLoaded && saveProfile();
  }, [profile]);

  return (
    <>
      <button className='back-btn' onClick={() => navigate(-1)}>
        <i className='fa-solid fa-arrow-left'></i>
      </button>
      <section id='header'>
        <h1>Tell us all* about yourself!</h1>
        <h4>
          *put <em>everything</em> here; we'll worry about tailoring later 😊
        </h4>
      </section>
      {/* TODO: Make sections into components */}
      <section id='contact' className='container'>
        <Header hint='all text is formatted exactly as you enter it. This also includes custom HTML such as &lt;u&gt; or &lt;i&gt;.'>
          Contact
        </Header>
        <div>
          <TextInput
            label='Full Name'
            inputValue={profile.Contact.name}
            updateInputValue={(val) =>
              updateProfile("Contact", { ...profile.Contact, name: val })
            }
          ></TextInput>
          <TextInput
            label='Email'
            inputValue={profile.Contact.email}
            updateInputValue={(val) =>
              updateProfile("Contact", { ...profile.Contact, email: val })
            }
          ></TextInput>
          <TextInput
            label='Telephone'
            placeholder='e.g. (888) 888-8888'
            inputValue={profile.Contact.telephone}
            updateInputValue={(val) =>
              updateProfile("Contact", { ...profile.Contact, telephone: val })
            }
          ></TextInput>
          <TextInput
            label='Address'
            placeholder='e.g. San Francisco, CA'
            inputValue={profile.Contact.address}
            updateInputValue={(val) =>
              updateProfile("Contact", { ...profile.Contact, address: val })
            }
          ></TextInput>
        </div>
      </section>

      <section id='links' className='container'>
        <Header>Links</Header>
        {!profile.Links.length == 0 && (
          <CardList>
            {profile.Links.map((link, index) => (
              <MicroCard
                key={"Links" + index}
                value={link}
                onDelete={() => removeFromArrayInProfile("Links", index)}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter Link (e.g. https://google.com)'
          onAdd={(val) => updateProfile("Links", [...profile.Links, val])}
        ></MicroCardAdder>
      </section>

      <section id='education' className='container'>
        <Header>Education</Header>
        <CardList>
          {profile.Education.map((education, index) => (
            <Card
              key={"education" + index}
              primary={education.institution}
              tertiary={education.startDate + " - " + education.endDate}
              data={education}
              modal={
                <EducationModal
                  onSave={(newEducation) => {
                    let updatedEductation = [...profile.Education];
                    updatedEductation[index] = newEducation;
                    updateProfile("Education", updatedEductation);
                  }}
                  onDelete={() => removeFromArrayInProfile("Education", index)}
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <EducationModal
              onSave={(newEducation) =>
                updateProfile("Education", [...profile.Education, newEducation])
              }
            />
          </CardAdder>
        </CardList>
      </section>

      <section id='experience' className='container'>
        <Header>Experience</Header>
        <CardList>
          {profile["Work Experience"].map((experience, index) => (
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
              data={experience}
              modal={
                <ExperienceModal
                  onSave={(newExperience) => {
                    let updatedExperience = [...profile["Work Experience"]];
                    updatedExperience[index] = newExperience;
                    updateProfile("Work Experience", updatedExperience);
                  }}
                  onDelete={() =>
                    removeFromArrayInProfile("Work Experience", index)
                  }
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <ExperienceModal
              onSave={(newExperience) =>
                updateProfile("Work Experience", [
                  ...profile["Work Experience"],
                  newExperience
                ])
              }
            />
          </CardAdder>
        </CardList>
      </section>

      <section id='projects' className='container'>
        <Header>Projects</Header>
        <CardList>
          {profile.Projects.map((project, index) => (
            <Card
              key={"project" + index}
              primary={project.name}
              tertiary={project.date}
              data={project}
              modal={
                <ProjectModal
                  onSave={(newProject) => {
                    let updatedProject = [...profile.Projects];
                    updatedProject[index] = newProject;
                    updateProfile("Projects", updatedProject);
                  }}
                  onDelete={() => removeFromArrayInProfile("Projects", index)}
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <ProjectModal
              onSave={(newProject) =>
                updateProfile("Projects", [...profile.Projects, newProject])
              }
            />
          </CardAdder>
        </CardList>
      </section>

      <section id='skills' className='container'>
        <Header>Skills</Header>
        {!profile.Skills.length == 0 && (
          <CardList fullWidth={false}>
            {profile.Skills.map((link, index) => (
              <MicroCard
                width='auto'
                key={"Skills" + index}
                value={link}
                onDelete={() => removeFromArrayInProfile("Skills", index)}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter a skill (e.g. Photoshop, Spanish, etc.)'
          onAdd={(val) => updateProfile("Skills", [...profile.Skills, val])}
        ></MicroCardAdder>
      </section>

      <section id='interests' className='container'>
        <Header>Interests</Header>
        {!profile.Interests.length == 0 && (
          <CardList fullWidth={false}>
            {profile.Interests.map((link, index) => (
              <MicroCard
                width='auto'
                key={"Interests" + index}
                value={link}
                onDelete={() => removeFromArrayInProfile("Interests", index)}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter an interest (e.g. Skiing, Painting, etc.)'
          onAdd={(val) =>
            updateProfile("Interests", [...profile.Interests, val])
          }
        ></MicroCardAdder>
      </section>

      <br />

      <button onClick={() => navigate(-1)} className='save-btn'>
        Save
      </button>

      <br />
    </>
  );
};

export default Profile;
