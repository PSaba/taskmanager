var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var model = require('../models/index');




router.post('/new', function(req, res){
  if(req.body.password1 === req.body.password2){
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
  }
    res.send("Passwords don't match");
});

router.get('/join/:handle', function(req, res){
    if(req.user){
      var params = {
        userhandle: req.user.handle,
        grouphandle: req.params.handle
      }
      model.sequelize.query('SELECT * FROM "groupsusers" WHERE "groupsusers".userhandle LIKE $userhandle AND "groupsusers".grouphandle LIKE $grouphandle', {bind: params, type: model.sequelize.QueryTypes.SELECT})
      .then(groups => {
        if(groups[0] == undefined){
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
        } else {
          res.send("already exists");
        }
      })
    }
    else{
      res.redirect('/users/loginpage')
    }
    
});

router.get('/leave/:grouphandle/:personhandle', function(req, res){
    var params = {
        userhandle: req.params.personhandle,
        grouphandle: req.params.grouphandle
      }
      model.sequelize.query('DELETE FROM "groupusers" WHERE userhandle = $userhandle AND grouphandle = $grouphandle', { bind: params, type: model.sequelize.QueryTypes.ACTION})
      .then(users => {
        console.log(users);
      })
      res.end();
});

router.post('/seeall', function(req, res){
    model.sequelize.query('SELECT * FROM "Users" WHERE grouporuser = true', { type: model.sequelize.QueryTypes.SELECT})
    .then(groups => {
      console.log(groups);
    })
});

router.get('/:handle', function(req, res, next) {
  if(req.user){
    var params = {
    handle: req.params.handle
    };
    var taskssend;
    try {
      model.sequelize.query('SELECT * FROM "groupsusers" FULL OUTER JOIN "Tasks" on "groupsusers".grouphandle = "Tasks".grouphandle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
      .then(tasks => {
        taskssend = tasks;
    //    res.render('test', {user:users[0]});
          model.sequelize.query('SELECT * FROM "Users" WHERE "Users".handle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
          .then(users => {
            params = {
              handle: req.user.handle
            }
            model.sequelize.query('SELECT * FROM "groupsusers" INNER JOIN "Users" on "groupsusers".userhandle = "Users".handle WHERE groupsusers.userhandle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
            .then(groups => {
              params = {
                handle: req.params.handle
              }
              model.sequelize.query('SELECT * FROM "groupsusers" INNER JOIN "Users" on "groupsusers".userhandle = "Users".handle WHERE groupsusers.grouphandle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
              .then(members => {

                model.sequelize.query('SELECT * FROM "Users" WHERE "Users".grouporuser = \'1\'', { bind: params, type: model.sequelize.QueryTypes.SELECT})
                .then(allgroups => {
                  res.render('groupprofile', {members: members, allgroups: allgroups, requser: req.user, user:users, tasks: tasks, groups: groups});
                })
              })
            })
          })
      })
    } catch (error) {
      res.redirect('/users/loginpage');
    }
    
  } else {
    res.redirect('/users/loginpage');
  }
});

module.exports = router;
