// The require statement is necessary to use the file system (fs) module
const fs = require("fs");

// Access module in page-template.js, the object in the module.exports assignment will be reassigned to the generatePage variable in app.js
const generatePage = require("./src/page-template.js");

// Lesson 1: Getting comfortable with Node
// This array holds the user command-line arguments
const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
// end of Lesson 1 references

// Assignment destructing - ES6 feature that assigns elements of an array to variable names in a single expression 
const [name, github] = profileDataArgs;

// The alternative way of assignment destructing is by extracting and storing the arguments, commented out below
// Extract the command-line arguments and store in distinct variables
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];

// Three arguments being passed below: 
// 1) first is file name that will be created, or the output file
// 2) second is the data that's being written, the HTML string template
// 3) third is the callback function that will handle errors as well as the success message
fs.writeFile("./index.html", generatePage(name, github), err => {
    if (err) throw new Error(err);

    console.log("Portfolio complete! Check out index.html to see the output!");
});