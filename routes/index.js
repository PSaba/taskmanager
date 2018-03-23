var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');
// var sequelize = new Sequelize('tasks', 'priyanka', 'password', {
//   dialect: 'postgres'
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'hi', username: 'hi', handle: 'hi', 
    tweets: 21321, followers: [['asdasda', ['sdadads']]],
    posts: [['asdasda', ['sdadads']]], following: [['asdasda', ['sdadads']]], 
    reqhandle: 'thing', potfol: [['asdasda', ['sdadads']]] });
});

router.get('/seetasks', function(req, res){
  model.sequelize.query('SELECT * FROM "Users"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
  })
  const params = ['John Doe'];
  model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."name" = "Tasks"."name"', {  type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users[0][0]);
   // res.render('test', {everything: users});
  })
});

router.get('/personprofile/:handle', function(req, res){
  var params = {
    handle: req.params.handle
  };
  var taskssend;
  model.sequelize.query('SELECT * FROM "groupsusers" FULL OUTER JOIN "Tasks" on "groupsusers".grouphandle = "Tasks".grouphandle WHERE "Tasks".person LIKE \'handl1\'', { type: model.sequelize.QueryTypes.SELECT})
  .then(tasks => {
    console.log(tasks);
    taskssend = tasks;
//    res.render('test', {user:users[0]});
      model.sequelize.query('SELECT * FROM "Users" WHERE "Users".handle LIKE \'handl1\' ', { type: model.sequelize.QueryTypes.SELECT})
      .then(users => {
        console.log(users[0]);
        console.log(taskssend);
        res.render('test', {user:users[0], tasks: tasks});
      })
  })

  // model.sequelize.query('SELECT * FROM "Users" WHERE "Users".handle LIKE \'handl1\' ', { type: model.sequelize.QueryTypes.SELECT})
  // .then(users => {
  //   console.log(users[0]);
  //   console.log(taskssend);
  //   res.render('test', {user:users[0], tasks: taskssend});
  // })
});

router.get('/allstuff', function(req, res){
  var params = {
    handle: req.params.handle
  };
  model.sequelize.query('SELECT * FROM "groupsusers"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users[0]);
//    res.render('test', {user:users[0]});
  })
  var params = {
    handle: req.params.handle
  };
  model.sequelize.query('SELECT * FROM "Tasks"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users[0]);
//    res.render('test', {user:users[0]});
  })
  model.sequelize.query('SELECT * FROM "groupsusers" FULL OUTER JOIN "Tasks" on "groupsusers".grouphandle = "Tasks".grouphandle WHERE "Tasks".person LIKE \'handl1\'', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
//    res.render('test', {user:users[0]});
  })
});
router.post('/completetask', function(req, res){

});

router.delete('/deletetask', function(req, res){

})


module.exports = router;
