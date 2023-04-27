import "./Resume.css";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DOMPurify from "dompurify";
import localforage from "localforage";
import { useState } from "react";

const Resume = ({
  header: { contacts, links } = {},
  info = {},
  order = [],
  settings,
  onReorder
}) => {
  const itemSeparator = (
    <span
      style={{
        color: settings?.accentColor ? settings.accentColor : "#000000",
        margin: "-2.5pt"
      }}
    >
      &ensp;∎&ensp;
    </span>
  );

  const sectionSeparator = (
    <div
      style={{
        height: "1px",
        background: settings?.accentColor ? settings.accentColor : "#000000",
        margin: "5pt",
        width: "100%",
        alignSelf: "center"
      }}
    />
  );

  return (
    <>
      <style>
        {`
          #resume * {
            font-family: ${
              settings?.font ? `"${settings.font}"` : `"Open Sans"`
            }
          }
        `}
      </style>
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
        <DragDropContext
          onDragEnd={(result) => {
            console.log(result);
            if (!result.destination) return;

            // TODO: Allow for changes to persist
            onReorder(result.source.index, result.destination.index);
          }}
        >
          <Droppable droppableId={"resume-dropzone"}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {order &&
                  order.map((category, index) => {
                    if (info[category].length < 1) return;

                    let body = [];
                    switch (category) {
                      case "Education":
                        info.Education.map((education) => {
                          body.push(
                            <>
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    education.institution
                                  )
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
                      case "Work Experience":
                        info["Work Experience"].map((experience) => {
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
                                          __html: DOMPurify.sanitize(
                                            title.startDate
                                          )
                                        }}
                                      />
                                      {" - "}
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: DOMPurify.sanitize(
                                            title.endDate
                                          )
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
                      case "Interests":
                        body.push(
                          <>
                            <div>
                              {info.Interests.map((interest, index) => (
                                <>
                                  <p>{interest}</p>
                                  {index < info.Interests.length - 1 &&
                                    itemSeparator}
                                </>
                              ))}
                            </div>
                          </>
                        );
                        break;
                      case "Projects":
                        info.Projects.map((project) => {
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
                                  {/* XXX: Consider getting rid of > 0 since javascript truthy */}
                                  {project.used.length > 0 && itemSeparator}
                                  {project.used.map((skill, index) => (
                                    <>
                                      <h3 style={{ display: "inline" }}>
                                        {skill}
                                      </h3>
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
                                  __html: DOMPurify.sanitize(
                                    project.shortDescription
                                  )
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
                      case "Skills":
                        info.Skills.map(({ title, skills }) => {
                          body.push(
                            <>
                              <div className='two-columns'>
                                <h3
                                  style={{ display: "inline" }}
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(title)
                                  }}
                                />
                                <span>
                                  {skills.map((skill, index) => (
                                    <>
                                      <p style={{ display: "inline" }}>
                                        {skill}
                                      </p>
                                      {index < skills.length - 1 &&
                                        itemSeparator}
                                    </>
                                  ))}
                                </span>
                              </div>
                            </>
                          );
                        });
                        break;
                    }

                    return (
                      <Draggable
                        key={"resume-" + category + index}
                        draggableId={"resume" + category + index}
                        index={index}
                      >
                        {(provided) => (
                          <section
                            // contentEditable
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {/* FIXME: This is only per string for now. We will see about doing perword when we bring in custom titles */}
                            <h2>
                              <span {...provided.dragHandleProps} />
                              {category}
                            </h2>
                            {sectionSeparator}
                            {body.map((element) => element)}
                          </section>
                        )}
                      </Draggable>
                    );
                  })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Resume;
