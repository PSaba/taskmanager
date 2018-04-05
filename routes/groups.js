var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');
var io = require('../io');




router.post('/new', function(req, res){
  if(req.body.password1 === req.body.password2){
    var params = {
      handle: req.body.username.trim()
    }
    model.sequelize.query('SELECT * FROM "Users" WHERE "Users".handle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
    .then(users => {
      // if(users !== []){
      //   //res.status(200);
      //   res.render('loginpage', {err: "Handle already in use"});
      // } else {
        params = {
        name: req.body.name,
        handle: req.body.username,
        password: req.body.password1,
        category: "General",
        grouporuser: '1',
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
      //}
    
  })
  res.status(200);
  res.redirect('/groups/' + req.body.username);
} else {
  res.status(200);
  if(req.user){
    res.render('homepage' , {err: "Passwords are not matching"});
  } else {
    res.render('loginpage', {err: "Not logged in"});
  }
}
    
});

router.get('/join/:handle', function(req, res){
    if(req.user){
      var params = {
        userhandle: req.user.handle,
        password: req.body.password
      }
      model.sequelize.query('SELECT * FROM "Users" WHERE "Users".handle LIKE $userhandle AND "Users".password LIKE $password', {bind: params, type: model.sequelize.QueryTypes.SELECT})
      .then(users => {
        // if(groups === []){
          params = {
            userhandle: req.user.handle,
            grouphandle: req.params.handle
          }
          model.sequelize.query('SELECT * FROM "groupsusers" WHERE "groupsusers".userhandle LIKE $userhandle AND "groupsusers".grouphandle LIKE $grouphandle', {bind: params, type: model.sequelize.QueryTypes.SELECT})
          .then(groups => {
            // if(groups === []){
                params = {
                  userhandle: req.user.handle,
                  grouphandle: req.params.handle,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
                model.sequelize.query('INSERT INTO "groupsusers" ("userhandle", "grouphandle", "createdAt", "updatedAt") VALUES ($userhandle, $grouphandle, $createdAt, $updatedAt)', { bind: params, type: model.sequelize.QueryTypes.ACTION})
                .then(users => {
                  console.log(users);
                })
            // } else {
            //   res.status(200);
            //   res.send("already exists");
            // }
          })
        // } else {
        //   res.status(200);
        //   res.redirect('/users/loginpage')
        // }



      });

      res.status(200);
      res.redirect('/groups/' + req.params.handle);
    }
    else{
      res.status(500);
      res.redirect('/users/loginpage')
    }
    
});

router.get('/leave/:grouphandle', function(req, res){
    var params = {
        userhandle: req.user.handle,
        grouphandle: req.params.grouphandle
      }
      model.sequelize.query('DELETE FROM "groupsusers" WHERE userhandle = $userhandle AND grouphandle = $grouphandle', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
      res.status(200);
      res.redirect('/');
});

router.post('/seeall', function(req, res){
    model.sequelize.query('SELECT * FROM "Users" WHERE grouporuser = true', { type: model.sequelize.QueryTypes.SELECT})
    .then(groups => {
      console.log(groups);
    })
});

router.get('/:handle', function(req, res, next) {
  if(req.user){
    //io.login();
    var params = {
    handle: req.params.handle.trim()
    };
    console.log("handle");
    console.log(req.params.handle.trim());
    var taskssend;
    try {
      model.sequelize.query('SELECT * FROM "groupsusers" INNER JOIN "Tasks" on "groupsusers".grouphandle = "Tasks".grouphandle WHERE "Tasks".grouphandle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
      .then(tasks => {
          model.sequelize.query('SELECT * FROM "Users" WHERE "Users".handle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
          .then(users => {
            console.log("users");
            console.log(users);
            params = {
              handle: req.user.handle
            }
            model.sequelize.query('SELECT grouphandle FROM "groupsusers" WHERE groupsusers.userhandle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
            .then(groups => {
              let groupsend = [];
              groups.forEach(element => {
                if(groupsend.indexOf(element.grouphandle) == -1){
                  groupsend.push(element.grouphandle);
              }
              });
              params = {
                handle: req.params.handle
              }
              model.sequelize.query('SELECT * FROM "groupsusers" WHERE groupsusers.grouphandle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
              .then(members => {

                model.sequelize.query('SELECT * FROM "Users" WHERE "Users".grouporuser = \'1\'', { bind: params, type: model.sequelize.QueryTypes.SELECT})
                .then(allgroups => {
                  res.render('groupprofile', {members: members, allgroups: allgroups, requser: req.user, user:users, tasks: tasks, groups: groupsend});
                })
              })
            })
        })
      })
    } catch (error) {
      res.redirect('/users/prof/' + req.user.handle);
    }
    
  } else {
    res.redirect('/users/loginpage');
  }
});

module.exports = router;
