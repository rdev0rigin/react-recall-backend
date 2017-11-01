import {StoreManager} from './store.manager';

export class UserManager {

	constructor(
		private storeManager: StoreManager
	){}

	public async signInUser(userData){
		const response = await this.storeManager.updateCreateUser(userData);
		return response;
	}

	public getUserData(){

	}
}