
import {UserManager} from './user.manager';
import {DeckManager} from './deck.manager';

export class ChannelManager  {

	constructor (
		private io: SocketIO.Socket,
		private userManager: UserManager,
		private deckManager: DeckManager
	){}

	public openChannels = () => {
			this.io.on('TEST', payload => {
				console.log('test received');
				this.io.emit('TEST.response', 'TEST SUCCESS');
			});

			this.io.on('USER_SIGNED_IN', payload => {
				this.userManager.signInUser(payload.userData)
					.then((res: any) => {
						this.io.emit('USER_SIGNED_IN.response', res);
					});
			});

			this.io.on('CREATE_DECK', payload => {
				this.deckManager.newDeck(payload.deckData)
					.then((res: any) => {
						this.io.emit('CREATE_DECK.response', res);
					});
			});

			this.io.on('GET_DECKS', payload => {
				this.deckManager.getAllDecks()
					.then((res: any) => {
						this.io.emit('GET_DECKS.response', res);
					});
			});

			this.io.on('SAVE_DECK', payload => {
				console.log('Save Deck \n', payload);
				this.deckManager.saveDeck(payload.deckData)
					.then(res => {
						this.io.emit('SAVE_DECK.response', res);
					})
			})

		// this.io.on('session_auth:socket_io_room_create', payload => {
		// 	console.log('global payload\n', payload);
		// 	if(this.sessionManager.verifyJWT(payload.jwt)) {
		// 		const openedJWT = this.sessionManager.openJWT(payload.jwt);
		// 		const options: RoomOptions = {userId: openedJWT.user.id, channelName: payload.options.channelName}
		// 		this.socketIOService.createRoom(options).subscribe(res => {
		// 			console.log(res);
		// 			this.io.emit('session_auth:socket_io_room_create.response', res)
		// 		});
		// 	}
		// });
		//
		// this.io.on('user_auth::oauth2_received_code', payload => {
		// 	if(this.sessionManager.verifyJWT(payload.jwt)) {
		// 		const openedJWT = this.sessionManager.openJWT(payload.jwt);
		// 		this.sessionManager.setGoogleAccessTokens(payload);
		// 		this.io.emit('user_auth::oauth2_received_code.response',{ok: true} )
		// 	}
		// });
		//
		// this.io.on('user_auth::oauth2_sign_in', payload => {
		// 	console.log('oauth2', payload);
		// 	if(this.sessionManager.verifyJWT(payload.jwt)) {
		// 		this.userManager
		// 			.signInWithGoogle(payload);
		// 		this.io
		// 			.emit(
		// 				'user_auth::oauth2_sign_in.response',
		// 				{
		// 					ok: true,
		// 					payload: {
		// 						authURL:this.userManager.generateAuthURL(payload.jwt)}
		// 				});
		// 	} else {
		// 		this.io.emit('user_auth::oauth2_sign_in.response', {ok: false, message: 'JWT not valid'});
		// 	}
		// });
		//
		// this.io.on('session::jwt_verify', payload => {
		// 	console.log('jwt Verify \n', payload);
		// 	//it is for some reason throwing an error with an empty string -rob
		//
		// 	if(this.sessionManager.verifyJWT(payload)) {
		// 		// if(payload && payload.jwt && payload.jwt.length !== 0 && this.sessionManager.verifyJWT(payload)) {
		// 		this.io.emit('session::jwt_verify.response', {ok: true, jwt: payload});
		// 	} else {
		// 		this.io.emit('session::jwt_verify.response', {ok: false, message: 'JWT not valid'});
		// 	}
		// });
		//
		// this.io.on('session::jwt_unpack', payload => {
		// 	const {jwt} = payload;
		//
		// 	if(jwt !== '' && this.sessionManager.verifyJWT(jwt)){
		// 		const JWT = this.sessionManager.openJWT(jwt);
		// 		if (!JWT['ok']){
		// 			this.io.emit('session::jwt_unpack.response', {ok: true, openedJWT: JWT});
		// 		} else {
		// 			this.io.emit('session::jwt_unpack.response', {ok: false, message: 'Problem un packing JWT.'});
		// 		}
		// 	} else {
		// 		this.io.emit('session::jwt_unpack.response', {ok: false, message: 'JWT not valid'});
		// 	}
		// });
		//
		// this.io.on('user_auth::settings_update', payload => {
		// 	if(this.sessionManager.verifyJWT(payload.jwt)){
		// 		this.userManager
		// 			.setUserSettings(payload.formData, payload.jwt)
		// 			.then( jwt => {
		// 				if(typeof jwt === typeof 'string'){
		// 					this.io.emit('user_auth::settings_update.response', {ok: true, jwt: jwt})
		// 				} else {
		// 					this.io.emit('user_auth::settings_update.response', {ok: false, message: 'Error updating settings.'})
		// 				}
		// 			})
		// 	} else {
		// 		this.io.emit('user_auth::settings_update.response', {ok: false, message: 'JWT is invalid.'})
		// 	}
		// });
		//
		// this.io.on('user_auth::google_remove', async (payload: any)  => {
		// 	if (this.sessionManager.verifyJWT(payload.jwt)){
		// 		const openedJWT = this.sessionManager
		// 			.openJWT(payload.jwt);
		// 		const jwt = await this.userManager
		// 			.removeGoogleCredentials(openedJWT.user.id);
		// 		if (typeof jwt === typeof 'string') {
		// 			this.io.emit('user_auth::google_remove.response', {ok: true, jwt: jwt, routerLink: ['/Settings']});
		// 		} else {
		// 			this.io.emit('user_auth::google_remove.response', {ok: false, message: 'Google removal failed'});
		// 		}
		// 	} else {
		// 		this.io.emit('user_auth::google_remove.response', {ok: false, message: 'JWT not Valid'});
		// 	}
		// });
		//
		// this.io.on('user_auth::local_login',  async (payload: any) => {
		// 	const response: ResponseObject = await this.userManager.loginWithLocalStrategy(payload);
		// 	if (response.ok) {
		// 		this.io.emit('user_auth::local_login.response', {ok: true, jwt: response.payload, routerLink: ['/Dashboard']});
		// 	} else {
		// 		this.io.emit('user_auth::local_login.response', {ok: false, message: 'Local login failed.'});
		// 	}
		// });
		//
		// this.io.on('user_auth::local_register', async (payload: any)  => {
		// 	const response: ResponseObject = await this.userManager.registerNewUser(payload);
		// 	if (response.ok) {
		// 		this.io.emit('user_auth::local_register.response', {ok: true, jwt: response.payload, routerLink: ['/Vibe-Pro']});
		// 	} else {
		// 		this.io.emit('user_auth::local_register.response', {ok: false, message: 'Registration failed.'});
		// 	}
		// });
		//
		// this.io.on('user_auth::logged_out', socket => {
		// 	//todo collect analytics / state chain
		// 	return {
		// 		ok: true,
		// 		jwt: null,
		// 		routerLink: ['/Vibe-Pro']
		// 	};
		//
		// });
		//
		// this.io.on('user_auth::google_logIn',  async (payload: any) => {
		// 	const jwtWrapped: PayloadWrapper = await this.userManager.loginWithGoogleStrategy(payload).catch(error => {
		// 		console.log('err with loginUserWithGoogle' + error)
		// 	});
		// 	if (jwtWrapped.ok) {
		// 		this.io.emit('user_auth::google_logIn.response', {ok: true, jwt: jwtWrapped.payload, routerLink: ['/Dashboard']});
		// 	} else {
		// 		this.io.emit('user_auth::google_logIn.response', {ok: false, message: 'login failed' + payload.message});
		// 	}
		// });
		//
		// this.io.on('user_auth::google_verify', async (payload) => {
		// 	const valid = await this.userManager.verifyGoogleCredentials(payload);
		// 	if (valid) {
		// 		this.io.emit('user_auth::google_verify.response', {ok: true, message: 'Goggle Account Found'});
		// 	} else {
		// 		this.io.emit('user_auth::google_verify.response', {ok: false, message: 'Goggle Account Not Found'});
		// 	}
		// });
		// this.io.on('user_auth::google_register', async (payload: any)  => {
		// 	if (this.sessionManager.verifyJWT(payload.jwt)){
		// 		const jwt = await this.userManager.setGoogleCredentials(payload);
		// 		if (typeof jwt === typeof 'string') {
		// 			this.io.emit('user_auth::google_register.response', {ok: true, jwt: jwt, routerLink: ['/Vibe-Pro']});
		// 		} else {
		// 			this.io.emit('user_auth::google_register.response', {ok: false, message: 'registration failed'});
		// 		}
		// 	} else {
		// 		this.io.emit('user_auth::google_register.response', {ok: false, message: 'JWT not Valid'});
		// 	}
		// });
	}
}

export interface ResponseTransport {
	ok: boolean;
	payload?: {
		[key: string]: any;
	};
	message?: string;
}