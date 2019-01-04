const store = require('../store.js').default;
const sseController = require('./SSEController.js');

let connectionController = {};
connectionController.submitPlayer = submitPlayer;
connectionController.establishSSE = establishSSE;

function submitPlayer (player) {
  let postObj = {
    player,
    uuid : store.getState().business.uuid,
  };

  fetch('http://localhost:80/players', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(postObj),
  })
};

function establishSSE () {
  let postObj = {
    uuid : store.getState().business.uuid,
  };

  fetch('http://localhost:80/connections', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(postObj),
  }).then(response => {
    sseController.handleSSEResponse(response);
  });
}

module.exports = connectionController;