import * as sequelizeStatic from 'sequelize';
import {DBConfig, DB_CONFIG} from '../orm/config';
import { UserInstance, UserModel} from '../orm/table-models/attributes/user.attributes';
import {userModel} from '../orm/table-models/user.table-model';
import Bluebird = require('bluebird');
import {DeckModel} from '../orm/table-models/attributes/deck.attributes';
import {CardModel} from '../orm/table-models/attributes/card.attributes';
import {deckModel} from '../orm/table-models/deck.table-model';
import {cardModel} from '../orm/table-models/card.table-model';
import {ScoreCardModel} from '../orm/table-models/attributes/score-card.attributes';
import {scoreCardModel} from '../orm/table-models/score-card.table-model';

export interface StoreManager {
	syncTables(cb?): void;
}

export class StoreManager implements StoreManager {
	public sequelize: sequelizeStatic.Sequelize;
	private User: UserModel;
	private Deck: DeckModel;
	private Card: CardModel;
	private ScoreCard: ScoreCardModel;
	private _dbConfig: DBConfig = DB_CONFIG;

	constructor(
	) {
		this.dbConfig(this._dbConfig);
		this.modelsInit();
		//This builds the tables and creates a new database
		this.syncTables();
	}

	private modelsInit(): void {
		this.User = userModel(sequelizeStatic, this.sequelize);
		this.Deck = deckModel(sequelizeStatic, this.sequelize);
		this.Card = cardModel(sequelizeStatic, this.sequelize);
		this.ScoreCard = scoreCardModel(sequelizeStatic, this.sequelize);
		this.User.hasMany(this.ScoreCard);
		this.User.hasMany(this.Deck);
		this.ScoreCard.belongsTo(this.Deck);
		this.ScoreCard.belongsTo(this.User);
		this.Deck.hasMany(this.Card);
		this.Card.belongsTo(this.Deck);
	}

	private dbConfig(config): void {
		this.sequelize = new sequelizeStatic(config.database, config.username, config.password, {
			host: config.host,
			dialect: config.dialect,
			pool: {
				max: config.pool.max,
				min: config.pool.min,
				idle: config.pool.idle
			},
			storage: config.storage
		});
	}

	public syncTables(cb = () => {
	}): void {
		this.sequelize.sync().then(() => {
			return cb();
		});
	}

	public async updateCreateUser(userData) {
		const findResponses = await this.User.findAll({where: {googleId: userData.googleId}});
		if (findResponses.length > 0) {
			const updated = await findResponses[0].update(userData, {where: {googleId: userData.googleId}});
				console.log('updated 71 \n', updated);
		} else {
			return await this.User.create(userData);
		}
	}

	public async updateCreateCard(cardData, deckId) {
		const findResponses = await this.Card.findAll({where: {id: cardData.id}});
		if (findResponses.length > 0) {
			return await this.Card.update(cardData, {where: {id: cardData.id}});
		} else {
			return await this.Card.create(cardData);
		}
	}

	public async updateCreateDeck(deckData) {
		const findResponses = await this.Deck.findAll({where: {id: deckData.id}});
		if (findResponses.length > 0) {
			return await this.Deck.update(deckData, {where: {id: deckData.id}});
		} else {
			return await this.Deck.create(deckData);
		}
	}

	public async getUserByGoogleId(googleId) {

	}


	// public async updateCreateLocalCredentials(props:{[key: string]: any}, userId ?: string): Bluebird<boolean>{
	// 	if(!props && !userId){
	// 		return false;
	// 	}
	// 	const localInstance = await this.LocalUser
	// 		.findAll({
	// 			where: {
	// 				ownerId: userId
	// 			}
	// 		});
	// 	if (localInstance.length > 0) {
	// 		const updatedInstance = await localInstance[0]
	// 			.update(props, {
	// 				where: {
	// 					ownerId: userId
	// 				}
	// 			});
	// 		if (updatedInstance) {
	// 			return true;
	// 		}
	// 		const localUser = await this.LocalUser
	// 			.create({
	// 				...props,
	// 				ownerId: userId
	// 			});
	// 		return !!localUser;
	// 	}
	// }
	//
	// public async getUsersInfo(props: { [key: string]: any }): Bluebird<UserInstance[]> {
	// 	return await this.User
	// 		.findAll({
	// 			where: {...props},
	// 	});
	// }
	//
	// public async updateCreateGoogleCredentials(props, userId): Bluebird<boolean> {
	// 	if(!props && !userId){
	// 		return false;
	// 	}
	// 	const googleInstance = await this.GoogleUser
	// 		.findAll({
	// 			where: {
	// 				ownerId: userId
	// 			}
	// 		});
	// 	if (googleInstance.length > 0) {
	// 		const updatedInstance = await googleInstance[0]
	// 			.update(props, {
	// 				where: {
	// 					ownerId: userId
	// 				}
	// 		});
	// 		if (updatedInstance) {
	// 			return true;
	// 		}
	// 		const googleUser = await this.GoogleUser
	// 			.create({
	// 				...props,
	// 				ownerId: userId
	// 		});
	// 		return !!googleUser;
	// 	}
	// }
	//
	// public async getLocalInfoBy(props): Bluebird<LocalInstance[]> {
	// 	return await this.LocalUser
	// 		.findAll({where: {...props}})
	// }
	// public async getGoogleInfo(props): Bluebird<GoogleInstance[]> {
	// 	return await this.GoogleUser
	// 		.findAll({where: {...props}})
	// }
	//
	// public async createLocal(props): Bluebird<LocalInstance> {
	// 	return await this.LocalUser.create(props);
	// }
	//
	// public async createUser(props): Bluebird<UserInstance> {
	// 	console.log('create', props);
	//
	// 	return await this.User
	// 		.create(props).catch(err => {
	// 			console.log(err);
	// 			return err;
	// 		});
	//
	// }
	//
	// public updateUser(props, user_id): Bluebird<boolean> {
	// 	return this.User.update(props,{where: {id: user_id}})
	// 		.then((userInstance: [number, UserInstance[]])=> {
	// 			if (userInstance[0] > 0) {
	// 				return true
	// 			}
	// 		});
	// }
}
