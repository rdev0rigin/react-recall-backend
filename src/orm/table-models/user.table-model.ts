export function userModel(DataTypes, sequelize) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		googleId: {
			type: DataTypes.STRING,
			unique: 'compositeIndex',
			allowNull: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			unique: 'compositeIndex',
			type: DataTypes.STRING,
			required: true,
		},
	},{
		freezeTableName: true,
		paranoid: true,
		underscored: false,
	})
}