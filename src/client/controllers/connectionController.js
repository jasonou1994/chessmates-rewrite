const sseController = require('./SSEController.js');

let connectionController = {};
connectionController.submitPlayer = submitPlayer;
connectionController.establishSSE = establishSSE;

function submitPlayer (player) {
  let postObj = {
    player,
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
  fetch('http://localhost:80/connections').then(response => {
    sseController.handleSSEResponse(response);
  });
}

module.exports = connectionController;