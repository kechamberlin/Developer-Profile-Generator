const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "location",
            message: "Where are you from?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        }
    ])

        .then(function ({ username }) {
            let queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
            axios.get(queryUrl).then(response => {
                console.log(response.data[0].name);
                const repositoryNames = response.data.map(repository => repository.name);
                console.log(repositoryNames);
            })
        })

        .then(function ({ location }) {
            // Couldn't get a real google maps api, so this placeholder is used instead
            let queryUrl = `"https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"`;
        });
}




promptUser()
    .then(function (data) {
        const html = generateHTML(data);
        return writeFileAsync("generateHTML.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });