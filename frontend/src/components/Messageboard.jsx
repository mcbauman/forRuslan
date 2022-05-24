import axios from "axios"
import { useEffect, useState } from "react"

export default function Messageboard(props){
    const [messages,setMessages]=useState([])
    const [title,setTitle]=useState([])
    const [content,setContent]=useState([])
    const [counter, setCounter]=useState(0)

    useEffect(()=>{
    try {
        const headers={
            Authorization:`Bearer ${props.token}`
        }
        console.log(headers);
        axios.get("http://localhost:8000/api/v1/messages",{headers})
        .then(result=>{
            console.log(result);
            setMessages(result.data)
        })
    } catch (error) {
        alert(error.response.data.error)
    }
    },[counter])

    function create(){
        const headers={
            Authorization:`Bearer ${props.token}`
        }
        const payload={title, content}
        axios.post("http://localhost:8000/api/v1/messages",payload,{headers})
        .then(resp=>{
            setCounter(counter+1)
        })
        .catch(err=>{
            console.log(err);
            alert(err.response.data.error)
        })
    }

    function deleteMessage(message){
        const headers={
            Authorization:`Bearer ${props.token}`
        }
        console.log(message._id);
        axios.delete(`http://localhost:8000/api/v1/messages/${message._id}`,{headers})
        .then(resp=>{
            setCounter(counter+1)
        })
        .catch(err=>{
            console.log(err);
            alert(err.response.data.error)
        })
    }

    return(
        <>
        MESSAGEBOARD<br/>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} /><br/>
        <input type="text" value={content} onChange={e=>setContent(e.target.value)} /><br/>
        <button onClick={create}>Create</button>
        <hr/>
        <ul>
            {messages.map(m=><div key={m._id}>
                <b>{m.title}</b>
                <p>{m.content}</p>
                <button onClick={e=>deleteMessage(m)}>delete</button>
                </div>)}
        </ul>
        </>
    )
}