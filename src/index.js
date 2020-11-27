const discord = require('discord.js-self');
const Client = new discord.Client();

Client.config = require('./config');

Client.on('ready', ()=>{
    console.log(`AutoCatcher activated, logged as: ${Client.user.tag}`)
});

Client.on('message', async message => {

    const args = message.content.slice(Client.config.botPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(message.author.id === '571027211407196161'){

        if(Client.config.guildID !== null){
            if(Client.config.guildID !== message.guild.id)return;
        }
        let regex = new RegExp(/[0-9]/gi)
        let embed = message.embeds

        if(embed.length === 0)return;
        embed = message.embeds[0]
        if(!embed.footer)return;
        if(!embed.footer.text.toLowerCase().startsWith('type'))return;

        let number = embed.footer.text.match(regex).join('')
        console.log(`Captured card number ${number}`)
        return message.channel.send(`${Client.config.anigamePrefix}claim ${number}`)
    }

    if(message.author.bot)return;
    if(command === 'reboot'){
        console.log(`Rebooting system...`)
        Client.destroy()
        setTimeout(() => {
            process.exit(1)
        }, 1000);
    }
});

Client.login(Client.config.token)