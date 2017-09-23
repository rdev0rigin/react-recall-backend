
import {CardAttributes, CardInstance} from '../orm/table-models/attributes/card.attributes';
import {StoreManager} from './store.manager';
import {DeckInstance} from '../orm/table-models/attributes/deck.attributes';
import {async} from 'rxjs/scheduler/async';
import {isUndefined} from 'util';

export interface FlashCardDeck {
	cards: CardAttributes[];
	meta:{
		id?: string;
		authorName: string;
		authorId: string;
		description: string;
		createdOn?: string;
		title: string;
	}
	[key: number]: CardAttributes;
}

export class DeckManager {

	constructor(
		private storeManager: StoreManager
	){}

	public async newDeck(deckData: FlashCardDeck): Promise<any> {
		const deck = await this.storeManager
			.createDeck(deckData)
			.then(async (deckInstance: DeckInstance) => {
					for( let card of deckData.cards) {
						await this.storeManager.createCard(
							{
								...card,
								deckId: deckInstance.id
							});
					}
					return await this.storeManager.getDeckById(deckInstance.id);
			})
			.catch(err => console.log('newDeck error', err));
		return deck;
	}

	public async saveDeck(deckData): Promise<any> {
		const deckValues = {
			id: deckData.id,
			title: deckData.title,
			description: deckData.description,
			authorName: deckData.authorName,
			authorId: deckData.authorId,
		};
		return this.storeManager.updateDeck(deckValues)
			.then(async (deckInstance: any) => {
				for (let card of deckData.cards){
					if(!isUndefined(card.id)) {
						await this.storeManager.updateCard(card);
					} else {
						console.log('Deck Instance \n', deckData.cards);
						await this.storeManager.createCard(
							{
								...card,
								deckId: deckInstance.id
							});
					}
				}
				return this.storeManager.getDeckById(deckInstance.id);
			});
	}

	public async getAllDecks() {
		return await this.storeManager.getDecks();
	}

	public async getUsersDecks(userId: string) {
		return await this.storeManager.getDeckByProp({authorID: userId});
	}
}