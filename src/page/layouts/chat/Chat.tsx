import React from "react";
import ListChatUser from "@/components/listChatUser/ListChatUser";
import styled from "styled-components";
import ListChatText from "@/components/listChatText/ListChatText";

function Chat() {
  return (
    <Container>
      <ListChatUser />
      <ListChatText />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export default Chat;
