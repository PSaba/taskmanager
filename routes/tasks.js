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

router.get('/seeall', function(req, res){
  const params = ['John Doe'];
  model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."username" = "Tasks"."Name" WHERE "Users".person = $1', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
  })
});

// user/group/tasks
router.get('/seeall/personal/:handle/', function(req, res){
    const params = [req.params.handle];
    model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."handle" = "Tasks"."grouphandle" WHERE "Users".handle = $1', { bind: params, type: model.sequelize.QueryTypes.ACTION})
    .then(users => {
      console.log(users);
    })
  });

router.get('/newtemp', function(req, res){
    var params = {
        name: "Do this thing",
        person: "handl1",
        grouphandle: "handl1",
        completed: false,
        category: "General",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('INSERT INTO "Tasks" ("name", "person", "grouphandle", "completed", "category", "createdAt", "updatedAt") VALUES ($name, $person, $grouphandle, $completed, $category, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
});

router.get('/new2', function(req, res){
    var params = {
        name: "Do this thing too",
        person: "handl1",
        grouphandle: "handl1",
        completed: false,
        category: "General",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('INSERT INTO "Tasks" ("name", "person", "grouphandle", "completed", "category", "createdAt", "updatedAt") VALUES ($name, $person, $grouphandle, $completed, $category, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
});

router.get('/complete/:id', function(req, res){
    var params = {
        id: req.params.id,
        completed: true
    }
    model.sequelize.query('UPDATE "Tasks" SET completed = $completed WHERE id=$id RETURNING *', { bind: params, type: model.sequelize.QueryTypes.ACTION})
    .then(users => {
      console.log(users);
    })
});

router.post('/assign', function(req, res){

});

router.post('/accept', function(req, res){

});


module.exports = router;
