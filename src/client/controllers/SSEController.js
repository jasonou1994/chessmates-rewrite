// import * as store from '../store';
// import * as actions from '../actions/actions';
const store = require('../store.js').default;
const actions = require('../actions/actions').default;

let sseController = {};
sseController.handleSSEResponse = handleSSEResponse;
sseController.parseSSEFields = parseSSEFields;

function handleSSEResponse (response) {
  const decoder = new TextDecoder('utf-8');
  const reader = response.body.getReader();

  let data = '';
  read();

  function read () {
    reader.read().then(obj => {
      // check if there is new info to add to data
      if (decoder.decode(obj.value) !== '') {
        data += decoder.decode(obj.value);
      }

      // check if there are double new lines to parse...
      let couldBeEvents = true;
      while (couldBeEvents) {
        const possibleEventArr = data.split(/\n\n/g);

        // if the array has a match, send it to be parsed, and send back to store
        if (possibleEventArr && possibleEventArr[0]) {
          const receivedEventFields = sseController.parseSSEFields(possibleEventArr[0]);
          console.log(receivedEventFields);
          store.dispatch(actions.updateLobbyPlayers(receivedEventFields.data));

          // splice possibleEventArr, recombine with \n\n to reconstruct original,
          // minus what was already parsed.
          possibleEventArr.splice(0, 1);
          data = possibleEventArr.join('\n\n');
        }
        // if does not contain, end while loop
        else {
          couldBeEvents = false;
        }
      }

      // base case
      if (obj.done) {
      }
      else {
        read();
      }
    });
  }
}

function parseSSEFields (rawString) {
  return (
    rawString
      // since the string is multi line, each for a different field, split by line
      .split('\n')
      // remove empty lines
      .filter(field => field !== '')
      // massage fields so they can be parsed into JSON
      .map((field) => {
        const fieldColonSplit = field
          .replace(/:/, '&&&&')
          .split('&&&&')
          .map(kv => kv.trim());

        const fieldObj = {
          [fieldColonSplit[0]]: fieldColonSplit[1],
        };
        return fieldObj;
      })
      .reduce((acc, cur) => {
        // handles if there are multiple fields of the same type, for example two data fields.
        const key = Object.keys(cur)[0];
        if (acc[key]) {
          acc[key] = `${acc[key]}\n${cur[key]}`;
        }
        else {
          acc[key] = cur[key];
        }
        return acc;
      }, {})
  );
}

module.exports = sseController;