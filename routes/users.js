var express = require('express');
var router = express.Router();
const {Client} = require('pg').Client;
/* GET users listing. */


// app.get('/book/add', function(req, res){
//   const client = new Client();
//   client.connect().then( () => {
//     console.log('connection complete');

//     const sql = 'INSERT INTO books (title, authors) VALUES ($1, $2)';
//     const params = [req.body.title, req.body.authors];
//     client.query(sql, params);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });

// app.get('/books', function(req, res){

//   const client = new Client();
//   client.connect()
//   .then(() => {
//     return client.query('SELECT * FROM books;');
//   })
//   .then((results) => {
//     console.log('results?', results);
//     res.render('book-list');
//   })
//   .catch((err) =>{
//     console.log('error', err);
//     res.send('Something bad happened');
//   });
// });

// app.post('/book/delete/:id', function(req, res){
//   console.log('deleting id', req.params.id);

//   const client = new Client();
//   client.connect()
//   .then(() => {
//     const sql = 'DELETE FROM books WHERE book_id = $1;'
//     const params = [req.params.id];
//     return client.query(sql, params);
//   })
//   .then((results) => {
//     console.log('delete results', results);
//     res.redirect('/books');
//   })
//   .catch((err) =>{
//     console.log('error', err);
//     res.send('Something bad happened');
//   });
// });

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

router.post('/signedup', function(req, res, next){

});


module.exports = router;
