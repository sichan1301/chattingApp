import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001');

const ChattingRoom = ({rooms, setLatestMessage}) => {
  const params = useParams()
  const room = useMemo(()=>rooms.find(item => String(item.id) === params.id),[params])
  const [text,setText] = useState('')
  const [textList,setTextList] = useState([])

  const sendMessage = useCallback(async(e,roomNum) => {
    e.preventDefault();
    if(text!==""){
      const messageInfo = {
        roomNum:roomNum,
        isMyText : false,
        text,
        name:socket.id,
        time:new Date().getHours() + ":" + new Date().getMinutes()
      }
      await socket.emit('send_message',messageInfo)
    }
    setText('')
  },[socket,text])

  const receiveMessage = useCallback(() => {
    socket.on('receive_message',(messageData)=>{
      messageData.name === socket.id ? messageData.isMyText = true : messageData.isMyText = false
      setTextList((prev)=>[...prev,messageData])
      setLatestMessage(messageData)  
    })
  },[socket])
  
  useEffect(()=>{
    socket.emit('join_room',room.id)
  },[])
  
  useEffect(()=>{
    receiveMessage()
  },[socket])

  return(
    <ChattingRoomContainer>
      <h3>{room.roomName}</h3>
    
      <div>
        {textList.map((e,idx)=> e.isMyText ? 
            <MyTextArea key ={String(idx)}> <MyText>{e.text}</MyText> <Time>{e.time}</Time></MyTextArea> : 
            <YourTextArea key ={String(idx)}> <YourText>{e.text}</YourText> <Time>{e.time}</Time> </YourTextArea>)}
      </div>



      <InputArea>
        <PlusBtn>+</PlusBtn>
        <Form onSubmit={(e)=>{sendMessage(e,room.id)}}>
          <Input onChange = {(e)=>{setText(e.target.value)}} value = {text} />
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
  background-color: rgb(205,255,200);
  border: none;
  position:relative;
  padding:0;
`

const MyTextArea = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
  margin-right: 15px;
`

const YourTextArea = styled(MyTextArea)`
  justify-content: flex-start;
  margin-left: 15px;
`

const MyText = styled.p`
  /* background-color: #f7e600; */
  background-color: #f7e600;
  border-radius: 8px;
  padding: 10px;
  max-width: 200px;
  font-size: 12px;
  margin-bottom:5px;
  font-weight: 500;
`

const YourText = styled(MyText)`
  background-color: white;
`

const Time = styled.span`
  font-size:11px;
  margin-left:6px;
  margin-bottom:5px;
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

