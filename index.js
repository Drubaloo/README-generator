var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
var inquirer = require(`inquirer`)
var fs = require(`fs`)
var username = ``
var gitHub = `https://api.github.com/users/` + username
var email = ``
var picture = ``

var json2md = require("json2md")

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

            $.ajax({
                url: gitHub,
                method: `GET`
            }).then(function (userInfo) {
                email = userInfo.email
                picture = userInfo.avatar_url


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

                                var info = `#` + (response.title) + "\n" + `#` + (response.description) + "\n" + `#` + (response.content) + "\n" + `#` + (response.instructions) + "\n" + `###` + (response.usage) + "\n" + `#` + (response.licence) + "\n" + `#` + (response.contributing) + "\n" + `#` + (response.tests) + "\n" + `#` + (email) + "\n" + (picture)

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