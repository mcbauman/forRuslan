import {useEffect, useState} from "react"
import './App.css';
import Login from "./components/Login.jsx"
import Messageboard from "./components/Messageboard.jsx"

const userFromLS=localStorage.getItem("user")
const userDefault=userFromLS?JSON.parse(userFromLS):null

const tokenFromLS=localStorage.getItem("token")
const tokenDefault=tokenFromLS?tokenFromLS:null

function App() {
  const [user,setUser]=useState(userDefault)
  const [token,setToken]=useState(tokenDefault)

  useEffect(()=>{
    if(user){
      localStorage.setItem("user",JSON.stringify(user))
    }else{
      localStorage.removeItem("user")
    }
  },[user])

  useEffect(()=>{
    if(token){
      localStorage.setItem("token",(token))
    }else{
      localStorage.removeItem("token")
    }
  },[token])

  return (
    <div className="App">
      {user&&(
        <header>
          Hi user {user.email}
          <br />
          <img src={user.avatar} style={{width:100}} alt="none"/>
        </header>
      )}
      {user?
      <Messageboard user={user} token={token}/>
      :<Login setUser={setUser} setToken={setToken}/>}
    </div>
  );
}

export default App;
