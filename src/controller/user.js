"use strict";

var model = require("../model");

exports.create = function (req, res) {
  var data = req.body;
  console.log(data);
  model.User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    title: data.title,
    OrganizationId: data.OrganizationId
  }).then(function(user) {
    res.status(200).json(user);

  }).catch(function(error) {
    res.status(500).send(error);
  });
};

exports.update = function (req, res) {
  var data = req.body;
  model.User.findOne({where: {id: req.params.id}}).then(function(user) {
    if (!user) {
      console.log('Check');
      res.status(404).json({error: "User not found"});
    } else {
      if(data.firstName) { user.firstName = data.firstName; }
      if(data.lastName) { user.lastName = data.lastName; }
      if(data.title) { user.title = data.title; }

      user.save().then(function (user) {
          res.status(200).json(user);
      })
    }
  });
};

exports.delete = function (req, res) {
  model.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(user){
    res.status(200).json(user);
  });
};

exports.getByOrg = function (req, res) {
  var title = req.query.title;

  model.User.findAll({
    where: {
      organizationId: req.params.orgId,
      title: title || { $like: '%' }
    }
  }).then(function(users) {
    res.status(200).json(users);
  });
};
