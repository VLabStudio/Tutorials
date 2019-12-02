#!/usr/bin/env node
// main.js

// Import dependencies
const prompts = require("prompts");
const fs = require("fs-extra");

(async () => {

    // The response from all of the questions
    let response = {};

    // Get of the templates
    const templates = (await fs.readdir(`${process.mainModule.path}/templates`)).map((template) => {
        let info = require(`${process.mainModule.path}/templates/${template}/template.json`);
        if (typeof info === "undefined") {
            info = require(`${process.mainModule.path}/templates/${template}/package.json`);
        }

        info.dir = `${process.mainModule.path}/templates/${template}`;

        return info;
    });

    // All of the questions
    const questions = [{
        type: "text",
        name: "name",
        initial: "project",
        message: "project name?",
        validate: value => value.length < 3 ? `Name have to be more than 3 characters` : true
    }];

    // Ask which template to use if there's more than one
    if (templates.length > 1) {
        questions.push({
            type: "select",
            name: "template",
            message: "Pick a template",
            choices: templates.map((template) => ({
                title: template.name,
                description: template.description,
                value: template.dir
            })),
            initial: 0
        });
    }

    // On cancel
    const onCancel = prompt => {
        console.log("Never stop prompting!", prompt);
        return true;
    }

    // The response
    response = await prompts(questions, { onCancel });

    // if there's only one template then set the first template to be the template on response
    if (typeof response.template === "undefined") {
        response.template = templates[0].dir;
    }

    // Check if the project already exist
    if (await fs.exists(response.name)) {

        // Ask if we should override
        const overwrite = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'You already have a project with that name do you want to overwrite it?',
            initial: false
        });

        // Override the project if the user said yes
        if (overwrite.value === true) {

            // Remove old files
            await fs.remove(response.name);

            // Copy the template
            copyTemplate(response.name, response.template);

        }

    } else {

        // Copy the template
        copyTemplate(response.name, response.template);

    }

})();

// Copy the template
async function copyTemplate(name, template) {

    // Copy all of the files except the template.json file
    await fs.copy(template, name, {
        filter: (src, dest) => {
            if (src.includes("template.json"))
                return false;
            return true;
        }
    });

}