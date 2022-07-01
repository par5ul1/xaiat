/**
 * @Author: Parsa Rahimi <par5ul1>
 * @Date:   2022-06-29T23:40:40-07:00
 * @Filename: generator.js
 * @Last modified by:   par5ul1
 * @Last modified time: 2022-06-30T23:35:15-07:00
 */

const pug = require('pug');
const fs = require('fs');

const render = pug.compileFile('templates/parsuli/resume.pug');

const raw = fs.readFileSync("resume.json", (e) => console.log(e))
const information = JSON.parse(raw);

const resume = render(information);

// fs.writeFile("public/index.html", index, (e) => console.log(e));
if (!fs.existsSync('public')){
    fs.mkdirSync('public');
}
fs.writeFile("public/resume.html", resume, (e) => console.log(e));
