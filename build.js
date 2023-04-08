const Twig = require('twig');
const fs = require('fs');

// import data
const gen = require('./data/general.json');
const abt = require('./data/sections/about.json');
const certs = require('./data/sections/certifications.json');
const exp = require('./data/sections/experience.json');
const edu = require('./data/sections/education.json');
const proj = require('./data/sections/projects.json');
const skills = require('./data/sections/skills.json');

// encode email and assemble data
const general = gen || {};
if (typeof general.email == 'string') {
    general.email = btoa(general.email);
}
const colors = gen.colors || {};
const data = {
    general,
    about: abt?.text || '',
    certifications: certs || [],
    experience: exp || [],
    education: edu || [],
    projects: proj || [],
    skills: skills || []
}

// build the page
Twig.renderFile(`./templates/index.html.twig`, data, (err, html) => {
    fs.writeFileSync(`./dist/index.html`, html);
});

// build the colors override file
let colorCss = ':root{'
for (const c in colors) {
    if (Object.hasOwnProperty.call(colors, c)) {
        const val = colors[c];

        colorCss += `--${c}-color: ${val};`;
    }
}
colorCss += '}';
fs.writeFileSync(`./dist/css/colors.css`, colorCss);
