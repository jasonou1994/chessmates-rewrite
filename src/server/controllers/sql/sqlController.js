const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://jasonou@localhost:5432/chessmates');

sequelize.query("SELECT * FROM players", { type: sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
  })

  
let sqlController = {};

module.exports = sqlController;