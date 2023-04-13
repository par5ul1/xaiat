import "./Profile.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
      // XXX: The code below will load from a json file. Implement later
      // const profile = await fetch("jsons/profile.json").then((response) =>
      //   response.json()
      // );
      if (profile) {
        setProfile(profile);
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

  return (
    <>
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
            inputValue={profile.contacts.name}
            updateInputValue={(val) =>
              updateProfile("contacts", { ...profile.contacts, name: val })
            }
          ></TextInput>
          <TextInput
            label='Email'
            inputValue={profile.contacts.email}
            updateInputValue={(val) =>
              updateProfile("contacts", { ...profile.contacts, email: val })
            }
          ></TextInput>
          <TextInput
            label='Telephone'
            placeholder='e.g. (888) 888-8888'
            inputValue={profile.contacts.telephone}
            updateInputValue={(val) =>
              updateProfile("contacts", { ...profile.contacts, telephone: val })
            }
          ></TextInput>
          <TextInput
            label='Address'
            placeholder='e.g. San Francisco, CA'
            inputValue={profile.contacts.address}
            updateInputValue={(val) =>
              updateProfile("contacts", { ...profile.contacts, address: val })
            }
          ></TextInput>
        </div>
      </section>

      <section id='links' className='container'>
        <Header>Links</Header>
        {!profile.links.length == 0 && (
          <CardList>
            {profile.links.map((link, index) => (
              <MicroCard
                key={"links" + index}
                value={link}
                onDelete={() => removeFromArrayInProfile("links", index)}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter Link (e.g. https://google.com)'
          onAdd={(val) => updateProfile("links", [...profile.links, val])}
        ></MicroCardAdder>
      </section>

      <section id='education' className='container'>
        <Header>Education</Header>
        <CardList>
          {profile.educations.map((education, index) => (
            <Card
              key={"education" + index}
              primary={education.institution}
              tertiary={education.startDate + " - " + education.endDate}
              data={education}
              modal={
                <EducationModal
                  onSave={(newEducation) => {
                    let updatedEductation = [...profile.educations];
                    updatedEductation[index] = newEducation;
                    updateProfile("educations", updatedEductation);
                  }}
                  onDelete={() => removeFromArrayInProfile("educations", index)}
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <EducationModal
              onSave={(newEducation) =>
                updateProfile("educations", [
                  ...profile.educations,
                  newEducation
                ])
              }
            />
          </CardAdder>
        </CardList>
      </section>

      <section id='experience' className='container'>
        <Header>Experience</Header>
        <CardList>
          {profile.experiences.map((experience, index) => (
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
                    let updatedExperience = [...profile.experiences];
                    updatedExperience[index] = newExperience;
                    updateProfile("experiences", updatedExperience);
                  }}
                  onDelete={() =>
                    removeFromArrayInProfile("experiences", index)
                  }
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <ExperienceModal
              onSave={(newExperience) =>
                updateProfile("experiences", [
                  ...profile.experiences,
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
          {profile.projects.map((project, index) => (
            <Card
              key={"project" + index}
              primary={project.name}
              tertiary={project.date}
              data={project}
              modal={
                <ProjectModal
                  onSave={(newProject) => {
                    let updatedProject = [...profile.projects];
                    updatedProject[index] = newProject;
                    updateProfile("projects", updatedProject);
                  }}
                  onDelete={() => removeFromArrayInProfile("projects", index)}
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <ProjectModal
              onSave={(newProject) =>
                updateProfile("projects", [...profile.projects, newProject])
              }
            />
          </CardAdder>
        </CardList>
      </section>

      <section id='skills' className='container'>
        <Header>Skills</Header>
        {!profile.skills.length == 0 && (
          <CardList fullWidth={false}>
            {profile.skills.map((link, index) => (
              <MicroCard
                width='auto'
                key={"skills" + index}
                value={link}
                onDelete={() => removeFromArrayInProfile("skills", index)}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter a skill (e.g. Photoshop, Spanish, etc.)'
          onAdd={(val) => updateProfile("skills", [...profile.skills, val])}
        ></MicroCardAdder>
      </section>

      <section id='interests' className='container'>
        <Header>Interests</Header>
        {!profile.interests.length == 0 && (
          <CardList fullWidth={false}>
            {profile.interests.map((link, index) => (
              <MicroCard
                width='auto'
                key={"interests" + index}
                value={link}
                onDelete={() => removeFromArrayInProfile("interests", index)}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter an interest (e.g. Skiing, Painting, etc.)'
          onAdd={(val) =>
            updateProfile("interests", [...profile.interests, val])
          }
        ></MicroCardAdder>
      </section>

      <section id='terminal-btns' className='container'>
        <button
          className='cancel-btn'
          onClick={() => confirm("Confirm Cancel") && navigate("/")}
        >
          Cancel
        </button>
        <button
          className='save-btn'
          onClick={() => {
            saveProfile();
            navigate("/");
          }}
        >
          Save
        </button>
      </section>
    </>
  );
};

export default Profile;
