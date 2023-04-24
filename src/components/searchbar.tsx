import React, { useContext, useState } from 'react';
import { collection, doc, DocumentData, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from '../firebase'
import { AuthContext } from '../context/AuthContext';

const SearchBar: React.FC = () => {
 
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() =>{
    const q = query(collection(db, "users"), 
    where("displayName", "==",username))
    try{ 
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data())
      });
    }
    catch(err){
      setErr(true)
    }

  }

  const handleKey = async (e: any) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect =async () =>{
    //check whether the group(chats in firestore) exists, if not create a new one
   if(user!=null){ 
    console.log("this is user", user)
    const combinedId = 
    currentUser.uid > user.uid
    ? currentUser.uid + user.uid
    : user.uid + currentUser.uid
    try{
      const res = await getDoc(doc(db, "chats", combinedId));
      if(!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db, "chats" ,combinedId),{messages:[]})
        //create user chats
        await updateDoc(doc(db, "userchats", currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName: user.displayName,
            photoURL:user.photoURL,
          },
          [combinedId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db, "userchats", user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
      } 
      
    }
    catch(err){
        setErr(true)
    }
    
  }else{
    setErr(true)
  } 
  setUser(null)
  setUsername("")
  
  }



  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" 
        placeholder='Find a user'
        onKeyDown={handleKey}
        value={username}
        onChange={e=>setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found</span>}
    { user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>
           {user.displayName}
          </span>
        </div>
      </div>}
    </div>
  );
}

export default SearchBar;
