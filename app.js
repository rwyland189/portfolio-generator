const inquirer = require("inquirer");
// // The require statement is necessary to use the file system (fs) module
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

inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        }
    ])
    .then(answers => console.log(answers));