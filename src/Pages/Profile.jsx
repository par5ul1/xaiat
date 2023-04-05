import "./Profile.css";

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
import { useState } from "react";

const Profile = () => {
  // States
  const [contacts, setContacts] = useState({
    name: "Parsa Rahimi",
    email: "mail@parsuli.net",
    telephone: "(415) 231-9108",
    address: "San Francisco, CA"
  });

  const [links, setLinks] = useState([
    "https://parsuli.net",
    "https://www.linkedin.com/in/parsa-rahimi/",
    "https://github.com/par5ul1"
  ]);

  const [skills, setSkills] = useState([
    "Java",
    "Python",
    "C++",
    "C",
    "Javascript",
    "HTML/CSS",
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Final Cut Pro X",
    "Git/GitHub",
    "Bash",
    "Unix",
    "macOS",
    "Windows",
    "English",
    "Spanish",
    "Italian",
    "Farsi",
    "German"
  ]);

  const [interests, setInterests] = useState([
    "Filmmaking",
    "Film and TV Critique",
    "Game Development",
    "Music Production",
    "Graphic Design",
    "Skiing",
    "Tennis"
  ]);

  const [educations, setEducations] = useState([
    {
      institution: "University of San Francisco",
      startDate: "Sep 2019",
      endDate: "May 2023",
      degree: "B.S. in Computer Science | Minor in Mathematics and Film",
      awards: [
        "Dean's Honor Roll (Fall 2019 - Spring 2022), <u>GPA: 3.99/4.00</u>",
        "Presidential Scholarship"
      ],
      courses: [
        "Introduction to Computer Science I (Python)",
        "Introduction to Computer Science II (Java)",
        "C and Systems Programming",
        "Computer Architecture (ARM)",
        "Software Development",
        "Operating Systems",
        "Programming Languages (OCaml)",
        "Discrete Mathematics",
        "Linear Algebra & Statistics"
      ]
    }
  ]);

  const [experiences, setExperiences] = useState([
    {
      company: "University of San Francisco",
      titles: [
        {
          title: "Teaching Assistant (Software Development)",
          startDate: "January 2022",
          endDate: "Present"
        },
        {
          title:
            "Teaching Assistant (Introduction to Computer Science I - Python Foundation)",
          startDate: "August 2020",
          endDate: "December 2021"
        },
        {
          title:
            "Teaching Assistant (Introduction to Computer Science II - Java Foundation)",
          startDate: "January 2021",
          endDate: "May 2021"
        }
      ],
      descriptions: [
        "Hold office hours assisting students with debugging code and digesting material. Answer questions on Piazza.",
        "Grade around 30 weekly homework assignments and leave specific feedback on each one.",
        "Conduct code reviews and help students improve their code quality for better readability and documentation."
      ]
    }
  ]);

  const [projects, setProjects] = useState([
    {
      name: "Kaffee - Java-based Search Engine",
      shortDescription: "Software Development course final project",
      date: "2021",
      descriptions: [
        "Wrote a 1500+ lines of code, multi-threaded search engine in <u>Java</u>, capable of recursively crawling webpages, starting at a seed URL, and storing them in a custom inverted-index data structure. Used JUnit for automated testing to ensure the quality of the codebase.",
        "Created the front-end in <u>HTML</u> and <u>CSS</u> from the ground up and served the page using <u>Jetty Servlets</u>."
      ],
      used: [
        "Java",
        "JUnit",
        "Jetty",
        "Maven",
        "Log4j2",
        "Eclipse",
        "Github",
        "HTML"
      ]
    },
    {
      name: "TIM - Time Management iOS App",
      shortDescription:
        "CodePath’s iOS App Development course final project — judged “Best App” in the cohort",
      date: "2021",
      descriptions: [
        "Built a time management app in a team of four using <u>Swift</u>. Storyboarded and coded parts of the user login, task tracking, and statistics visualizations.",
        "Set up the back-end using <u>Parse</u>, coordinated API calling protocols with teammates, and designed the art assets in <u>Illustrator</u>."
      ],
      used: ["Swift", "CocoaPods", "Parse", "GitHub", "Xcode"]
    },
    {
      name: "High School Schedule Calendar Generator",
      shortDescription: "Personal project",
      date: "2016-2019",
      descriptions: [
        "Built, and maintained, an open-source web app using <u>NodeJS/ES6</u>, parsing my high school’s public .ics calendar to generate a customized calendar for each student based on their schedules",
        "Stored user information in <u>MongoDB</u> and served the website using <u>Heroku</u>.",
        "Gained over 150 users in the first week of release, including faculty."
      ],
      used: ["NodeJS", "MongoDB", "GitHub", "Heroku"]
    }
  ]);

  // Handlers
  const updateContacts = (key, value) => {
    setContacts({
      ...contacts,
      [key]: value
    });
  };

  const addLink = (link) => {
    setLinks([...links, link]);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const addEducation = (education) => {
    setEducations([...educations, education]);
  };

  const updateEducation = (index, data) => {
    const newEducation = [...educations];
    newEducation[index] = data;
    setEducations(newEducation);
  };

  const removeEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const addExperience = (experience) => {
    setExperiences([...experiences, experience]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addInterest = (interest) => {
    setInterests([...interests, interest]);
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const getProfileJSON = () => {
    return JSON.stringify({
      contacts,
      links,
      educations,
      experiences,
      projects,
      skills,
      interests
    });
  };

  return (
    <>
      <div id='header'>
        <h1>Tell us all* about yourself!</h1>
        <h4>
          *put <em>everything</em> here; we'll worry about tailoring later 😊
        </h4>
      </div>
      {/* TODO: Make into component */}
      <div id='contact' className='container'>
        <Header hint='all text is formatted exactly as you enter it. This also includes custom HTML such as &lt;u&gt; or &lt;i&gt;.'>
          Contact
        </Header>
        <div>
          <TextInput
            label='Full Name'
            inputValue={contacts.name}
            updateInputValue={(val) => updateContacts("name", val)}
          ></TextInput>
          <TextInput
            label='Email'
            inputValue={contacts.email}
            updateInputValue={(val) => updateContacts("email", val)}
          ></TextInput>
          <TextInput
            label='Telephone'
            placeholder='e.g. (888) 888-8888'
            inputValue={contacts.telephone}
            updateInputValue={(val) => updateContacts("telephone", val)}
          ></TextInput>
          <TextInput
            label='Address'
            placeholder='e.g. San Francisco, CA'
            inputValue={contacts.address}
            updateInputValue={(val) => updateContacts("address", val)}
          ></TextInput>
        </div>
      </div>

      <div id='links' className='container'>
        <Header>Links</Header>
        {!links.length == 0 && (
          <CardList>
            {links.map((link, index) => (
              <MicroCard
                key={"links" + index}
                value={link}
                onDelete={() => {
                  removeLink(index);
                }}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter Link (e.g. https://google.com)'
          onAdd={addLink}
        ></MicroCardAdder>
      </div>

      <div id='education' className='container'>
        <Header>Education</Header>
        <CardList>
          {educations.map((education, index) => (
            <Card
              key={"education" + index}
              primary={education.institution}
              tertiary={education.startDate + " - " + education.endDate}
              data={education}
              modal={
                <EducationModal
                  onSave={(newData) => updateEducation(index, newData)}
                  onDelete={() => removeEducation(index)}
                />
              }
            ></Card>
          ))}
          <CardAdder>
            <EducationModal onSave={addEducation} />
          </CardAdder>
        </CardList>
      </div>

      <div id='experience' className='container'>
        <Header>Experience</Header>
        <CardList>
          {/* TODO: Add multijob support in preview */}
          {experiences.map((experience, index) => (
            <Card
              key={"experience" + index}
              primary={experience.titles[0].title}
              secondary={experience.company}
              tertiary={
                experience.titles[0].startDate +
                " - " +
                experience.titles[0].endDate
              }
              data={experience}
              modal={
                <ExperienceModal onDelete={() => removeExperience(index)} />
              }
            ></Card>
          ))}
          <CardAdder>
            <ExperienceModal />
          </CardAdder>
        </CardList>
      </div>

      <div id='projects' className='container'>
        <Header>Projects</Header>
        <CardList>
          {projects.map((project, index) => (
            <Card
              key={"project" + index}
              primary={project.name}
              tertiary={project.date}
              data={project}
              modal={<ProjectModal onDelete={() => removeProject(index)} />}
            ></Card>
          ))}
          <CardAdder>
            <ProjectModal />
          </CardAdder>
        </CardList>
      </div>

      <div id='skills' className='container'>
        <Header>Skills</Header>
        {!skills.length == 0 && (
          <CardList fullWidth={false}>
            {skills.map((link, index) => (
              <MicroCard
                width='auto'
                key={"skills" + index}
                value={link}
                onDelete={() => {
                  removeSkill(index);
                }}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter a skill (e.g. Photoshop, Spanish, etc.)'
          onAdd={addSkill}
        ></MicroCardAdder>
      </div>

      <div id='interests' className='container'>
        <Header>Interests</Header>
        {!interests.length == 0 && (
          <CardList fullWidth={false}>
            {interests.map((link, index) => (
              <MicroCard
                width='auto'
                key={"interests" + index}
                value={link}
                onDelete={() => {
                  removeInterest(index);
                }}
              ></MicroCard>
            ))}
          </CardList>
        )}
        <MicroCardAdder
          placeholder='Enter an interest (e.g. Skiing, Painting, etc.)'
          onAdd={addInterest}
        ></MicroCardAdder>
      </div>

      <div className='container' id='terminal-btns'>
        <button className='cancel-btn'>Cancel</button>
        <button
          className='save-btn'
          onClick={() => console.log(getProfileJSON())}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Profile;
