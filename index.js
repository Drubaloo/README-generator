
var axios = require(`axios`)
var inquirer = require(`inquirer`)
var fs = require(`fs`)
var username = ``
var gitHub = `https://api.github.com/users/` + username
var email = ``
var picture = ``


inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
        },
    ])
    .then(function (response) {
        fs.writeFile("name.json", JSON.stringify(response), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");
            username = response.username
            gitHub = `https://api.github.com/users/` + username
            console.log(gitHub)
            axios.get(gitHub).then(function (userInfo) {
                console.log(userInfo)
                email = userInfo.data.email
                picture = userInfo.data.avatar_url



                inquirer
                    .prompt([

                        {
                            type: "input",
                            message: "What is your project title?",
                            name: "title"
                        },
                        {
                            type: "input",
                            message: "Please enter a short description of your project",
                            name: "description"
                        },
                        {
                            type: "input",
                            message: "Please list your table of contents",
                            name: "content"
                        },
                        {
                            type: "input",
                            message: "please list installation instructions",
                            name: "instructions"
                        },
                        {
                            type: "input",
                            message: "What would you use this product for",
                            name: "usage"
                        },
                        {
                            type: "input",
                            message: "What is this liscenced under?",
                            name: "licence"
                        },
                        {
                            type: "input",
                            message: "Who contributed to this project?",
                            name: "contributing"
                        },
                        {
                            type: "input",
                            message: "How did you test this project?",
                            name: "tests"
                        }
                    ])
                    .then(function (response) {



                        var info = `# ${response.title} \n#  ${response.description} \n# Table of Contents \n### ${response.content} \n# Instructions \n### ${response.instructions} \n# Usage \n### ${response.usage} \n# Licensing \n### ${response.licence} \n# Contributors \n### ${response.contributing}\n# Testing \n### ${response.tests} \n# Email \n### ${email} \n ![profile image](${picture}) \n \n ${'[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)'}`

                        fs.appendFile("README.md", info + "\n", function (err) {

                            if (err) {
                                return console.log(err);
                            }

                            console.log("Success!");

                            console.log(info)

                        });


                    })
            })
        })
    })