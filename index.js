const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
class betterDJS {
	constructor(client) {
		this.client = client;
	}
	async createEmbed(interaction, preDefinedEmbed) {
		let bool = 1;
		let embed = preDefinedEmbed
			? preDefinedEmbed
			: new MessageEmbed()
					.setAuthor({ name: "Embed Builder" })
					.setDescription(
						"Bienvenue dans l'embed builder interracif. Utilisez les boutons pour créer votre embed puis clicker sur Poster !"
					);
		let messageContent = null;
		let id = new Date().getTime();
		let row1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("author" + id)
					.setLabel("Auteur")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("title" + id)
					.setLabel("Titre")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("titleurl" + id)
					.setLabel("URL du Titre")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("description" + id)
					.setLabel("Description")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("footer" + id)
					.setLabel("Pied de page")
					.setStyle("SECONDARY")
			);
		let row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("authorimage" + id)
					.setLabel("Image de l'Auteur")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("thumbnail" + id)
					.setLabel("Miniature")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("image" + id)
					.setLabel("Large Image")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("footerimage" + id)
					.setLabel("Image de pied de page")
					.setStyle("SECONDARY")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("color" + id)
					.setLabel("Couleur de l'embed")
					.setStyle("SECONDARY")
			);
		let row3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("fields" + id)
					.setStyle("SECONDARY")
					.setLabel("Champs")
			)
			.addComponents(
				new MessageButton()
					.setCustomId(`messagecontent` + id)
					.setStyle("SECONDARY")
					.setLabel("Ajouter un message")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("timestamp" + id)
					.setStyle("SECONDARY")
					.setLabel("Ajouter l'heure")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("channel" + id)
					.setStyle("PRIMARY")
					.setLabel("Salon d'envoi")
			)
			.addComponents(
				new MessageButton()
					.setCustomId("post" + id)
					.setStyle("DANGER")
					.setLabel("Publier")
			);
		let field;
		let buttons = [row1, row2, row3];
		interaction.reply({
			embeds: [embed],
			components: buttons,
			ephemeral: true,
		});
		const filter = (click) => click.user.id === interaction.member.id;
		const wordFilter = (rep) => {
			return rep.author.id === interaction.member.id;
		};
		const collecter = interaction.channel.createMessageComponentCollector({
			filter,
			time: 900000,
		});
		let channel = interaction.channel;
		let back;
		collecter.on("collect", async function (click) {
			if (click.customId == "messagecontent" + id) {
				click.update({
					content:
						"Veuillez taper le contenu du message ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				messageContent = response.content || null;
				return click.editReply({
					embeds: [embed],
					content: " ",
					components: buttons,
				});
			}
			if (bool == 1 && !preDefinedEmbed) {
				(embed.description = null), (embed.author.name = null);
				bool = 0;
			}
			if (click.customId == "author" + id) {
				click.update({
					content:
						"Veuillez entrer le nom de l'auteur ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				while (response.content.length > 256) {
					response = await waitResponse(interaction.channel, wordFilter);
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					embed.setAuthor({
						name: response.content,
						iconURL: embed.author.iconURL || null,
					});
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "timestamp" + id) {
				try {
					if (embed.description == null)
						embed.description =
							"Bienvenue dans l'embed builder interractif. Utilisez les boutons pour créer votre embed puis cliquez sur le bouton « Poster » !";
					embed.setTimestamp();
				} catch {}
				click.update({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "title" + id) {
				click.update({
					content:
						"Veuillez taper le titre de l'embed ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				while (response.content.length > 256) {
					response = await waitResponse(interaction.channel, wordFilter);
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					embed.setTitle(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "titleurl" + id) {
				click.update({
					content:
						"Veuillez entrer l'URL du titre de l'embed ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				const regex =
					/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
				while (
					!regex.test(response.content) &&
					response.content.toLowerCase() != "cancel"
				) {
					response = await waitResponse(interaction.channel, wordFilter);
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					if (embed.title == null) embed.title = "Titre par défaut";
					embed.setURL(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "description" + id) {
				click.update({
					content:
						"Veuillez taper la description de l'embed ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					embed.setDescription(response.content);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "footer" + id) {
				click.update({
					content:
						"Veuillez entrer le texte du pied de page de l'embed ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					embed.setFooter({
						text: response.content || " ",
						iconURL: embed.footer?.iconURL,
					});
				} catch (e) {
					console.log(e.stack);
				}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "authorimage" + id) {
				click.update({
					content:
						"Quelle image souhaitez-vous mettre en icone de l'auteur ? (URL autorisée)\nTapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (!response.attachments.first()) {
					const regex =
						/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
					while (
						!regex.test(response.content) &&
						response.content.toLowerCase() != "cancel"
					) {
						response = await waitResponse(interaction.channel, wordFilter);
					}
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					if (embed.description == null)
						embed.description =
							"Bienvenue dans l'embed builder interractif. Utilisez les boutons pour créer votre embed puis cliquez sur le bouton « Poster » !";
					embed.setAuthor({
						name: embed.author.name || response.author.tag,
						iconURL: response.content || response.attachments.first().url,
					});
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "color" + id) {
				click.update({
					content:
						"Entrez le [code couleur hexadémical](https://htmlcolorcodes.com) pour l'embed ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/gm;
				while (
					!regex.test(response.content) &&
					response.content.toLowerCase() != "cancel"
				) {
					response = await waitResponse(interaction.channel, wordFilter);
					console.log(response);
				}
				if (response.content.toLowerCase() == "cancel")
					return returnHome(interaction, buttons);
				try {
					if (embed.description == null)
						embed.description =
							"Bienvenue dans l'embed builder interractif. Utilisez les boutons pour créer votre embed puis cliquez sur le bouton « Poster » !";
					embed.setColor(response.content);
					click.editReply({
						embeds: [embed],
						content: " ",
						components: buttons,
					});
				} catch {}
			} else if (click.customId == "thumbnail" + id) {
				click.update({
					content:
						"Quelle image souhaitez-vous mettre en miniature ? (URL autorisée)\nTapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (!response.attachments.first()) {
					const regex =
						/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
					while (
						!regex.test(response.content) &&
						response.content.toLowerCase() != "cancel"
					) {
						response = await waitResponse(interaction.channel, wordFilter);
					}
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					if (embed.description == null)
						embed.description =
							"Bienvenue dans l'embed builder interractif. Utilisez les boutons pour créer votre embed puis cliquez sur le bouton « Poster » !";
					embed.setThumbnail(
						response.content || response.attachments.first().url
					);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "image" + id) {
				click.update({
					content:
						"Quelle image souhaitez-vous mettre en image large de l'embed ? (URL autorisée)\nTapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (!response.attachments.first()) {
					const regex =
						/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
					while (
						!regex.test(response.content) &&
						response.content.toLowerCase() != "cancel"
					) {
						response = await waitResponse(interaction.channel, wordFilter);
					}
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					if (embed.description == null)
						embed.description =
							"Bienvenue dans l'embed builder interractif. Utilisez les boutons pour créer votre embed puis cliquez sur le bouton « Poster » !";
					embed.setImage(response.content || response.attachments.first().url);
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "footerimage" + id) {
				click.update({
					content:
						"Quel image voulez-vous intégrer au pied de page ?(URL autorisée)\nTapez `cancel` pour annuler l'action.",
					components: [],
				});
				let response = await waitResponse(interaction.channel, wordFilter);
				if (!response) return returnHome(interaction, buttons);
				if (!response.attachments.first()) {
					const regex =
						/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm;
					while (
						!regex.test(response.content) &&
						response.content.toLowerCase() != "cancel"
					) {
						response = await waitResponse(interaction.channel, wordFilter);
					}
				}
				if (response.content.toLowerCase() === "cancel")
					return returnHome(interaction, buttons);
				try {
					if (embed.description == null)
						embed.description =
							"Bienvenue dans l'embed builder interractif. Utilisez les boutons pour créer votre embed puis cliquez sur le bouton « Poster » !";
					embed.setFooter({
						text: embed.footer.text || response.guild.name,
						iconURL: response.content || response.attachments.first().url,
					});
				} catch {}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "channel" + id) {
				click.update({
					content: "Dans quel salon voulez-vous envoyer ce message ?",
					components: [],
				});
				let msg = await channel.awaitMessages({
					filter: wordFilter,
					max: 1,
					time: 120000,
				});
				let chan;
				if (msg.first().mentions.channels.first()) {
					chan = msg.first().mentions.channels.first();
				} else {
					chan = interaction.member.guild.channels.cache.get(
						msg.first().content
					);
				}
				try {
					msg.first().delete();
				} catch {}
				if (chan) {
					channel = chan;
					buttons[2].components[3].setLabel(chan.name);
				}
				click.editReply({ embeds: [embed], content: " ", components: buttons });
			} else if (click.customId == "post" + id) {
				click.update({ embeds: [], components: [], content: "Embed pubié !" });
				if (preDefinedEmbed) {
					return messageContent !== null
						? interaction.channel.messages.edit(interaction.targetId, {
								embeds: [embed],
								content: messageContent,
						  })
						: interaction.channel.messages.edit(interaction.targetId, {
								embeds: [embed],
						  });
				} else
					return messageContent !== null
						? channel.send({ content: messageContent, embeds: [embed] })
						: channel.send({ embeds: [embed] });
			} else if (click.customId == "fields" + id) {
				let fieldButtons = await getFieldButtons(embed.fields, id);
				click.update({ components: fieldButtons });
				back = "home";
			} else if (click.customId == "create-new" + id) {
				if (embed.fields.length >= 23)
					return click.reply({
						content: "Vous ne pouvez pas ajouter plus de 23 champs !",
						ephemeral: true,
					});
				click.update({
					content:
						"Entrez le nom du champs ou tapez `cancel` pour annuler l'action.",
					components: [],
				});
				let name = await waitResponse(interaction.channel, wordFilter);
				if (!name) return returnHome(click, buttons);

				while (
					name.content.toLowerCase() != "cancel" &&
					name.content.length > 256
				) {
					click.editReply({
						content: `Le nom du champs doit faire moins de 256 caractères. Veuillez rentrer un nom valide ou tapez \`cancel\` pour annuler l'ajout du champs`,
						ephemeral: true,
					});
					name = await waitResponse(interaction.channel, wordFilter);
				}

				if (name.content.toLowerCase() === "cancel") {
					let fieldButtons = await getFieldButtons(embed.fields, id);
					click.editReply({
						content: " ",
						components: fieldButtons,
					});
					back = "home";
					return;
				}

				click.editReply({
					content:
						"Entrez la description du champs ou tapez `cancel` pour annuler l'action.",
				});
				let value = await waitResponse(interaction.channel, wordFilter);
				if (!value) return returnHome(click, buttons);

				while (
					value.content.toLowerCase() != "cancel" &&
					value.content.length > 1024
				) {
					click.editReply({
						content: `La description du champs doit faire moins de 1024 caractères. Veuillez rentrer une description valide ou tapez \`cancel\` pour annuler l'ajout du champs`,
						ephemeral: true,
					});
					value = await waitResponse(interaction.channel, wordFilter);
				}

				if (value.content.toLowerCase() === "cancel") {
					let fieldButtons = await getFieldButtons(embed.fields, id);
					click.editReply({
						content: " ",
						components: fieldButtons,
					});
					back = "home";
					return;
				}
				embed.addFields({ name: name.content, value: value.content });
				let fieldButtons = await getFieldButtons(embed.fields, id);
				click.editReply({
					content: " ",
					embeds: [embed],
					components: fieldButtons,
				});
				back = "home";
			} else if (click.customId == "go-back" + id) {
				switch (back) {
					case "home":
						returnHome1(click, buttons);
						break;
					case "fields":
						let fieldButtons = await getFieldButtons(embed.fields, id);
						click.update({ components: fieldButtons });
						back = "home";
						break;
				}
			} else if (click.customId.startsWith(`edit-field${id}-`)) {
				field = Number(click.customId.split("-")[2]);
				let edits = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId("field-name-" + id)
							.setLabel(
								`Nom du champs : ${
									embed.fields[field].name.length > 80
										? embed.fields[field].name.slice(0, 61) + "..."
										: embed.fields[field].name
								}`
							)
							.setStyle("SECONDARY")
					)
					.addComponents(
						new MessageButton()
							.setCustomId("field-value-" + id)
							.setLabel("Description du champs")
							.setStyle("SECONDARY")
					);
				if (embed.fields[field].inline == true) {
					edits.addComponents(
						new MessageButton()
							.setCustomId("field-inline-" + id)
							.setLabel("Aligner")
							.setStyle("SUCCESS")
					);
				} else {
					edits.addComponents(
						new MessageButton()
							.setCustomId("field-inline-" + id)
							.setLabel("Aligner")
							.setStyle("DANGER")
					);
				}
				click.update({
					components: [
						edits,
						new MessageActionRow().addComponents(
							new MessageButton()
								.setCustomId("go-back" + id)
								.setStyle("SUCCESS")
								.setLabel("Retour")
						),
					],
				});
				back = "fields";
			} else if (
				click.customId.startsWith("field-") &&
				click.customId.endsWith(id)
			) {
				let check = click.customId.split("-")[1];
				let backup = click.message.components;
				if (check == "name") {
					click.update({
						content: "Quel nom voulez-vous donner au champs ?",
						components: [],
					});
					let rep = await waitResponse(interaction.channel, wordFilter);
					if (!rep) return returnHome(click, backup);
					while (
						rep.content.toLowerCase() != "cancel" &&
						rep.content.length > 256
					) {
						click.editReply({
							content: `Le nom du champs doit faire moins de 256 caractères. Veuillez rentrer un nom valide ou tapez \`cancel\` pour annuler l'édition du champs`,
							ephemeral: true,
						});
						rep = await waitResponse(interaction.channel, wordFilter);
					}

					if (rep.content.toLowerCase() === "cancel") {
						return click.editReply({ content: " ", components: backup });
					}
					embed.fields[field].name = rep.content;
					backup[0].components[0].data.label = `Nom du champs : ${
						rep.content.length > 80
							? rep.content.slice(0, 61) + "..."
							: rep.content
					}`;
					click.editReply({
						content: " ",
						embeds: [embed],
						components: backup,
					});
				} else if (check == "value") {
					click.update({
						content: "Quelle description voulez-vous donner au champs ?",
						components: [],
					});
					let rep = await waitResponse(interaction.channel, wordFilter);
					if (!rep) return returnHome(click, backup);

					while (
						rep.content.toLowerCase() != "cancel" &&
						rep.content.length > 1024
					) {
						click.editReply({
							content: `La description du champs doit faire moins de 1024 caractères. Veuillez rentrer une description valide ou tapez \`cancel\` pour annuler l'édition du champs`,
							ephemeral: true,
						});
						rep = await waitResponse(interaction.channel, wordFilter);
					}

					if (rep.content.toLowerCase() === "cancel") {
						return click.editReply({ content: " ", components: backup });
					}

					embed.fields[field].value = rep.content;
					click.editReply({
						content: " ",
						embeds: [embed],
						components: backup,
					});
				} else if (check == "inline") {
					if (embed.fields[field].inline == true) {
						embed.fields[field].inline = false;
						backup[0].components[2].data.style = 4;
						click.update({ embeds: [embed], components: backup });
					} else {
						embed.fields[field].inline = true;
						backup[0].components[2].data.style = 3;
						click.update({ embeds: [embed], components: backup });
					}
				}
			}
		});
	}
}

module.exports = betterDJS;

async function getFieldButtons(fields, id) {
	let array = [];
	let row = new MessageActionRow();
	let limit = 0;
	for (let field of fields) {
		if (row.components.length == 5) {
			array.push(row);
			row = new MessageActionRow();
		}
		row.addComponents(
			new MessageButton()
				.setCustomId(`edit-field${id}-` + limit)
				.setStyle("SECONDARY")
				.setLabel(
					field.name.length > 80 ? `${field.name.slice(0, 77)}...` : field.name
				)
		);
		limit++;
	}
	if (row.components.length) {
		if (row.components.length <= 3) {
			row.addComponents(
				new MessageButton()
					.setCustomId("go-back" + id)
					.setStyle("SUCCESS")
					.setLabel("Retour")
			);
			row.addComponents(
				new MessageButton()
					.setCustomId("create-new" + id)
					.setStyle("SUCCESS")
					.setLabel("Nouveau champs")
			);
			array.push(row);
		} else {
			array.push(row);
			row = new MessageActionRow();
			row.addComponents(
				new MessageButton()
					.setCustomId("go-back" + id)
					.setStyle("SUCCESS")
					.setLabel("Retour")
			);
			row.addComponents(
				new MessageButton()
					.setCustomId("create-new" + id)
					.setStyle("SUCCESS")
					.setLabel("Nouveau champs")
			);
			array.push(row);
		}
	} else {
		row.addComponents(
			new MessageButton()
				.setCustomId("go-back" + id)
				.setStyle("SUCCESS")
				.setLabel("Retour")
		);
		row.addComponents(
			new MessageButton()
				.setCustomId("create-new" + id)
				.setStyle("SUCCESS")
				.setLabel("Nouveau champs")
		);
		array.push(row);
	}
	return array;
}

async function waitResponse(channel, filter) {
	let msg = await channel.awaitMessages({
		filter: filter,
		max: 1,
		time: 120000,
	});
	try {
		msg.first().delete();
		return msg.first();
	} catch {
		return undefined;
	}
}

function returnHome(interaction, buttons) {
	interaction.editReply({ components: buttons, content: " " });
}

function returnHome1(interaction, buttons) {
	interaction.update({ components: buttons, content: " " });
}
