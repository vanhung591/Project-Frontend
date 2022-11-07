import React, {useEffect, useState} from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "config/firebase";
import AddIcon from "@mui/icons-material/Add";
import SidebarOption from "shared/containers/SidebarOption";
import MessageIcon from "@mui/icons-material/Message";
import {collection, query, onSnapshot, where} from "firebase/firestore";
import {DATABASE_NAME} from "config/firestore.constant";
import ProfileUpdateDialog from "shared/components/ProfileUpdateDialog";
import {InsertComment,Inbox,Drafts,BookmarkBorder,PeopleAlt,Apps,FileCopy,ExpandLess } from "@mui/icons-material"

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null)
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);

  const getUserDetail = () => {
    const userNew = auth.currentUser;
    setUserData({...userNew})
  }

  useEffect(() => {
    setUserData(user)
  }, [user])

  useEffect(() => {
    const q = query(collection(db, DATABASE_NAME.CHANNELS));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = [];
      snapshot.docs.forEach(doc => {
        arr.push({
          id: doc.id,
          name: doc.data().name
        });
      });

      setChannels(arr);

    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, DATABASE_NAME.USERS), where("active", "==", true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = [];
      snapshot.forEach(doc => {
        arr.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setUsers(arr);

    });

    return () => unsubscribe();
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Trung Tam Viet Uc Frontend</h2>
          <h3 key={userData?.displayName}>
            <FiberManualRecordIcon color={"success"}/>
            {userData?.displayName}
            <ProfileUpdateDialog getUserDetail={getUserDetail} />
          </h3>
          
        </SidebarInfo>

      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorder} title="Chanel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Showless" />

      <hr/>

      <SidebarOption Icon={MessageIcon} title={"Channels"}/>

      {channels.map(channel => {
        return (
          <SidebarOption channel={channel} key={channel.id} Icon={MessageIcon} title={channel.name} type={"channel"}/>
        );
      })}

      <SidebarOption Icon={AddIcon} title={"Add Channel"} addChannelOption/>


      <hr/>
      <SidebarOption Icon={MessageIcon} title={"Direct Message"}/>
      {users.map(userActive => {
        return (
          <SidebarOption userData={userActive} key={userActive.uid}  type={"user"}/>
        );
      })}



    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  overflow-y: scroll;
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #492749;
  padding-bottom: 10px;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;