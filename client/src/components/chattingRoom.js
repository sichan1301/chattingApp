import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001');

const ChattingRoom = ({rooms}) => {
  const params = useParams()
  const room = useMemo(()=>rooms.find(item => String(item.id) === params.id),[params])
  const [text,setText] = useState('')
  const [receivedMessage,setReceivedMessage] = useState('')
  
  
  const sendMessage = async (e,roomNum) => {
    e.preventDefault();
    if(text!==""){
      const messageInfo = {
        roomNum:roomNum,
        text,
        name:socket.id,
        time:new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes()
      }
      await socket.emit('send_message',messageInfo)
    }
  }
  
  useEffect(()=>{
    socket.emit('join_room',room.id)
  },[socket])

  useEffect(()=>{
    socket.on('receive_message',(messageData)=>{
      setReceivedMessage(messageData.text)
    })
  },[socket])

  return(
    <ChattingRoomContainer>
      <h3>{room.roomName}</h3>
      <p>{receivedMessage}</p>
      <InputArea>
        <PlusBtn>+</PlusBtn>
        <Form onSubmit={(e)=>{sendMessage(e,room.id)}}>
          <Input onChange = {(e)=>{setText(e.target.value)}} />
          <Button>전송</Button>
        </Form>
      </InputArea>
    </ChattingRoomContainer>
  )
}

export default ChattingRoom

const ChattingRoomContainer = styled.div`
  width:400px;
  margin:0 auto;
  height:100vh;
  background-color: #9bbbd4;
  border: none;
  position:relative;
  padding:0;
`

const InputArea = styled.div`
  width:100%;
  border:none;
  min-height:50px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
`

const PlusBtn = styled.div`
  background-color: lightslategray;
  width: 50px;
  color:white;
  font-weight: bold;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`

const Form = styled.form`
  width:100%; 
  display: flex;
`

const Input = styled.input`
  width:100%;
  border:none;
  padding-left: 5px;
  :focus{
    outline:none;
  }
`

const Button = styled.button`
  min-width: 70px;
  background-color:#F7E600; 
  border:none;
`

