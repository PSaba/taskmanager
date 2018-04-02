var io = null;
var sesh = require('./session');
var session = require('client-sessions');
var cookieParser = require('cookie-parser');
var cookietemp = require('cookie');
var Sequelize = require('sequelize');
var model = require('./models/index');

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
        var params = {
          handle: cookie.content.user.handle,
        }
        console.log(cookie.content);
        console.log("Joining sockets");
        socket.join(cookie.content.user.handle,);
        console.log(cookie.content.user.handle,);
        model.sequelize.query('SELECT * FROM "groupsusers" WHERE "groupsusers".grouphandle LIKE $handle', { bind: params, type: model.sequelize.QueryTypes.SELECT})
      .then(tasks => {
          try {
            tasks.array.forEach(element => {
            console.log(element.userhandle);
            socket.join(element.userhandle);
          });
          } catch (error) {
            console.log("Nothing here");
          }
          
        })
      })
}
, instance: function(){ 
        return io}
};
