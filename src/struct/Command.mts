import type {
	ApplicationCommandOptions,
	CommandOptions,
	CommandRunFunction,
	SlashCommandRunFunction,
} from "../interface/index.mjs";

export class Command {
	public name: string;
	public description: string;
	public aliases?: string[];
	public category!: string;
	public ownerOnly: boolean;
	public interactionData: ApplicationCommandOptions;
	public messageRun: CommandRunFunction;
	public interactionRun: SlashCommandRunFunction;

    /**
     * Initialisation.
     * @param {CommandOptions} opt The options.
     * @param {String} opt.name The name for this command.
     * @param {String} opt.description The description for this command.
     * @param {?Array<String>} opt.aliases The other names for this command.
     * @param {String} opt.category The category this command belongs to.
     * @param {Boolean} opts.ownerOnly Whether the command is only meant for bot owners.
     * @param {ApplicationCommandOptions} opt.interactionData Extra interaction-related data.
     */
	public constructor({
		name,
		description,
		aliases,
		category,
		ownerOnly = false,
		interactionData,
	}: CommandOptions) {
		/**
		 * This command's name.
		 * @type {String}
		 */

		this.name = name;

		/**
		 * This command's description.
		 * @type {String}
		 */

		this.description = description;

		/**
		 * Other names for this command.
		 * @type {?Array<String>}
		 */

		this.aliases = aliases;

		if (category)
			/**
			 * The category this command belongs to.
			 * @type {String}
			 */

			this.category = category;

		/**
		 * Whether this command is only meant for bot owners.
		 * @type {Boolean}
		 */

		this.ownerOnly = ownerOnly;

		/**
		 * Extra interaction-related data.
		 * @type {ApplicationCommandOptions}
		 */

		this.interactionData = interactionData;
	}
}
