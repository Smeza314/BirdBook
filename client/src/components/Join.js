import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Join = () => {
  const [nameState, setNameState] = useState('')
  const [roomState, setRoomState] = useState('')



  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setNameState(event.target.value)} /></div>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoomState(event.target.value)} /></div>
        <Link onClick={event => (!nameState || !roomState) ? event.preventDefault() : null} to={`/chat?name=${nameState}&room=${roomState}`}>
          <button className="button mt-20" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Join