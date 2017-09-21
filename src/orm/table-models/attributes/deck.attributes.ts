import * as Sequelize from 'sequelize';

export interface DeckAttributes {
	id?: string;
	title?: string;
	description?: string;
	authorName?: string;
	authorId?: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
}

export interface DeckInstance extends Sequelize.Instance<DeckAttributes>, DeckAttributes{}

export interface DeckModel extends Sequelize.Model<DeckInstance, DeckAttributes> {}