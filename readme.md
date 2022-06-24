<h1 align="center">djs-embed-builder (en Français)</h1>
<br></br>

## Info

Ce projet est une fork du projet initial de [@braxtongpoll/djs-embed-builder](https://github.com/braxtongpoll/djs-embed-builder)

## Utilisation
```js
const { Client } = require('discord.js');
const djs = require(`djs-embed-builder`);
const client = new Client();
client.embed = new djs(client).createEmbed

client.on("interactionCreate", (client, interaction) => {
    if (interaction.commandName == "embed") {
        client.embed(interaction);
    };
});

client.on("messageCreate", (client, message) => {
    let prefix = "+";
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    if (command == "embed") {
        client.embed(message);
    };
});
```


## Dépendances 
* [Discord.js@13.1.0](https://npmjs.com/package/discord.js)

## Examples
Pour voir des examples, rendez-vous dans le fichier [examples.js](https://github.com/Gamers-geek/djs-embed-builder/blob/main/src/examples.js)

Le module est extrêmement simple à utiliser !

## Contact 
* [Discord](https://discord.gg/7ykdCWQGE6)
* [Github](https://github.com/Gamers-geek)
* [Website](https://gamers-geek.gq/)
