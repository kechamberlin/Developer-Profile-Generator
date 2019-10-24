const fs = require("fs");
const inquirer = require("inquirer");


// ====== Developer ======

class Developer {
    constructor(name, location, email, github) {
        this.name = name;
        this.location = location;
        this.email = email;
        this.github = github;
    }
    getName() {
        console.log(this.name);
    }
    getLocation() {
        console.log(this.location);
    }
    getEmail() {
        console.log(this.email);
    }
    getGitHub() {
        return this.github;
    }
    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Location: ${this.location}`);
        console.log(`Email: ${this.email}`);
        console.log(`GitHub Username: ${this.github}`);

    }
    // This method will convert input data into a string that will be then later be printed onto an HTML page via a function.
    buildHTMLString() {
        return `
        <h1>Name: ${this.name}</h1>
        <h1>Location: ${this.location}</h1>
        <h1>Email: ${this.email}</h1>
        <h1>GitHub Username: ${this.github}</h1>
        `
    }
}

Developer.prompt = () => {
    return inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "input", 
        message: "What is your full name?",
        name: "fullname"
      },
      {
        type: "input",
        message: "What is your location?",
        name: "location"
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email"
      },
      {
          type: "input",
          message: "What is your GitHub username?",
          name: "github"
    },
    ]).then(answers => {
        return new Developer(answers.fullname, answers.location, answers.email, answers.github);
    })
}


// Generate the HTML page
const generatePage = (developer) => {
    const wholePage = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        ${developer.buildHTMLString()}
    </body>
    </html>`
    console.log(wholePage);

    fs.writeFile("index.html", wholePage, function(err) {

        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      });
}

async function main() {
    const developer = await Developer.prompt();    
    generatePage(developer);
}

main();