/* #1 requiring external resourses*/
var express = require('express');
var app = express();
app.use(express.static('public'));

var bodyParser = require('body-parser'); //posting new items
var jsonParser = bodyParser.json();


/* #2 creating objects and constructors*/
var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage); //create is part of JS library
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


/* #3 api end points */
app.get('/items', function(request, response) { //endpoint is read
    response.json(storage.items);
});


app.post('/items', jsonParser, function(request, response) { //endpoint is created
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }
    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
  if (!request.body) { //body of request is empty
    return response.sendStatus(400);
  }
  var item = storage.delete(request.params.id);
  response.status(200).json(item);
});

app.put('/items/:id/:name', jsonParser, function(request, response) {
    //if there is a PUT, but no body, send a 400 error
    if (!request.body) {
        return response.sendStatus(400); //400 is error
    }
    var id = request.params.id; //requesting object from id
    var name = request.params.name; // requesting object from name
    //gets the item request name, creates a new object, calls add method, sends response 200 'ok'
    var item=storage.update(id,name);
    response.status(200).json(item);
});

/* #4 server settings*/
app.listen(process.env.PORT || 8080, process.env.IP); //


