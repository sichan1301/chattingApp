import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const RoomListPage = ({rooms,latestMessage}) => {
  const navigate = useNavigate()

  return(
    <Container>
      {rooms.map(item=>
        <Room onClick ={()=>navigate(`/room/${item.id}`)} key={String(item.id)}>
          <RoomName>{item.roomName}</RoomName>
          {
            item.id === latestMessage.roomNum &&
            <LastArea>
              <LatestText>{latestMessage.text}</LatestText>
              <LatestTextTime>{latestMessage.time}</LatestTextTime>
            </LastArea>
          }
        </Room>
      )}
    </Container>
  )
}


export default RoomListPage

export const Container = styled.div`
  width:400px;
  height:100vh;
  margin:0 auto;
  border:0.5px solid black;
`

const Room =styled.div`
  padding:10px;
`

const RoomName =styled.p`
  font-weight: 900;
  font-size: 30px;
  margin:0;
`


const LastArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:10px;
`
const LatestText =styled.p`
  font-size: 25px;
`

const LatestTextTime =styled.p`
  font-size: 15px;
`