var express = require('express');
var app = express();

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

app.use('/something', randomizeMiddleware)

app.use(function (req, res) {
  res.status(404).send({
    "error": "can't find what you are looking for"
  })
})

app.listen(3000, function () {
  console.log('app is running in port 3000');
})