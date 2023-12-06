import './App.css';

import RoomListPage from './components/roomListPage';
import ChattingRoom from './components/chattingRoom';
import { Routes, Route} from 'react-router-dom'
import { useState,useEffect } from 'react';

export const roomList = [
  {
    id:1,
    roomName:'1번 채팅방',
    members:[],
    text:[]
  },
  {
    id:2,
    roomName:'2번 채팅방',
    members:[],
    text:[]
  },
  {
    id:3,
    roomName:'3번 채팅방',
    members:[],
    text:[]
  } 
]

function App() {

  const [latestMessage,setLatestMessage] = useState({})

  return (
    <Routes>
      <Route exact path="/room" element={<RoomListPage rooms={roomList} latestMessage={latestMessage}/>} />
      <Route exact path="/room/:id" element={<ChattingRoom rooms = {roomList} setLatestMessage={setLatestMessage} />} />
    </Routes>
  );
}

export default App;
