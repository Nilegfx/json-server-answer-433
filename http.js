const http = require('http');
const url = require('url');
const pathPattern = /\/something\/?$/;

const PORT = 3000;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
function generateRandomBetween(min, max) {
  if (isNumeric(min) && isNumeric(max)) {
    return Math.floor(Math.random() * parseFloat(max)) + parseFloat(min)
  }
}

function sendResponse(response, status, json) {
  response.writeHead(status, {'Content-Type': 'text/json'});
  response.end(JSON.stringify(json));
}

function generateRandomArray(min, max) {

  min = min || 1;
  max = max || 90000000;

  let maxArrayLength = generateRandomBetween(1, 20);
  let randomArray = [];

  for (var i = 0; i < maxArrayLength; i++) {
    randomArray.push(generateRandomBetween(min, max))
  }

  return randomArray
}

function randomizeMiddleware(req, res) {

  let requestUrl = url.parse(req.url, true);
  let query = requestUrl.query
  let requestedPath = requestUrl.pathname;

  if (requestedPath.match(pathPattern)) {

    if (query.min || query.max) {

      let randomArray = generateRandomArray(query.min, query.max);

      sendResponse(res, 200, randomArray);

    } else {
      sendResponse(res, 400, {
        "error": "you should at least send one of min or max as query string"
      });
    }
  } else {
    sendResponse(res, 404, {
      "error": "can't find what you are looking for"
    });
  }
}

var server = http.createServer(randomizeMiddleware);

server.listen(PORT, function () {
  console.log("Server listening on: http://localhost:%s", PORT);
});