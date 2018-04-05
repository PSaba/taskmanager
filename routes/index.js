var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');
// var sequelize = new Sequelize('tasks', 'priyanka', 'password', {
//   dialect: 'postgres'
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.redirect('/users/prof/' + req.user.handle);
  } else{
    res.redirect('/users/loginpage');
  }
});

router.get('/trytest', function(req, res, next) {
  res.status(200);
  res.end();
});

router.get('/deleteall', function(req, res){
  model.sequelize.query('DELETE  FROM "Users"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {});
  model.sequelize.query('DELETE  FROM "groupsusers"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {});
  model.sequelize.query('DELETE  FROM "Tasks"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {});
  res.redirect('/users/loginpage');
});

router.get('/seetasks', function(req, res){
  model.sequelize.query('SELECT * FROM "Users"', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
  })

  model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."name" = "Tasks"."name"', {  type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
   // res.render('test', {everything: users});
  })
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

router.get('/:handle', function(req, res){
  if(req.user){
    var params = {
      handle: req.params.handle
    }
    model.sequelize.query('SELECT grouporuser FROM "Users" WHERE "Users".handle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
    .then(users => {
      try {
        if(users[0].grouporuser){
          res.redirect('/groups/' + req.params.handle);
        } else {
          res.redirect('/users/prof/' + req.params.handle);
        }
      } catch (error) {
        res.redirect('/users/loginpage');
      }
    })
  } else {
    res.redirect('/users/loginpage');
  }
});

module.exports = router;
