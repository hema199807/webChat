
var connectionOptions={
    "force new connection":true,
    "reconnectionAttempts":"Infinity",
    "timeout":10000,
    "transports":["websocket"]
}

this.socket=io.connect("http://localhost:3000",connectionOptions);

var landingDiv=document.getElementById("landingdiv");
var chatDiv=document.getElementById("chatdiv")
var username=document.getElementById("username");


username.addEventListener('click',()=>{
    if (window.localStorage) {
  
        // If there is no item as 'reload'
        // in localstorage then create one &
        // reload the page
        if (!localStorage.getItem('reload')) {
            localStorage['reload'] = true;
            window.location.reload();
        } else {

            // If there exists a 'reload' item
            // then clear the 'reload' item in
            // local storage
            localStorage.removeItem('reload');
        }
    }
})
var userkey=document.getElementById("key");
var usersDiv=document.getElementById("chat-div-users");
var messageContainer=document.getElementById("messages");
var send=document.getElementById("send-btn");
var messageInput=document.getElementById("message");
var leave=document.getElementById("leave-btn");
var subBtn=document.getElementById("btn-sub");

function appendUsers(usersArr){
    console.log(usersArr);
    var count=0;
    var disUser=document.getElementsByClassName("disuserlist");
    console.log(disUser);
    if(disUser.length !=0){
        console.log("inside");
        for(var i=0;i<disUser.length;i++){
            if(disUser[i].innerText===usersArr){
                disUser[i].className="userlist";
                count++;
            }
        }
    }if(count===0){
    
    let userlist=document.createElement('li');
    userlist.className="userlist";
    let userlistSpan=document.createElement('span')
    userlistSpan.innerHTML=usersArr;
    userlistSpan.style.color="aliceblue";
    userlistSpan.style.fontSize="18px"
    userlist.appendChild(userlistSpan)
    usersDiv.appendChild(userlist);
    usersDiv.scrollTop=usersDiv.scrollHeight;
    }
}

function appendmessages(message,name){
    let containerDiv=document.createElement("div");
    containerDiv.className="message-container";
    let senderName=document.createElement("h4");
    senderName.innerHTML=name;
    containerDiv.appendChild(senderName);
    let sendedMessage=document.createElement("p");
    sendedMessage.innerHTML=message;
    containerDiv.appendChild(sendedMessage);
    let time=document.createElement("h6");
    var date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    time.innerHTML = hours + ":" + minutes + " " + am_pm;
    containerDiv.appendChild(time);
    messageContainer.appendChild(containerDiv);
    messageContainer.appendChild(document.createElement("br"));
    messageContainer.scrollTop = messageContainer.scrollHeight;
    
}
subBtn.addEventListener("click",function(){
    if(username.value==="" || userkey.value==="" ){
        return alert("all fields required");
    }else{
        var seacretKey="4522a128m11120e21149h";
        if(seacretKey !== userkey.value ){
            alert("Invalid key");
        }else{
        const getuser= username.value;
        socket.on('usersArr',getuserslist=>{
            for(var i=0;i<Object.values(getuserslist).length;i++){
                appendUsers(Object.values(getuserslist)[i]);
            }
        })
        appendmessages("You joined to group","ChatRoom");
        socket.emit("new-user",getuser);
        username.value="";
        userkey.value="";
        landingDiv.style.display="none";
        chatDiv.style.display="block";
        }
    }
 
})


socket.on('user-connected',function(users){
    console.log(users)
    appendUsers(users);
    appendmessages(`${users} joined to group`,"ChatRoom");
    
})

send.addEventListener("click",function(e){
    e.preventDefault();
    if(messageInput.value===""){
        return alert("can't send empty message");
    }else{
        const getmessage=messageInput.value;
        appendmessages(getmessage,"you");
        socket.emit("send-message",getmessage);
        messageInput.value="";
        messageInput.focus();
        
    }
   
})
socket.on('chat-message',function(data){
    console.log(data);
    appendmessages(data.message,data.name);
})

leave.addEventListener("click",()=>{
    const leaveRoom=confirm('Are you sure you want to leave the chatroom?');
    if(leaveRoom){
        landingDiv.style.display="block";
        chatDiv.style.display="none";
        socket.emit("user-disconnet");
    }else{

    }
})
socket.on("user-disconnected",function(name){
    console.log("disc", typeof name);
    var disconnectedUser=document.getElementsByClassName("userlist");
    for(var i=0;i<disconnectedUser.length;i++){
        if(disconnectedUser[i].innerText===name){
            disconnectedUser[i].className="disuserlist";
        }
    }
        appendmessages(`${name} Left`,"chatRoom");
})


