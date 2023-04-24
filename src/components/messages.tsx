import React, { useContext, useEffect, useState } from 'react';
import Message from './message';
import { ChatContext } from '../context/ChatContext';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages: React.FC = () => {

  const [messages, setMessages] = useState<DocumentData | []>([])
  const {data} = useContext(ChatContext)

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{
      unSub()
    }
  },[data.chatId])
 
  return (
    <div className='messages'>
      {messages.map((m: any)=>(
        <Message message={m} key={m.id}/>
      ))}
  
    </div>
  );
}

export default Messages;
