import React,{useState,useEffect} from 'react'
import ChatHeader from './ChatHeader'
import Message from './Message'

import './Chat.css'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import { useSelector} from 'react-redux'
import firebase from "firebase"
import {selectChannelId,selectChannelName} from './features/appSlice'
import {selectUser} from './features/userSlice'
import { MessageSharp, SystemUpdate } from '@material-ui/icons'
import db from './firebase'





function Chat() {
    const user=useSelector(selectUser)
    const channelId=useSelector(selectChannelId)
    const channelName=useSelector(selectChannelName)

    const [input, setInput] = useState("")

    const [messages, setMessages] = useState([])


    useEffect(() => {
        if(channelId){
            db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
               setMessages(snapshot.docs.map((doc)=>doc.data()))
            )
        }
        
    }, [channelId])

    const sendMessages=(e)=>{
            e.preventDefault()
            db.collection('channels').doc(channelId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user
        })
        
        console.log(input)
        setInput('')
        console.log(input)
    }


    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>

            <div className="chat_messages">
              {messages.map((messages)=>(
                  <Message 
                      timestamp={messages.timestamp}
                      message={messages.message}
                      user={messages.user}
                  />
              ))}
            </div>

            <div className="chat_input">
              <AddCircleIcon fontSize="large"/>
              <form>
                  <input input={input} disabled={!channelId} onChange={(e)=>setInput(e.target.value)} placeholder={`Message #${channelName}`}/>
                  <button type='submit' className="chat_inputButton" onClick={sendMessages}>Send Message</button>
              </form>

              <div className="chat_inputIcon">
                <CardGiftcardIcon fontSize="large"/>
                <GifIcon fontSize="large"/>
                <EmojiEmotionsIcon fontSize="large"/>
              </div>
            </div>
        </div>
    )
}

export default Chat
