import React, { useContext } from 'react';
import InputMessage from './input';
import Messages from './messages';
import { ChatContext } from '../context/ChatContext';

const Chat: React.FC = () => {

  const {data} = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
      <span>{data.user?.displayName}</span>
      </div>
      <Messages/>
      <InputMessage/> 
    </div>
  );
}

export default Chat;
