var io = null;
var sesh = require('./session');
var session = require('client-sessions');
var cookieParser = require('cookie-parser');
var cookietemp = require('cookie');
const {Client} = require('pg').Client;

module.exports = {init: function(server){
        io = require('socket.io')(server);
}, 
login: function(){
    io.on('connection', function(socket){
        console.log('user connected');
        var cookie = socket.request.headers.cookie;
        cookie = cookietemp.parse(cookie);
        var opts = sesh;
        cookie = session.util.decode(opts, cookie.session);
        // userModel.findOne({ 
        //     handle: cookie.content.user.handle}, 
        //     function(err, user){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             user.following.forEach(element => {
        //                 console.log(element.handle);
        //                 socket.join(element.handle);
        //             });
        //         }
        //     });
        const client = new Client();
        client.connect()
        .then(() => {
          const sql = 'SELECT FROM users WHERE username = $1;'
          const params = [cookie.content.user.username];
          return client.query(sql, params);
        })
        .then((results) => {
          if(results.rowCount === 0){
            res.render('/users/loginpage', {error: 'Something is messed up'});
          } else{
            results[0].groups.array.forEach(element => {
                console.log(element.title);
                socket.join(element.title);
            });
          }
     
        })
        .catch((err) =>{
          console.log('error', err);
          res.send('Something bad happened');
        });
        });
}
, instance: function(){ 
        return io}
};
