# The purpose 
This repo is in response to json-server's [issue 433](https://github.com/typicode/json-server/issues/433)

## Installation
do the following (in sequence)

```sh
git clone https://github.com/Nilegfx/json-server-answer-433.git
```
```sh 
cd json-server-answer-433
`````

do this step if you want to use express json-server options
```sh 
npm install
```

## Usage

### Using http (simple and super lite http server)
Recommended if you don't have any other use cases as it doesn't require any external library
```sh
node http
```

### Using Express
still simple server but not "super" lite server

```sh 
node express
```


## Make a request

#### using browser/tool

http://localhost:3000/something?min=20161201&max=20161208

#### with curl
```sh
 curl http://localhost:3000/something?min=20161201&max=20161208
```

* only one parameter required (either `min` or `max`)
* default for `min` if not send is `1`
* default for `max` if not send is `90000000`