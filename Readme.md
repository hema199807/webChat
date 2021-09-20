Steps to use this code
1)clone the repository to local mechine
2)run npm install
3)To run this code use npx nodemon server.js command.
4)On browser use https://webchatroomapplication.herokuapp.com
5)key:-4522a128m11120e21149h

if the above link is not working the do two modifications on public folder
1) public folder -> html file insted of <script defer src="https://webchatroomapplication.herokuapp.com/socket.io/socket.io.js"></script> use <script defer src="http://localhost:3000/socket.io/socket.io.js"></script>

2) public folder -> index.js file insted of this.socket=io.connect("https://webchatroomapplication.herokuapp.com",connectionOptions); use this.socket=io.connect("http://localhost:3000",connectionOptions);

 
