const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://jasonou@localhost:5432/chessmates');

let sqlController = {};
sqlController.getAllPlayers = getAllPlayers;
sqlController.addNewPlayer = addNewPlayer;

function getAllPlayers (req, res, next) {
  console.log('----- sqlController.getAllPlayers called. -----');
  sequelize.query("SELECT * FROM players", { type: sequelize.QueryTypes.SELECT})
  .then(players => {
    req.players = players;
    next();
  })
};

function addNewPlayer (req, res, next) {
  console.log('----- sqlController.addNewPlayer called. -----');
  sequelize.query(`insert into players (name, loggedin) values ('${req.body.player}', 'true')`, { type: sequelize.QueryTypes.INSERT})
  .then(result => {
    req.result = result
    res.header(200);
    next();
  })
};

module.exports = sqlController;