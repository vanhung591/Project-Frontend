import React from "react";
import styled from "styled-components";
import moment from "moment";

const Message = props => {
  const {message, timestamp, userName, userImage} = props;
  return (
    <MessageContainer>
      <img src={userImage} alt={userName}/>
      <MessageInfo>
        <h4>{userName} {" "} <span>{moment.unix(timestamp?.seconds).fromNow()}</span></h4>

        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};


export default Message;

const MessageContainer = styled.div`
  display: flex;
  padding: 16px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 8px;

  > h4 {
    color: gray;
    font-weight: 450;
    font-size: 10px;

  }
  
  > p {
    font-size: 16px;
    padding-top: 12px;
  }

`;