import "./Resume.css";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DOMPurify from "dompurify";

const Resume = ({ header: { contacts, links } = {}, info = {} }) => {
  // Support for passing data using locations for navigation
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname == "/resume/save") {
    ({
      header: { contacts, links },
      info
    } = location.state.content);
  }

  const accentColor = "#ffda00";
  const itemSeparator = (
    <span style={{ color: accentColor, margin: "-2.5pt" }}>&ensp;∎&ensp;</span>
  );

  const sectionSeparator = (
    <div
      style={{
        height: "1px",
        background: accentColor,
        margin: "5pt",
        width: "100%",
        alignSelf: "center"
      }}
    />
  );

  return (
    <div id='resume'>
      <div id='resume-header'>
        <h1>{contacts.name}</h1>
        <span>
          {links.map((link, index) => {
            return (
              <span id={"link" + index}>
                <a href={link}>{link}</a>
                {index < links.length - 1 && itemSeparator}
              </span>
            );
          })}
        </span>
        <span>
          <p>{contacts.address}</p>
          {itemSeparator}
          <a href={"mailto:" + contacts.email}>{contacts.email}</a>
          {itemSeparator}
          <a href={"tel:" + contacts.telephone}>{contacts.telephone}</a>
        </span>
      </div>
      {info &&
        Object.keys(info).map((category) => {
          if (info[category].length < 1) return;

          let body = [];
          switch (category) {
            case "educations":
              info.educations.map((education) => {
                body.push(
                  <>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(education.institution)
                      }}
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(education.degree)
                      }}
                    />
                    <ul>
                      {education.awards.map((award) => (
                        <li
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(award)
                          }}
                        />
                      ))}
                    </ul>
                    <h3>Relevant Coursework</h3>
                    <div>
                      {education.courses.map((course, index) => {
                        return (
                          <>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(course)
                              }}
                            />
                            {index < education.courses.length - 1 &&
                              itemSeparator}
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              });
              break;
            case "experiences":
              info.experiences.map((experience) => {
                body.push(
                  <>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(experience.company)
                      }}
                    />
                    {experience.titles.map((title) => (
                      <div className='two-columns'>
                        <h4
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(title.title)
                          }}
                        />
                        <h4>
                          <i>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(title.startDate)
                              }}
                            />
                            {" - "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(title.endDate)
                              }}
                            />
                          </i>
                        </h4>
                      </div>
                    ))}
                    <ul>
                      {experience.descriptions.map((bullet) => (
                        <li
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(bullet)
                          }}
                        />
                      ))}
                    </ul>
                  </>
                );
              });
              break;
            case "interests":
              body.push(
                <>
                  <div>
                    {info.interests.map((interest, index) => (
                      <>
                        <p>{interest}</p>
                        {index < info.interests.length - 1 && itemSeparator}
                      </>
                    ))}
                  </div>
                </>
              );
              break;
            case "projects":
              info.projects.map((project) => {
                body.push(
                  <>
                    <div className='two-columns'>
                      <span>
                        <h3
                          style={{ display: "inline" }}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(project.name)
                          }}
                        />
                        {/* Consider getting rid of > 0 since javascript truthy */}
                        {project.used.length > 0 && itemSeparator}
                        {project.used.map((skill, index) => (
                          <>
                            <h3 style={{ display: "inline" }}>{skill}</h3>
                            {index < project.used.length - 1 && ", "}
                          </>
                        ))}
                      </span>
                      <h4>
                        <i>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(project.date)
                            }}
                          />
                        </i>
                      </h4>
                    </div>
                    <h4
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(project.shortDescription)
                      }}
                    />
                    <ul>
                      {project.descriptions.map((bullet) => (
                        <li
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(bullet)
                          }}
                        />
                      ))}
                    </ul>
                  </>
                );
              });
              break;
          }

          return (
            <>
              {/* FIXME: This is only per string for now. We will see about doing perword when we bring in custom titles */}
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              {sectionSeparator}
              {body.map((element) => element)}
            </>
          );
        })}
    </div>
  );
};

export default Resume;
