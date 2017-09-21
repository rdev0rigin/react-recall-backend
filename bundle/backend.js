/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __webpack_require__(2);
function boot() {
    main_1.default.bootstrap();
}
boot();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var store_manager_1 = __webpack_require__(3);
var user_manager_1 = __webpack_require__(10);
var channel_manager_1 = __webpack_require__(11);
var deck_manager_1 = __webpack_require__(12);
var IO = __webpack_require__(13);
var cors = __webpack_require__(14);
var RecallBackend = /** @class */ (function () {
    function RecallBackend() {
        this.express = __webpack_require__(15)();
        this.internalServer = __webpack_require__(16).createServer(this.express);
        this.internalIO = new IO(this.internalServer);
        this.StoreManager = new store_manager_1.StoreManager();
        this.init();
        this.expressInit();
    }
    RecallBackend.bootstrap = function () {
        return new RecallBackend();
    };
    ;
    ;
    RecallBackend.prototype.init = function () {
        var _this = this;
        this.UserManager = new user_manager_1.UserManager(this.StoreManager);
        this.DeckManager = new deck_manager_1.DeckManager(this.StoreManager);
        this.internalIO.on('connection', function (socket) {
            _this.ChannelManager = new channel_manager_1.ChannelManager(socket, _this.UserManager, _this.DeckManager).openChannels();
        });
        this.internalServer.listen(2729);
    };
    ;
    RecallBackend.prototype.expressInit = function () {
        this.express.use(cors());
    };
    ;
    return RecallBackend;
}());
exports.RecallBackend = RecallBackend;
exports.default = RecallBackend;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelizeStatic = __webpack_require__(4);
var config_1 = __webpack_require__(5);
var user_table_model_1 = __webpack_require__(6);
var deck_table_model_1 = __webpack_require__(7);
var card_table_model_1 = __webpack_require__(8);
var score_card_table_model_1 = __webpack_require__(9);
var StoreManager = /** @class */ (function () {
    function StoreManager() {
        this._dbConfig = config_1.DB_CONFIG;
        this.dbConfig(this._dbConfig);
        this.modelsInit();
        //This builds the tables and creates a new database
        this.syncTables();
    }
    StoreManager.prototype.modelsInit = function () {
        this.User = user_table_model_1.userModel(sequelizeStatic, this.sequelize);
        this.Deck = deck_table_model_1.deckModel(sequelizeStatic, this.sequelize);
        this.Card = card_table_model_1.cardModel(sequelizeStatic, this.sequelize);
        this.ScoreCard = score_card_table_model_1.scoreCardModel(sequelizeStatic, this.sequelize);
        this.User.hasMany(this.ScoreCard);
        this.User.hasMany(this.Deck);
        this.ScoreCard.belongsTo(this.Deck);
        this.ScoreCard.belongsTo(this.User);
        this.Deck.hasMany(this.Card);
        this.Card.belongsTo(this.Deck);
    };
    StoreManager.prototype.dbConfig = function (config) {
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
    };
    StoreManager.prototype.syncTables = function (cb) {
        if (cb === void 0) { cb = function () {
        }; }
        this.sequelize.sync().then(function () {
            return cb();
        });
    };
    StoreManager.prototype.updateCreateUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var findResponses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.User.findAll({ where: { googleId: userData.googleId } })];
                    case 1:
                        findResponses = _a.sent();
                        if (!(findResponses.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, findResponses[0].update(userData, { where: { googleId: userData.googleId } })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.User.create(userData)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StoreManager.prototype.createCard = function (cardData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Card.create(cardData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StoreManager.prototype.updateCard = function (cardData) {
        return __awaiter(this, void 0, void 0, function () {
            var findResponses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Card.findAll({ where: { id: cardData.id } })];
                    case 1:
                        findResponses = _a.sent();
                        if (!(findResponses.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.Card.update(cardData, { where: { id: cardData.id } })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.Card.create(cardData)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StoreManager.prototype.createDeck = function (deckData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.Deck.create(deckData)];
            });
        });
    };
    StoreManager.prototype.updateDeck = function (deckData) {
        return __awaiter(this, void 0, void 0, function () {
            var findResponses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('deckData \n', deckData);
                        return [4 /*yield*/, this.Deck.findAll({ where: { id: deckData.id } })];
                    case 1:
                        findResponses = _a.sent();
                        console.log('Find Response \n', findResponses);
                        if (!(findResponses.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.Deck.update(deckData, { where: { id: deckData.id } })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StoreManager.prototype.getDecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.Deck.findAll()];
            });
        });
    };
    StoreManager.prototype.getDeckByProp = function (prop) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, this.Deck
                        .findAll({
                        where: (_a = {},
                            _a[Object.keys(prop)[0]] = prop[Object.keys(prop)[0]],
                            _a)
                    })];
            });
        });
    };
    StoreManager.prototype.getDeckById = function (deckId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.Deck.findById(deckId, { include: [this.Card] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StoreManager.prototype.getUserByGoogleId = function (googleId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return StoreManager;
}());
exports.StoreManager = StoreManager;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = {
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function userModel(DataTypes, sequelize) {
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
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: false,
    });
}
exports.userModel = userModel;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function deckModel(DataTypes, sequelize) {
    return sequelize.define('deck', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            required: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
        authorId: {
            type: DataTypes.TEXT,
        },
        authorName: {
            type: DataTypes.TEXT,
        }
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: false,
    });
}
exports.deckModel = deckModel;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function cardModel(DataTypes, sequelize) {
    return sequelize.define('card', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: true
        },
        answer: {
            type: DataTypes.STRING,
            required: true,
        },
        // will be a JSON
        altAnswers: {
            type: DataTypes.TEXT,
        },
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: false,
    });
}
exports.cardModel = cardModel;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function scoreCardModel(DataTypes, sequelize) {
    return sequelize.define('score-card', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        mastered: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        timesPlayed: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        correctAnswers: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        missedAnswers: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        paranoid: true,
        underscored: false,
    });
}
exports.scoreCardModel = scoreCardModel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserManager = /** @class */ (function () {
    function UserManager(storeManager) {
        this.storeManager = storeManager;
    }
    UserManager.prototype.signInUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('signInUser called');
                        return [4 /*yield*/, this.storeManager.updateCreateUser(userData)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserManager.prototype.getUserData = function () {
    };
    return UserManager;
}());
exports.UserManager = UserManager;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChannelManager = /** @class */ (function () {
    function ChannelManager(io, userManager, deckManager) {
        var _this = this;
        this.io = io;
        this.userManager = userManager;
        this.deckManager = deckManager;
        this.openChannels = function () {
            _this.io.on('TEST', function (payload) {
                console.log('test received');
                _this.io.emit('TEST.response', 'TEST SUCCESS');
            });
            _this.io.on('USER_SIGNED_IN', function (payload) {
                console.log('payload', payload);
                _this.userManager.signInUser(payload.userData)
                    .then(function (res) {
                    console.log(res);
                    _this.io.emit('USER_SIGNED_IN.response', res);
                });
            });
            _this.io.on('CREATE_DECK', function (payload) {
                _this.deckManager.newDeck(payload.deckData)
                    .then(function (res) {
                    console.log(res);
                    _this.io.emit('CREATE_DECK.response', res);
                });
            });
            _this.io.on('GET_DECKS', function (payload) {
                _this.deckManager.getAllDecks()
                    .then(function (res) {
                    _this.io.emit('GET_DECKS.response', res);
                });
            });
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
        };
    }
    return ChannelManager;
}());
exports.ChannelManager = ChannelManager;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeckManager = /** @class */ (function () {
    function DeckManager(storeManager) {
        this.storeManager = storeManager;
    }
    DeckManager.prototype.newDeck = function (deckData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var deck;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storeManager
                            .createDeck(deckData)
                            .then(function (deckInstance) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, _a, card, newDeck;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _i = 0, _a = deckData.cards;
                                        _b.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                                        card = _a[_i];
                                        return [4 /*yield*/, this.storeManager.createCard(__assign({}, card, { deckId: deckInstance.id }))];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [4 /*yield*/, this.storeManager.getDeckById(deckInstance.id)];
                                    case 5:
                                        newDeck = _b.sent();
                                        return [2 /*return*/, newDeck];
                                }
                            });
                        }); })
                            .catch(function (err) { return console.log('newDeck error', err); })];
                    case 1:
                        deck = _a.sent();
                        return [2 /*return*/, deck];
                }
            });
        });
    };
    DeckManager.prototype.getAllDecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storeManager.getDecks()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeckManager.prototype.getUsersDecks = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storeManager.getDeckByProp({ authorID: userId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DeckManager;
}());
exports.DeckManager = DeckManager;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map