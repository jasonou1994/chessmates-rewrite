const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://jasonou@localhost:5432/chessmates');

let sqlController = {};
sqlController.lobbyPlayersCache = [];
sqlController.getAllPlayers = getAllPlayers;
sqlController._getAllPlayers = _getAllPlayers;
sqlController.addNewPlayer = addNewPlayer;
sqlController.logOutPlayer = logOutPlayer;


function getAllPlayers (req, res, next) {
  // console.log('----- sqlController.getAllPlayers called. -----');
  sequelize.query("SELECT * FROM players where loggedin = TRUE", { type: sequelize.QueryTypes.SELECT})
  .then(players => {
    this.lobbyPlayersCache = players;
    req.players = players;
    next();
  })
};

function _getAllPlayers (callback) {
  sequelize.query("SELECT * FROM players where loggedin = TRUE", { type: sequelize.QueryTypes.SELECT})
  .then(players => {
    callback(players);
  })
}

function addNewPlayer (req, res, next) {
  // console.log('----- sqlController.addNewPlayer called. -----');
  sequelize.query(`insert into players (name, loggedin) values ('${req.body.player}', 'true')`, { type: sequelize.QueryTypes.INSERT})
  .then(result => {
    req.result = result
    res.header(200);
    next();
  })
};

function logOutPlayer (player) {
  sequelize.query(`update players set loggedin = 'false' where name = '${player}'`, {
    type : sequelize.QueryTypes.UPDATE
  })
  .then (result => {
    // console.log({result});
  })
  .catch (err => {
    // console.log({err});
  })
}

module.exports = sqlController;