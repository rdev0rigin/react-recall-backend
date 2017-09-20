import {Express} from 'express';
import {StoreManager} from './managers/store.manager';
import {UserManager} from './managers/user.manager';
import {ChannelManager} from './managers/channel.manager';
import {DeckManager} from './managers/deck.manager';
const IO = require('socket.io');
const cors = require('cors');

export class RecallBackend {

	private express: Express = require('express')();
	private internalServer = require('http').createServer(this.express);
	private internalIO: SocketIO.Server = new IO(this.internalServer);
	private StoreManager = new StoreManager();
	private DeckManager = new DeckManager();
	private UserManager;
	private ChannelManager;

	public static bootstrap(): RecallBackend {
		return new RecallBackend();
	};

	constructor(){
		this.init();
		this.expressInit();
	};

	private init(): void {
	this.UserManager = new UserManager(this.StoreManager);
		this.internalIO.on('connection', socket => {
			this.ChannelManager = new ChannelManager(socket, this.UserManager, this.DeckManager).openChannels();
	});
		this.internalServer.listen(2729);
	};

	private expressInit(): void {
		this.express.use(cors());
	};
}

export default RecallBackend;


