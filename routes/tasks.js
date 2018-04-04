var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');
var io = require('../io');


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
    try {
            var params = {
          name: req.body.message.substring(0, 255),
          person: req.user.handle,
          grouphandle: req.params.handle,
          completed: false,
          duetime: req.body.duetime,
          category: req.body.category,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        model.sequelize.query('INSERT INTO "Tasks" ("name", "person", "grouphandle", "completed", "category", "duetime", "createdAt", "updatedAt") VALUES ($name, $person, $grouphandle, $completed, $category, $duetime, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
        .then(users => {
          console.log(users);
        })
        res.status(201);
      var socket = io.instance();
      socket.to(req.user.handle).emit('postmessage', {message: req.body.message, user: req.user, time: Date.now()});
      socket.to(req.params.handle).emit('postmessage', {message: req.body.message, user: req.user, time: Date.now()});
      
      res.redirect('/' + req.params.handle);
    } catch (error) {
      if(req.user){
        res.redirect('/users/prof' + req.params.handle);
      }
      res.redirect('/' + req.params.handle);
    }

});

router.post('/new/group/:handle', function(req, res){
  var params = {
      name: req.body.message,
      person: "NULL",
      grouphandle: req.params.handle,
      completed: false,
      duetime: req.body.duetime,
      category: req.body.category,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    model.sequelize.query('INSERT INTO "Tasks" ("name", "person", "grouphandle", "completed", "category", "duetime", "createdAt", "updatedAt") VALUES ($name, $person, $grouphandle, $completed, $category, $duetime, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
    .then(users => {
      console.log(users);
    })
  var socket = io.instance();
  socket.to(req.user.handle).emit('postmessage', {message: req.body.message, user: req.user, time: Date.now()});
  socket.to(req.params.handle).emit('postmessage', {message: req.body.message, user: req.user, time: Date.now()});
  
  res.redirect('/' + req.params.handle);
});

router.get('/complete/:id', function(req, res){
  try {
   //if(typeof req.params.id === "number"){
      console.log("type is number")
      var params = {
        id: req.params.id,
        completed: true
    }
    model.sequelize.query('UPDATE "Tasks" SET completed = $completed WHERE id=$id RETURNING *', { bind: params, type: model.sequelize.QueryTypes.ACTION})
    .then(users => {
      console.log(users);
    })
    res.status(200);
    res.redirect('/');
    //} else {
    //  res.status(500);
   // }
   // res.redirect('/');
  } catch (error) {
    res.status(200);
    res.redirect('/');
  }
});

router.post('/assign/:id', function(req, res){
  //console.log("person1", req.body.category);
  var params = {
      id: req.params.id,
      person: req.body.category
  }
  model.sequelize.query('UPDATE "Tasks" SET person = $person WHERE id=$id RETURNING *', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(tasks => {
    //console.log("person2", req.body.category);

    model.sequelize.query('SELECT * FROM "Users" WHERE handle LIKE $person', { bind: params, type: model.sequelize.QueryTypes.ACTION})
    .then(users => {
      params = {
        name: "NEW TASK ASSIGNED",
        person: users[0][0].handle,
        grouphandle: users[0][0].handle,
        completed: false,
        duetime: tasks[0][0].duetime,
        category: "General",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      //console.log("person3", users[0].handle);
      model.sequelize.query('INSERT INTO "Tasks" ("name", "person", "grouphandle", "completed", "category", "duetime", "createdAt", "updatedAt") VALUES ($name, $person, $grouphandle, $completed, $category, $duetime, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
    })

  })

  var socket = io.instance();
  console.log("sending");
  console.log(req.body.category);
 //socket.to(req.user.handle).emit('postmessage', {message: "NEW TASK ASSIGNED", user: req.user, time: req.body.duetime});
 // socket.to(req.params.handle).emit('postmessage', {message: "NEW TASK ASSIGNED", user: req.user, time: req.body.duetime});
  socket.to(req.body.category.trim()).emit('postmessage', {message: "NEW TASK ASSIGNED", user: req.user, time: req.body.duetime});
 // var socket = io.instance();
 // socket.to(req.user.handle).emit('postmessage', {message: req.body.message, user: req.user, time: req.body.duetime});
 // socket.to(req.params.handle).emit('postmessage', {message: req.body.message, user: req.user, time: req.body.duetime});
  socket.to(req.body.category.trim()).emit('postmessage', {message: req.body.message, user: req.user, time: req.body.duetime});

  res.redirect('/' + req.user.handle);
});


module.exports = router;
