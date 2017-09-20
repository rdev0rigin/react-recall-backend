export interface DBConfig {
	username: string;
	password: string;
	database: string;
	host: string;
	dialect: string;
	pool: {
		max: number;
		min: number;
		idle: number;
	}
	storage: string;
}

export const DB_CONFIG = {
	username: 'rdev',
	password: 'sugarSyntax',
	database: 'recall-2-db',
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: './rdev.sql3'
};
