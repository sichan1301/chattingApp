import express from 'express'
import { createServer } from 'node:http';
import cors from 'cors';
import {Server} from 'socket.io';

const app = express();
app.use(cors());
const server = createServer(app)

const io = new Server(server,{
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
})


io.on("connection",(socket)=>{
  // console.log(`User Connected ${socket.id}`)

  socket.on('join_room',(roomNumber)=>{
    socket.join(roomNumber);
    // console.log(`User with ID ${socket.id} joined room: ${roomNumber}`)
  })


  socket.on('send_message',(messageData)=>{
    // console.log(`sendMessage 실행 with ${JSON.stringify(messageData,null,"  ")}`)
    io.to(messageData.roomNum).emit('receive_message',messageData)
  })

  socket.on("disconnect",()=>
    console.log("User Disconnected",socket.id)
  )

})

server.listen(3001,()=>{
  console.log('server is running')
})