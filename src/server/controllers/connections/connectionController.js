const sqlController = require('../sql/sqlController.js');
const uuidv4 = require('uuid/v4');

let connectionController = {};
connectionController.connections = [];
connectionController.establishSSE = establishSSE;
connectionController.setCookie = setCookie;

function establishSSE (req, res, next) {
  // console.log('----- connectionController.establishSSE called. -----');

  res.header(200);
  res.header('Content-Type', 'text/event-stream');
  res.header('Connection', 'keep-alive');

  connectionController.connections.push({
    id : req.body.uuid,
    eventId : 1,
    player : null,
    sse : res,
    request : req,
  });

  // console.log(connectionController.connections);
  connectionController.connections.forEach(conn => console.log(conn.id));

  req.on('close', () => {
    //remove player from database, if exists
    //1. determine if the player is logged in to a player at all
    let player = connectionController.connections.find(conn => conn.id === req.body.uuid).player;


    //2. if so, update that player in db, and refresh all existing conns
    if (player) {
      sqlController.logOutPlayer(player);

      //refresh all existing conns with most updated db again
      sqlController._getAllPlayers((players) => {
        connectionController.connections.forEach(conn => {
          conn.sse.write('event: lobbyPlayers\n');
          conn.sse.write('id: ' + conn.eventId + '\n');
          conn.sse.write('data :' + JSON.stringify(players)+'\n\n');
          conn.eventId++;
        });
      });
    }

    //remove connection object
    connectionController.connections = connectionController.connections.filter(conn => conn.id !== req.body.uuid);
  })

  next();
}

function setCookie (req, res, next) {
  // console.log('----- connectionController.setCookie called. -----');
  if(!req.cookies['chessmates']){
    const uuid = uuidv4();
    res.cookie('chessmates', uuid, {expire : new Date() + 9999});
  }
  next();
}

module.exports = connectionController;