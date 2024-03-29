import React, { useContext, useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats: React.FC = () => {

  const [chats, setChats] = useState<DocumentData | []>([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        }else{
          console.log("something went wrong")
        }
      });
      return() =>{
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log(Object.entries(chats))

    return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(

        <div className="userChat" key={chat[0]} onClick={()=> handleSelect(chat[1].userInfo)} >
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>
            {chat[1].userInfo.displayName}
          </span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
      </div>
  );
}

export default Chats;
