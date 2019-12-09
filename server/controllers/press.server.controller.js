const Press = require('../models/press.server.model.js')

//Send all press releases.
exports.getAll = function(req, res) {

    //find() with empty params returns all docs.
    Press.find({}, function(err, press) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        //Sort entries by date.
        res.status(200).send(press.sort(function (a, b) {
          return a.displayed_date - b.displayed_date
        }));
      }
    
    });
  
};

//Create a new press release.
exports.createNew = function(req, res) {

  //Check for auth first, as data is being manipulated.
  if(req.isAuthenticated){
    var pressrelease = new Press(req.body);
    pressrelease.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(pressrelease);
      }
    });
  } else {
    //Send "forbidden" if auth fails.
    res.status(403)
  }

};

//Update an existing press release.
exports.updateExisting = function(req, res) {

  //Check for auth first, as data is being manipulated.
  if(req.isAuthenticated){
    var pressrelease = req.body;

    var ObjectID = require('mongodb').ObjectID;

    //Find existing object by MongoDB ID, replace it.
    Press.replaceOne({"_id": ObjectID(pressrelease._id)}, pressrelease, function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(pressrelease);
      }
    });
  } else {
    //Send "forbidden" if auth fails.
    res.status(403)
  }

};

exports.deleteEntry = function(req, res) {

  //Check for auth first, as data is being manipulated.
  if(req.isAuthenticated){
    var pressrelease = req.body;

    var ObjectID = require('mongodb').ObjectID;

    //Find existing object by MongoDB ID, delete it.
    Press.deleteOne({"_id": ObjectID(pressrelease._id)}, pressrelease, function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(pressrelease);
      }
    });
  } else {
    //Send "forbidden" if auth fails.
    res.status(403)
  }

};
