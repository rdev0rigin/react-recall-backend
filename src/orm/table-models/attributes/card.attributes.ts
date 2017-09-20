import * as Sequelize from 'sequelize';

export interface CardAttributes {
	id?: string;
	question?: string;
	answer?: string;
	altAnswers?: string;
	updated_at?: string;
	deleted_at?: string;
}

export interface CardInstance extends Sequelize.Instance<CardAttributes>, CardAttributes{}

export interface CardModel extends Sequelize.Model<CardInstance, CardAttributes> {}