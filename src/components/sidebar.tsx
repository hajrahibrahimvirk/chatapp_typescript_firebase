import React from 'react';
import Chats from './chats';
import Navbar from './navbar';
import SearchBar from './searchbar';

const SideBar: React.FC = () => {
 
  return (
    <div className='sidebar'>
     <Navbar/>
     <SearchBar/>
     <Chats/>
    </div>
  );
}

export default SideBar;
