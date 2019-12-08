const Project = require('../models/project.server.model.js')

//Send all projects.
exports.getAll = function(req, res) {

    //find() with empty params returns all docs.
    Project.find({}, function(err, project) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        //Sort entries by date.
        res.status(200).send(project.sort(function (a, b) {
          return a.displayed_date - b.displayed_date
        }));
      }
    
    });
  
};

//Create a new project.
exports.createNew = function(req, res) {

  //Check for auth first, as data is being manipulated.
  if(req.isAuthenticated){
    var projects = new Project(req.body);
    projects.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(projects);
      }
    });
  } else {
    //Send "forbidden" if auth fails.
    res.status(403)
  }

};

//Update an existing project.
exports.updateExisting = function(req, res) {

  //Check for auth first, as data is being manipulated.
  if(req.isAuthenticated){
    var projects = req.body;

    var ObjectID = require('mongodb').ObjectID;

    //Find existing object by MongoDB ID, replace it.
    Project.replaceOne({"_id": ObjectID(projects._id)}, projects, function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(projects);
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
    var project = req.body;

    var ObjectID = require('mongodb').ObjectID;

    //Find existing object by MongoDB ID, delete it.
    Project.deleteOne({"_id": ObjectID(project._id)}, project, function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(project);
      }
    });
  } else {
    //Send "forbidden" if auth fails.
    res.status(403)
  }

};
