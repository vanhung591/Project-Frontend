import React from "react";
import styled from "styled-components";
import {auth, db} from "config/firebase";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {DATABASE_NAME} from "config/firestore.constant";
import {useDispatch} from "react-redux";
import {enterChannel} from "redux/channel/channel";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar} from "@mui/material";

const SidebarOption = (props) => {
  const {Icon, title, type, addChannelOption, channel, userData} = props;
  const dispatch = useDispatch();
  const [user] = useAuthState(auth)


  const onEnterChannel = () => {
    dispatch(enterChannel({channelId: channel.id}));
  };

  const onDirectMessageWithUser = () => {
    console.log('trạng thái user', )
  };

  const onClickMenuItem = () => {
    if (addChannelOption){
          return onAddChannel()
    } else
        alert(' Tính năng đang được phát triển, vui lòng quay trở lại sau');
  };

  const onAddChannel = async () => {
    const channelName = prompt("Bạn hãy nhập tên channel muốn tạo: ");

    try {
      const docRef = await addDoc(collection(db, DATABASE_NAME.CHANNELS), {
        name: channelName,
        created_by: user.email,
        created_at: serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }


  };

  const getSidebarUIByType=(uiType) => {
    switch (uiType) {
      case "channel":
        return (
          <SidebarOptionContainer onClick={onEnterChannel}>
            <h3>#{title}</h3>
          </SidebarOptionContainer>
        )

      case "user":
        return (
          <SidebarOptionContainer onClick={onDirectMessageWithUser}>
            <Avatar alt={userData.displayName} src={userData.photoURL} />
            <h3>{userData.displayName}</h3>
          </SidebarOptionContainer>
        )

      default:
        return (
          <SidebarOptionContainer onClick={onClickMenuItem}>
            {Icon && <Icon fontSize={"small"} style={{padding: 12}}/>}
            <h3>{title}</h3>
          </SidebarOptionContainer>
        )
    }
  }


  return (
    <React.Fragment>
      {getSidebarUIByType(type)}
    </React.Fragment>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 4px 12px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background: #282c34;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {

  }
`;