import React from 'react'
import { useState } from 'react'
export default function Ai() {
    const [Message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const sendMessage = async () => {

    };
    return (
        <div className='full-width'>
            <div className="chat-container">
                <h1 className="chat-heading">Gemini chatBot</h1>
{chatLog.map((msg,i)=>(
    <p key={i}>
        <stong className="sender-name"> {msg.sender}:</stong> {""}
        <span className='message-text'> {msg.sender}</span>
    </p>

))}
            </div>





        </div>
    )
}
