export function scoreCardModel(DataTypes, sequelize) {
	return sequelize.define('score-card', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		mastered: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		timesPlayed: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		correctAnswers: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		missedAnswers: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: false,
	})
}