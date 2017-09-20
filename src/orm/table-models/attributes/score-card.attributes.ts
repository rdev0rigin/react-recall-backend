import * as Sequelize from 'sequelize';

export interface ScoreCardAttributes {
	id?: string;
	mastered?: boolean;
	timesPlayed?: number;
	correctAnswers?: number;
	missedAnswers?: number;
}

export interface ScoreCardInstance extends Sequelize.Instance<ScoreCardAttributes>, ScoreCardAttributes{}

export interface ScoreCardModel extends Sequelize.Model<ScoreCardInstance, ScoreCardAttributes> {}