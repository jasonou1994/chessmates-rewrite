const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://jasonou@localhost:5432/chessmates');

let sqlController = {};
sqlController.getAllPlayers = getAllPlayers;
sqlController.addNewPlayer = addNewPlayer;

function getAllPlayers (req, res, next) {
  sequelize.query("SELECT * FROM players", { type: sequelize.QueryTypes.SELECT})
  .then(players => {
    req.players = players;
    next();
  })
};

function addNewPlayer (req, res, next) {
  sequelize.query(`insert into players (name) values ('${req.body.player}')`, { type: sequelize.QueryTypes.INSERT})
  .then(result => {
    req.result = result
    res.header(200);
    next();
  })
};

module.exports = sqlController;