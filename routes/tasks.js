var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');

router.get('/seeall', function(req, res){
  model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."username" = "Tasks"."Name"', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
  })
  res.end();
});

// user/group/tasks
router.get('/seeall/personal/:handle/', function(req, res){
    const params = [req.params.handle];
    model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."handle" = "Tasks"."grouphandle" WHERE "Users".handle = $1', { bind: params, type: model.sequelize.QueryTypes.ACTION})
    .then(users => {
      console.log(users);
    })
    res.end();
  });

  router.post('/new/:handle', function(req, res){
    var params = {
        name: req.body.message,
        person: req.user.handle,
        grouphandle: req.params.handle,
        completed: false,
        category: req.body.category,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      model.sequelize.query('INSERT INTO "Tasks" ("name", "person", "grouphandle", "completed", "category", "createdAt", "updatedAt") VALUES ($name, $person, $grouphandle, $completed, $category, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
    res.end();
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
    res.send('complete');
});

router.post('/assign', function(req, res){

});

router.post('/accept', function(req, res){

});


module.exports = router;
