const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const clientId = '970762180741967942';
const guildId = '974814674178687027';

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                // set a new item in the Collection
                // with the key as the command name and the value as the exported module
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }


        

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refresh application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandArray
                    },
                );

                console.log('Succesffuly reloaded application (/) commands.')
            } catch (error) {
                console.error(error);
            }
        })();
    };
};