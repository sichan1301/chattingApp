import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'

const RoomListPage = ({rooms}) => {
  const navigate = useNavigate()

  return(
    <Container>
      {rooms.map(item=>
        <Room onClick ={()=>navigate(`/room/${item.id}`)} key={String(item.id)}>
          <h2>{item.roomName}</h2>
          <p>{item.members}</p>
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

`