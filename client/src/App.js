import './App.css';

import RoomListPage from './components/roomListPage';
import ChattingRoom from './components/chattingRoom';
import { Routes, Route} from 'react-router-dom'
import { useState } from 'react';

export const roomList = [
  {
    id:1,
    roomName:'1번 톡방',
    members:[],
    text:[]
  },
  {
    id:2,
    roomName:'2번 톡방',
    members:[],
    text:[]
  },
  {
    id:3,
    roomName:'3번 톡방',
    members:[],
    text:[]
  }
]

function App() {

  return (
    <Routes>
      <Route exact path="/room" element={<RoomListPage rooms={roomList} />} />
      <Route exact path="/room/:id" element={<ChattingRoom rooms = {roomList} />} />
    </Routes>
  );
}

export default App;
