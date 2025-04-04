// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const http = require("http"); // Node.js built-in module for creating an HTTP server
const {Server} = require("socket.io"); // Importing Server class from socket.io
const cors = require("cors");  // Middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express(); // Creating an Express application
app.use(cors()); // Enabling CORS to allow requests from different origins

// Creating an HTTP server using the Express app
const server = http.createServer(app);

// Initializing a new instance of Socket.io and attaching it to the HTTP server
const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",  // Allowing requests from this specific frontend URL
        methods: ['GET', 'POST'] // Permitting only GET and POST requests
    }
})

// Handling Socket.io connections
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`); // Logging the ID of the connected user

    // Listening for the 'sendMessage' event from a client
    socket.on('sendMessage', (msg) => {
        io.emit('receiveMessage',msg); // Broadcasting the received message to all connected clients
    });
    
    // Handling user disconnection
    socket.on('disconnect', () => {
        console.log(`User disConnected: ${socket.id}`); // Logging the ID of the disconnected user
    });

})


// Starting the server and listening on port 5000
server.listen(5000, () => console.log("Server running on port 5000"))