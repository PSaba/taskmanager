var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');

router.get('/handle', function(req, res, next) {
  var params = {
    handle: req.params.handle
  }
  model.sequelize.query('SELECT * FROM "Users" WHERE handle = $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
  })
});

router.get('/loginpage', function(req, res, next){
  res.render('loginpage');
});

router.get('/logout', function(req, res){
  req.session.reset();
  req.user = null;
  res.redirect('/users/loginpage');
});

router.post('/loggedin', function(req, res, next){
  var params = {
    name: req.body.username.trim(),
    password: req.body.password.trim()
  }
  model.sequelize.query('SELECT * FROM "Users" WHERE name LIKE $name and password LIKE $password', {bind: params, type: model.sequelize.QueryTypes.SELECT})
   .then((results) => {
     if(results.rowCount === 0){
       res.render('/users/loginpage', {error: 'Something is messed up'});
     } else{
      req.user = results[0];
      delete req.user.password; // delete the password from the session
      req.session.user = results[0];
      name = results[0].name;
     // io.login();
      res.redirect('/personprofile/' +results[0].handle);
      //res.redirect('/');
     }

   })
   .catch((err) =>{
     console.log('error', err);
     res.send('Something bad happened');
   });
});

router.get('/profilepage/:page', function(req, res){
  io.login();
  if(req.user){
  

  } else{
    res.redirect('/users/loginpage');
  }


});

router.get('/signuppage', function(req, res, next){
  res.render('signuppage');
});

router.post('/signedup', function(req, res, next){
  var params = {
    name: req.body.name.trim(),
    handle: req.body.username.trim(),
    password: req.body.password1.trim(),
    category: "General",
    grouporuser: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  model.sequelize.query('INSERT INTO "Users" ("name", "handle", "password", "category", "grouporuser", "createdAt", "updatedAt") VALUES ($name, $handle, $password, $category, $grouporuser, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
  });

  var params = {
    userhandle: req.body.username.trim(),
    grouphandle: req.body.username.trim(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  model.sequelize.query('INSERT INTO "groupsusers" ("userhandle", "grouphandle", "createdAt", "updatedAt") VALUES ($userhandle, $grouphandle, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
  })
  res.redirect('/personalprofile/'+ req.body.username.trim());
});

router.get('/allusers', function(req, res){
  model.sequelize.query('SELECT * FROM "Users" WHERE grouporuser = false', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
  })
});


module.exports = router;
