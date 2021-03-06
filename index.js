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

// 3 of the 4 questions are the same, so lets recycle them

const baseQuery = [
    {
        type: "input",
        name: "name",
        message: "what is the name? "
    },
    {
        type: "input",
        name: "id",
        message: "what is the ID? "
    },
    {
        type: "input",
        name: "email",
        message: "what is the email? "
    }
]

// const managerQuery=[...baseQuery]; // using spread here because I want a true copy
// we are asking a custom question, let's be especially lazy and just prebuild out inquirer prompts, and customize the message
const managerQuery=JSON.parse(JSON.stringify(baseQuery));  // TIL the differece between shallow copy and deep copy :-)

managerQuery.push( 
    {
        type: "input",
        name: "managerOfficeNum",
        message: "What is the team manager's office number "
    });

    for (let i = 0; i < 3; i++) managerQuery[i].message="Manager: "+managerQuery[i].message;
    
// const engineerQuery=[...baseQuery]; // using spread here because I want a true copy
// we are asking a custom question, let's be especially lazy and just prebuild out inquirer prompts, and customize the message
const engineerQuery=JSON.parse(JSON.stringify(baseQuery)); // TIL the differece between shallow copy and deep copy :-)

engineerQuery.push(
        {
        type: "input",
        name: "engineerGitHub",
        message: "What is the engineer's github account name? "   
    });

    for (let i = 0; i < 3; i++) engineerQuery[i].message="Engineer: "+engineerQuery[i].message;

// const internQuery=[...baseQuery]; // using spread here because I want a true copy
// we are asking a custom question, let's be especially lazy and just prebuild out inquirer prompts, and customize the message
const internQuery=JSON.parse(JSON.stringify(baseQuery)); // TIL the differece between shallow copy and deep copy :-)

internQuery.push(
    {
        type: "input",
        name: "internSchool",
        message: "What is the intern's school? "   
    });

    for (let i = 0; i < 3; i++) internQuery[i].message="Intern: "+internQuery[i].message;

const emp = [
    {
        type: "list",
        message: "What kind of employee would you like to add?",
        name: "employeeRole",
        choices: [
            "engineer",
            "intern",
            "no more entries"
        ]
    }
];

createMgr();  // main entry point

function createMgr() {
    inquirer.prompt(managerQuery)
    .then((answers) => {
        const emp = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.managerOfficeNum
        );
        myTeam.push(emp);
        createEmployee();
    });
}

function createEmployee() {
    inquirer.prompt(emp)
    .then((answers) => {
        switch (answers.employeeRole) {
            case "engineer":
                return createEngineer();
            case "intern":
                return createIntern();
            default:
                return createTeam();
        }
    });
}

function createEngineer() {
    inquirer.prompt(engineerQuery)
    .then((answers) => {
        const emp = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.engineerGitHub
        );
        myTeam.push(emp);
        createEmployee();
    });
}

function createIntern() {
    inquirer.prompt(internQuery)
    .then((answers) => {
        const emp = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.internSchool
        );
        myTeam.push(emp);
        createEmployee();
    });
}

function createTeam() {
    fs.writeFileSync(outputPath, generateTeam(myTeam))
}