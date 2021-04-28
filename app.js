const inquirer = require("inquirer");
const { prototype } = require("inquirer/lib/objects/choice");
// //The require statement is necessary to use the file system (fs) module
// const fs = require("fs");

// // Access module in page-template.js, the object in the module.exports assignment will be reassigned to the generatePage variable in app.js
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, github);

// // Three arguments being passed below: 
// // 1) first is file name that will be created, or the output file
// // 2) second is the data that's being written, the HTML string template
// // 3) third is the callback function that will handle errors as well as the success message
// fs.writeFile("./index.html", pageHTML, err => {
//     if (err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });

const promptUser = () => {
    return inquirer.prompt([
        // Question objects
        {
            type: "input",
            name: "name",
            message: "What is your name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username. (Required)",
            // use validate to make sure user doesn't skip the question
            validate: gitHubUsername => {
                if (gitHubUsername) {
                    return true;
                } else {
                    console.log("Please enter your GitHub username!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAbout",
            message: "Would you like to enter some information about yourself for an 'About' section?",
            default: true
        },
        {
            type: "input",
            name: "about",
            message: "Provide some information about yourself:",
            // use when to to conditionally prompt a question based on a user's input
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    //store project data, if loop to only initialize on first pass
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
 
    console.log(`
=================
Add a New Project
=================
`);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (Required)",
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log("Please enter the name of your project!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project. (Required)",
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    console.log("Please provide a description of your project!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["Javascript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter the GitHub link to your project. (Required)",
            validate: gitHubLink => {
                if (gitHubLink) {
                    return true;
                } else {
                    console.log("Please provide your GitHub project link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you  like to enter another project?",
            default: false
        },
        
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        // Where did projectData come from?
        // If user confirms they would like to add another project, this condition will evaluate to true and call the promptProject(portfolioData) function
        if (projectData.confirmAddProject) {
            // portfolioData must be included as the argument when calling this promptProject function otherwise a new projects array will be initialized and the existing project data will be lost
            return promptProject(portfolioData);
            // If user does not want to add another project, the condition will evaluate to false. portfolioData is returned in the else statement explicitly so that the object is returned --> critical step to retrieving user's answre and building HTML template
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });