var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
function generateRandomBetween(min, max) {
  if (isNumeric(min) && isNumeric(max)) {
    return Math.floor(Math.random() * parseFloat(max)) + parseFloat(min)
  }
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
  if (req.query.min || req.query.max) {

    let randomArray = generateRandomArray(req.query.min, req.query.max);

    res.send(randomArray);

  } else {
    res.status(400).send({
      "error": "you should at least send one of min or max as query string"
    })
  }
}


server.use('/something', randomizeMiddleware)
server.use(router)

server.use(function (req, res) {
  res.status(404).send({
    "error": "can't find what you are looking for"
  })
})

server.listen(3000, function () {
  console.log('JSON Server is running')
})
