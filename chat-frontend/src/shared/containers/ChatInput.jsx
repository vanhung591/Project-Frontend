import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@mui/material";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {auth, db} from "config/firebase";
import {DATABASE_NAME} from "config/firestore.constant";
import {useAuthState} from "react-firebase-hooks/auth";

const ChatInput = (props) => {
  const {channel, channelId} = props;
  const [value, setValue] = useState("");
  const [user] = useAuthState(auth);

  const onSendMessage = async (e) => {
    e.preventDefault();
    if (!value) return false;

    try {
      const docRef = await addDoc(collection(db, DATABASE_NAME.CHANNELS, channelId, DATABASE_NAME.MESSAGE), {
        message: value,
        timeStamp: serverTimestamp(),
        userName: user.displayName,
        userImage: user.photoURL,
        email: user.email
      });

      setValue("");
      console.log('onSendMessage ID: ', docRef.id)
    } catch (e) {
      console.error("Error ", e);
    }

    console.log("Message");
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={"Message #" + channel?.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"/>
        <Button type={"submit"} onClick={onSendMessage}>Send</Button>
      </form>
    </ChatInputContainer>
  );
};


export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 16px;

  > form {
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 32px;
    width: calc(100% - 260px);

  }

  > form input {
    border: 1px solid gray;
    border-radius: 4px;
    padding: 12px;
    width: 60%;
  }

  > form > button {

  }
`;