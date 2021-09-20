const express=require("express");
const { disconnect } = require("process");
const app=express();
let port=process.env.PORT || 3000
var server=require("http").createServer(app);
const io=require("socket.io")(server);


app.use(express.static("public"));
var users={};
io.on('connection',socket=>{
    socket.on('new-user',user=>{
        users[socket.id]= user;
        socket.emit('usersArr',users);
        socket.broadcast.emit('user-connected',user);
    })
    socket.on('send-message',message=>{
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]});
    })
    socket.on('user-disconnet',()=>{
        socket.disconnect();
        if(typeof users[socket.id] !== "undefined" ){
            socket.broadcast.emit("user-disconnected",users[socket.id])
            delete users[socket.id]
           
        }  
    })
    socket.on('disconnect', ()=>{
       if(typeof users[socket.id] !== "undefined" ){
            socket.broadcast.emit("user-disconnected",users[socket.id])
            delete users[socket.id]
        }  
    })
})
server.listen(port,()=> console.log("server running"))



