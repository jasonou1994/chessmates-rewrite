const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const playerRouter = express.Router();
const connectionRouter = express.Router();

const playerController = require('./controllers/players/playerController');
const connectionController = require('./controllers/connections/connectionController.js');
const sqlController = require('./controllers/sql/sqlController.js');

app.use(express.static('dist'));
app.use(connectionController.setCookie);

app.get('/', (req, res, next) => {
  res.header(200);
  res.sendFile(path.join(__dirname,'../../dist','index.html'))
});

////Player Routes//////
app.use('/players', playerRouter);

playerRouter.post('/', playerController.uniquePlayerCheck, sqlController.addNewPlayer, playerController.addPlayerToConnection, sqlController.getAllPlayers,playerController.broadcastPlayers)

//Connection Routes
app.use('/connections', connectionRouter);

connectionRouter.post('/', connectionController.establishSSE, sqlController.getAllPlayers,  playerController.broadcastPlayers);

const server = app.listen(80, function () {
  console.log('Example app listening at http://%s:%s',
    server.address().address, server.address().port);
});