const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS]});
require('dotenv').config();

client.on('ready', () => {
    console.log('Volanta is online and ready to fly. ✈')
});

(async () => {
    client.login(process.env.TOKEN)
})();