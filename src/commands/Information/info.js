const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName ('info')
        .setDescription('Returns info based on input')
        .addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("Gets information of a user mentioned")
                .addUserOption(option => option.setName("target").setDescription("The user mentioned")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription("Provides information about the server")),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "user") {

        const user = interaction.options.getUser("target")
        if (user) {
            await interaction.reply(`Username: ${username.user.tag}\nID: ${user.id}`);
        } else {
            await interaction.reply(`Username: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
        }
        } else if (interaction.options.getSubcommand() === "server") {
            await interaction.reply(`Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`)
        } else {
            await interaction.reply("No subcommand was used.");
        }
    },
};