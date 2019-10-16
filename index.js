const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");



const questions = [
  
];


inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(queryUrl).then(response => {
      console.log(response.data[0].name);
      const repositoryNames = response.data.map(repository => repository.name);
      console.log(repositoryNames);
    })
  });