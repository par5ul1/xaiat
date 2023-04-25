import "./Settings.css";

import localforage from "localforage";
import { useEffect } from "react";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({});

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
      localforage.setItem("settings", settings);
      return settings;
    });
  };

  useEffect(() => {
    localforage.getItem("settings").then((settings) => {
      settings && setSettings(settings);
    });
  }, []);

  return (
    <>
      <section id='header'>
        <h1>Settings</h1>
      </section>
      <section id='settings'>
        <h2>Resume Appearance</h2>
        <label>
          Font:
          <select>
            <option value='Open Sans'>Open Sans (default)</option>
          </select>
        </label>
        <label>
          Accent Color:
          <input
            value={settings.accentColor ? settings.accentColor : "#ffda00"}
            type='color'
            onChange={(event) => updateAccentColor(event.target.value)}
          />
        </label>

        <h2>Profile Options</h2>
        <button onClick={exportProfile}>Export Profile (Backup)</button>
        <button onClick={importProfile}>Import Profile</button>
      </section>
    </>
  );
};

export default Settings;
