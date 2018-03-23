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

router.post('/logout', function(req, res){
  req.session.reset();
  req.user = null;
  req.redirect('/users/loginpage');
});

router.post('/loggedin', function(req, res, next){
   const client = new Client();
   client.connect()
   .then(() => {
     const sql = 'SELECT * FROM users WHERE user_name = $1;'
     const params = [req.body.username.trim()];
     return client.query(sql, params);
   })
   .then((results) => {
     if(results.rowCount === 0){
       res.render('/users/loginpage', {error: 'Something is messed up'});
     } else{
      req.user = results[0];
      delete req.user.password; // delete the password from the session
      req.session.user = results[0];
      username = results[0].username;
      io.login();
     // res.redirect('/' + user.username);
      res.redirect('/');
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

router.get('/signedup', function(req, res, next){
  var params = {
    name: "newname",
    handle: "handl1",
    password: "soso",
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
    userhandle: "handl1",
    grouphandle: "handl1",
    createdAt: new Date(),
    updatedAt: new Date()
  }
  model.sequelize.query('INSERT INTO "groupsusers" ("userhandle", "grouphandle", "createdAt", "updatedAt") VALUES ($userhandle, $grouphandle, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
  })
});

router.get('/allusers', function(req, res){
  model.sequelize.query('SELECT * FROM "Users" WHERE grouporuser = false', { type: model.sequelize.QueryTypes.SELECT})
  .then(users => {
    console.log(users);
  })
});


module.exports = router;
