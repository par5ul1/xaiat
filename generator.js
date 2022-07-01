/**
 * @Author: Parsa Rahimi <par5ul1>
 * @Date:   2022-06-29T23:40:40-07:00
 * @Filename: generator.js
 * @Last modified by:   par5ul1
 * @Last modified time: 2022-06-30T23:51:22-07:00
 */

const pug = require('pug');
const fs = require('fs');

// Set up PugJS renderer
const render = pug.compileFile('templates/parsuli/resume.pug');

// Read the information and parse it as JSON
const raw = fs.readFileSync("resume.json", (e) => console.log(e))
const information = JSON.parse(raw);

// Render the resume as HTML with Pug
const resume = render(information);

// Create a 'public' directory if missing
if (!fs.existsSync('public')){
    fs.mkdirSync('public');
}

// Write the resume to an HTML file, ready to be exported as a PDF
fs.writeFile("public/resume.html", resume, (e) => console.log(e));
