import "./Settings.css";

import { useEffect, useRef } from "react";

import localforage from "localforage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({});

  const navigate = useNavigate();

  const exportProfile = async () => {
    try {
      const profile = await localforage.getItem("profile");
      const resumes = await localforage.getItem("resumes");
      const settings = await localforage.getItem("settings");

      let data = "{";
      if (profile || resumes || settings) {
        profile && (data += `"profile": ${JSON.stringify(profile)}`);
        resumes && (data += `, "resumes": ${JSON.stringify(resumes)}`);
        settings && (data += `, "settings": ${JSON.stringify(settings)}`);
        data += "}";

        const element = document.createElement("a");
        const file = new Blob([data], { type: "application/json" });
        element.href = URL.createObjectURL(file);
        element.download = "xaiat_profile.json";
        element.click();
      } else {
        console.warn("No profile found in local storage.");
      }
    } catch (err) {
      console.error("Error loading profile from local storage:", err);
    }
  };

  const importProfile = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = (event) => {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        const fileContents = event.target.result;
        const parsedData = JSON.parse(fileContents);

        localforage.setItem(
          "profile",
          parsedData.profile ? parsedData.profile : {}
        );
        localforage.setItem(
          "resumes",
          parsedData.resumes ? parsedData.resumes : []
        );
        localforage.setItem(
          "settings",
          parsedData.settings ? parsedData.settings : {}
        );
      };
    };
    fileInput.click();
  };

  const updateAccentColor = (color) => {
    setSettings((settings) => {
      settings = { ...settings, accentColor: color };
      return settings;
    });
  };

  const hasLoadedSettings = useRef(false);
  useEffect(() => {
    localforage.getItem("settings").then((settings) => {
      settings && setSettings(settings);
      hasLoadedSettings.current = true;
    });
  }, []);

  useEffect(() => {
    hasLoadedSettings && localforage.setItem("settings", settings);
  }, [settings]);

  return (
    <>
      <button className='back-btn' onClick={() => navigate(-1)}>
        <i className='fa-solid fa-arrow-left'></i>
      </button>
      <section id='header'>
        <h1>Settings</h1>
      </section>
      <section id='settings'>
        <h2>Resume Appearance</h2>
        <label>
          Font:
          <select
            onChange={(event) =>
              setSettings({ ...settings, font: event.target.value })
            }
            value={settings.font}
          >
            <option value='Open Sans'>Open Sans (default)</option>
            <option value='Arial'>Arial</option>
            <option value='Helvetica'>Helvetica</option>
            <option value='Times New Roman'>Times New Roman</option>
            <option value='Playfair Display'>Playfair Display</option>
          </select>
        </label>
        <label>
          Accent Color:
          <input
            value={settings.accentColor ? settings.accentColor : "#000000"}
            type='color'
            onChange={(event) => updateAccentColor(event.target.value)}
          />
        </label>

        <h2>Profile Options</h2>
        <button onClick={exportProfile}>Export Profile (Backup)</button>
        <button onClick={importProfile}>Import Profile</button>

        <h2>Report a Bug</h2>
        <a href='https://github.com/par5ul1/xaiat/issues/new' target='_blank'>
          Report
        </a>
      </section>
    </>
  );
};

export default Settings;
