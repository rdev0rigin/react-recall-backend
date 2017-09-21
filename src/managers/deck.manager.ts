
import {CardAttributes, CardInstance} from '../orm/table-models/attributes/card.attributes';
import {StoreManager} from './store.manager';
import {DeckInstance} from '../orm/table-models/attributes/deck.attributes';

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
					const newDeck = await this.storeManager.getDeckById(deckInstance.id);
					return newDeck;
			})
			.catch(err => console.log('newDeck error', err));
		return deck;
	}

	public async getAllDecks() {
		return await this.storeManager.getDecks();
	}

	public async getUsersDecks(userId: string) {
		return await this.storeManager.getDeckByProp({authorID: userId});
	}
}