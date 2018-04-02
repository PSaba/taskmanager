var chai = require('chai'), chaiHttp = require('chai-http');
var expect = chai.expect;
var app = require('../app');
// var app = 'http://localhost:3000';

chai.use(chaiHttp);
var agent = chai.request.agent(app);

var socketUrl = 'http://localhost:3000';

var options = {  
  transports: ['websocket'],
  'force new connection': true
};
// var io = require('socket.io-client');
var SocketTester = require('socket-tester');

//var port = normalizePort(process.env.PORT || '3000');
//app.set('port', '3000');

var socket = require('socket.io-client')('http://localhost');

var io = require('../io').init(socket);

var socketTester = new SocketTester(socket, socketUrl, options);

// chai.request(app)
//   .post('/user/signedup')
//   .type('form')
//   .send({
//     'name': 'newname',
//     'username': 'newname',
//     'password1': 'soso',
//     'password2': 'soso'
//   })
//   .then(function (res) {
//      expect(res).to.have.status(200);
//   })
//   .catch(function (err) {
//      throw err;
//   });

describe("Test", function() {
    it('Simple test', function(done) {
        // var agent = chai.request.agent(app);
        agent
            .get('/trytest')
            .end(function(err, res) {
                console.log(err);
                chai.expect(res).to.have.status(200);
            });
            done();
    });
});

describe("Account usable", function() {
    it('new account good', function(done) {
        chai.request(app)
        .post('/users/signedup')
          .type('form')
          .send({
            'name': 'newname',
            'username': 'newname',
            'password1': 'soso',
            'password2': 'soso'
          })
            .end(function(err, res) {
                chai.expect(res).to.have.status(200);
                done();
            });
    });
    it('new account bad', function(done){
        chai.request(app)
        .post('/users/signedup')
          .type('form')
          .send({
            'name': 'newso',
            'username': 'hi',
            'password1': 'solo1',
            'password2': 'solo2'
          })
            .end(function(err, res) {
                chai.expect(res).to.have.status(500);
                done();
            });
    });
    it('log in possible', function(){
        agent
        .post('/users/loggedin')
          .type('form')
          .send({
            'username': 'newname',
            'password': 'soso',
          })
            .end(function(err, res) {
                expect(res).to.have.status(200);
            });
    });
});

describe("Tasks personal", function() {
    it('new task', function() {
            agent
            .post('/new/newname')
            .send({'message': 'new task that does something',
                 'category': 'General',
                 'duetime': Date.now()})
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });
    
    it('complete task', function() {
        chai.request(app)
        .get('/users/tasks/complete/1')
            .end(function(err, res) {
                chai.expect(res).to.have.status(200);
            });
    });
});

describe("Categories", function(){
    it('new category', function(){
            agent
            .post('/session')
            .send({'message': 'new task that does something',
                 'category': 'General',
                 'duetime': Date.now()})
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });
    it('new task', function() {
        agent
        .post('/session')
        .send({'message': 'new task that does something',
             'category': 'General',
             'duetime': Date.now()})
        .then(function (res) {
            expect(res).to.have.status(200);
        });
    });
})



// agent.close();