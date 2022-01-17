import {
    ApplicationCommandData,
	ApplicationCommandOptionData,
	ApplicationCommandType,
	CommandInteraction,
	CommandInteractionOptionResolver,
	Message,
} from "discord.js";

export type SlashCommandRunFunction = ({
	interaction,
	options,
}: {
	interaction: CommandInteraction;
	options: CommandInteractionOptionResolver;
}) => any;
export type CommandRunFunction = ({
	message,
	args,
}: {
	message: Message;
	args: string[];
}) => any;

export interface ApplicationCommandOptions {
    options: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
};

export interface CommandOptions {
	name: string;
	description: string;
	aliases?: string[];
	category?: string;
	ownerOnly?: boolean;
	interactionData: ApplicationCommandOptions;
};