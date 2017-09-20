import * as Sequelize from 'sequelize';

export interface UserAttributes {
	id?: string;
	googleId?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
	accountPhotoURL?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {}