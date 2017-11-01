import * as sequelizeStatic from 'sequelize';
import {DBConfig, DB_CONFIG} from '../orm/config';
import {UserModel} from '../orm/table-models/attributes/user.attributes';
import {userModel} from '../orm/table-models/user.table-model';
import {DeckInstance, DeckModel} from '../orm/table-models/attributes/deck.attributes';
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
			return await findResponses[0].update(userData, {where: {googleId: userData.googleId}});
		} else {
			return await this.User.create(userData);
		}
	}

	public async createCard(cardData) {
		return await this.Card.create(cardData);
	}

	public async updateCard(cardData) {
		return await this.Card.update(
			cardData,
			{
				where: {
					id: cardData.id
				}
			}
		);
	}

	public async createDeck(deckData) {
		return this.Deck.create(deckData);
	}

	public async updateDeck(deckData) {
		console.log('deckData \n', deckData);
		const findResponses = await this.Deck.findAll({where: {id: deckData.id}});
		console.log('Find Response \n', findResponses);
		if (findResponses.length > 0) {
			return await findResponses[0].update(deckData);
		} else {
			console.log('deck not found');
		}
	}

	public async getDecks(): Promise<DeckInstance[]> {
		return this.Deck.findAll({include:[this.Card]});
	}

	public async getDeckByProp(prop: {[key: string]:any}): Promise<DeckInstance[]> {
		return this.Deck
			.findAll(
				{
					where: {
						[Object.keys(prop)[0]]: prop[Object.keys(prop)[0]]
					}
			});
	}

	public async getDeckById(deckId): Promise<DeckInstance> {
		return await this.Deck.findById(deckId, {include: [this.Card]})
	}

	public async getUserByGoogleId(googleId) {

	}

}
