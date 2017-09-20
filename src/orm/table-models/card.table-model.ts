export function cardModel(DataTypes, sequelize) {
	return sequelize.define('card', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		question: {
			type: DataTypes.STRING,
			allowNull: true
		},
		answer: {
			type: DataTypes.STRING,
			required: true,
		},
		// will be a JSON
		altAnswers: {
			type: DataTypes.TEXT,
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: false,
	})
}