// step 1: collect team managers info
//      - name, id, email, phone
// step 2: menu to add engineer or intern or finished
// step 3a: for engineer - we collect
//      - name, id, email, github
// step 3b: for intern - we collect
//      - name, id,email,school 
// employee class
// class is extended for manager, engineer, intern in different ways

// first, i will collect manager
// once collected, i will append this to the html
// then i will enter a loop until finished
// i will collect engineer or intern
// i will write out the correct card once collected

// function to collect user input
// this function should be smart enuf to ask the right questions

// push into an array and then loop over than 

// buildArray
// renderHtml
// one inquirer prompt in a function
// inside this funtion ask do you want to continue
// call the function do you weant to create the 
const inquirer = require ('inquirer'); // gets us interactive prompt
const fs = require ('fs'); // gets us the ability to write files
const path = require ('path'); // gets us __dirname
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateTeam = require('./src/page-template');

const outputDir = path.resolve(__dirname, "output");
const outputPath = path.join(outputDir, "myteam.html");

const myTeam = []; // initialize the myTeam as an array object

const manager = [
    {
        type: "input",
        name: "managerName",
        message: "Who is the team manager's name? "
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the team manager's ID? "
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the team manager's email? "
    },
    {
        type: "input",
        name: "managerOfficeNum",
        message: "What is the team manager's office number "
    },
];


