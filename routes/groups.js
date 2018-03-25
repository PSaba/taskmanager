var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');


router.get('/', function(req, res, next) {
  res.render('index', { name: 'hi', username: 'hi', handle: 'hi', 
    tweets: 21321, followers: [['asdasda', ['sdadads']]],
    posts: [['asdasda', ['sdadads']]], following: [['asdasda', ['sdadads']]], 
    reqhandle: 'thing', potfol: [['asdasda', ['sdadads']]] });
});

router.post('/new', function(req, res){
    var params = {
        name: req.body.name,
        handle: req.body.username,
        password: req.body.password1,
        category: "General",
        grouporuser: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('INSERT INTO "Users" ("name", "handle", "password", "category", "grouporuser", "createdAt", "updatedAt") VALUES ($name, $handle, $password, $category, $grouporuser, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      });
      if(req.user){
        var params = {
          userhandle: req.user.handle,
          grouphandle: req.body.username,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        model.sequelize.query('INSERT INTO "groupsusers" ("userhandle", "grouphandle", "createdAt", "updatedAt") VALUES ($userhandle, $grouphandle, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
        .then(users => {
          console.log(users);
        })
      }
      res.redirect('/groupprofile/' + req.body.username);
});

router.get('/join/:handle', function(req, res){
    if(req.user){
      var params = {
        userhandle: req.user.handle,
        grouphandle: req.params.handle,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('INSERT INTO "groupusers" ("userhandle", "grouphandle", "createdAt", "updatedAt") VALUES ($userhandle, $grouphandle, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
    }
    else{
      res.redirect('/users/loginpage')
    }
    
});

router.get('/leave/:grouphandle/:personhandle', function(req, res){
    var params = {
        userhandle: "handl1",
        grouphandle: "self",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('DELETE FROM "groupusers" WHERE userhandle = $userhandle AND grouphandle = $grouphandle', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
});

router.get('/addcategory/:cato', function(req, res){
    var params = {
        name: "newname",
        handle: "handl1",
        password: "soso",
        category: req.params.cato,
        grouporuser: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('INSERT INTO "users" ("name", "handle", "password", "category", "grouporuser", "createdAt", "updatedAt") VALUES ($name, $handle, $password, $groups, $category, $grouporuser, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      });
  
});

router.post('/removecategory/:cato', function(req, res){
    var params = {
        grouphandle: "handl1",
        category: req.params.cato,
      }
      model.sequelize.query('DELETE FROM "users" WHERE handle = $grouphandle AND category=$category', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      });
});

router.post('/seeall', function(req, res){
    model.sequelize.query('SELECT * FROM "Users" WHERE grouporuser = true', { type: model.sequelize.QueryTypes.SELECT})
    .then(groups => {
      console.log(groups);
    })
});


module.exports = router;
