import React from 'react';
import Chat from '../components/chat';
import SideBar from '../components/sidebar';

const MyComponent: React.FC = () => {
 
  return (
    <div className='home'>
      <div className="container"> 
      <SideBar/>
      <Chat/>
      </div>
    </div>
  );
}

export default MyComponent;
