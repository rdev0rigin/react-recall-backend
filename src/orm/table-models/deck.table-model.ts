export function deckModel(DataTypes, sequelize) {
	return sequelize.define('deck', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		title: {
			type: DataTypes.STRING,
			required: true,
		},
		description: {
			type: DataTypes.TEXT,
		},
		authorId: {
			type: DataTypes.TEXT,
		},
		authorName: {
			type: DataTypes.TEXT,
		}
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: false,
	})
}