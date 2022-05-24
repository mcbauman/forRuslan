import { useState } from "react"
import axios from "axios"

export default function Login(props){
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    async function login(e){
        e.preventDefault()
        try {
            const res=await axios.post("http://localhost:8000/api/v1/users/login",{email,password})
            props.setUser(res.data.user)
            props.setToken(res.data.token) 
        } catch (error) {
            alert(error.response.data.error)
        }

    }
    return(
        <form onSubmit={login}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            <br />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <br />
            <button type="submit">Login</button>
        </form>
    )
}