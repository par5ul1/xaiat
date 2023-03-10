/**
 * @Author: Parsa Rahimi <par5ul1>
 * @Date:   2022-07-11T01:21:43-07:00
 * @Filename: index.js
 * @Last modified by:   par5ul1
 * @Last modified time: 2022-07-11T20:08:06-07:00
 */

const express = require("express");
const pug = require('pug');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Read the information and parse it as JSON
const raw = fs.readFileSync("resume.json", (e) => console.log(e))
const information = JSON.parse(raw);

app.get("/", (req, res) => {
  res.render("index", information);
});

app.get("/resume", (req, res) => {
  res.render("resume/resume", information);
});

// TEMP
app.get("/personal", (req, res) => {
  res.render("forms/personal", information);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
//

//
// // Set up PugJS renderer
// const render = pug.compileFile('templates/parsuli/resume.pug');
//
//
// // Render the resume as HTML with Pug
// const resume = render(information);
//
// // Create a 'public' directory if missing
// if (!fs.existsSync('public')){
//     fs.mkdirSync('public');
// }
//
// // Write the resume to an HTML file, ready to be exported as a PDF
// fs.writeFile("public/resume.html", resume, (e) => console.log(e));
