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

router.post('/join', function(req, res){

});

router.post('/leave', function(req, res){

});

router.delete('/addcategory', function(req, res){
  
});

router.post('/removecategory', function(req, res){

});

router.post('/seeall', function(req, res){

});


module.exports = router;
