const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require("./data/pokemon.js");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.contentType("application/json");
  next();
});

app.get("/pokemon", function(req, res) {
  res.send(data);
});

// to receive the information of the pokemon that has the given id.
app.get("/pokemon/:id", function(req, res) {
  // for (let i = 0; i < data.length; i++) {
  //   console.log(data[i]);
  //   if (parseInt(data[i].id) === parseInt(req.params.id)) {
  //     return res.send(data[i]);
  //   }
  // }
  // res.status(404).send({ message: "Pokemon does not exist"});

  const pokemon = data.find(e => parseInt(e.id) === parseInt(req.params.id));

  if (!pokemon) {
    res.status(404).send({ message: "Pokemon does not exist" });
  }
  res.send(pokemon);
});

app.get("/pokemon/:id/attacks", function(req, res) {
  const pokemon = data.find(e => parseInt(e.id) === parseInt(req.params.id));

  if (!pokemon) {
    res
      .status(404)
      .send({ message: "404: Not found (resource does not exist)" });
  }
  res.send(pokemon.attacks);
});

app.post("/pokemon", function(req, res) {
  //console.log(req.body);
  const lastId = +data[data.length - 1].id;
  const newPokemon = { ...req.body, id: lastId + 1 };

  data.push(newPokemon);
  res.status(201).send(data);
});

app.put("/pokemon/:id", function(req, res) {
  const indexToModify = data.findIndex(e => +e.id === +req.params.id);

  if (indexToModify < 0) {
    //when the index is not found, it returns -1, that's why I put the condition less than 0.
    //console.log("I'm here2")
    res
      .status(404)
      .send({ message: "404: Not found (resource does not exist)" });
  } else {
    const newObject = { ...data[indexToModify], ...req.body };
    data[indexToModify] = newObject;
    res.status(200).send("Seccesfully updated");
  }
});

app.delete("/pokemon/:id", function(req, res) {
  const indexToDelete = data.findIndex(e => +e.id === +req.params.id);
  //console.log("I'm here")
  //console.log(indexToDelete);
  if (indexToDelete < 0) {
    //when the index is not found, it returns -1, that's why I put the condition less than 0.
    //console.log("I'm here2")
    res
      .status(404)
      .send({ message: "404: Not found (resource does not exist)" });
  } else {
    data.splice(indexToDelete, 1);

    res.send("Pokemon DELETED");
  }
});

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.listen(3000);
console.log("Listening on port 3000...");
