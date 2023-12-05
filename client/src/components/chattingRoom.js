import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom"
import styled from 'styled-components'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001');

const ChattingRoom = ({rooms}) => {
  const params = useParams()
  const room = useMemo(()=>rooms.find(item => String(item.id) === params.id),[params])
  const [text,setText] = useState('')
  const [textList,setTextList] = useState([])
  
  const checkIsUserMe = useMemo(() => {
    if(room.id === socket.id){
      return true
    }else{
      return false
    }
  },[socket,room]) 

  const sendMessage = useCallback(async(e,roomNum) => {
    e.preventDefault();
    if(text!==""){
      const messageInfo = {
        roomNum:roomNum,
        text,
        name:socket.id,
        time:new Date().getHours() + ":" + new Date().getMinutes()
      }
      await socket.emit('send_message',messageInfo)
    }
    setText('')
  },[socket,text])
  
  useEffect(()=>{
    socket.emit('join_room',room.id)
  },[])

  useEffect(()=>{
    socket.on('receive_message',(messageData)=>{
      setTextList((prev)=>[...prev,messageData])
    })
  },[socket])

  return(
    <ChattingRoomContainer>
      <h3>{room.roomName}</h3>
    
      {
        checkIsUserMe 
        ?
          <div>
            {textList.map((e,idx)=> <MyTextArea key ={String(idx)}> <MyText>{e.text}</MyText> <Time>{e.time}</Time></MyTextArea>)}
          </div>
        :
          <div>
            {textList.map((e,idx)=> <YourTextArea key ={String(idx)}> <YourText>{e.text}</YourText> <Time>{e.time}</Time> </YourTextArea>)}
          </div>
      }

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
  background-color: #9bbbd4;
  border: none;
  position:relative;
  padding:0;
  overflow:hidden;
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
  background-color: #f7e600;
  border-radius: 8px;
  padding: 8px;
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

