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
  model.sequelize.query('SELECT *  FROM "Users" LEFt JOIN "Tasks" ON "Users"."username" = "Tasks"."Name" WHERE "Users".person = $1', { bind: params, type: model.sequelize.QueryTypes.ACTION})
  .then(users => {
    console.log(users);
  })
});

router.post('/completetask', function(req, res){

});

router.delete('/deletetask', function(req, res){
  
})


module.exports = router;
