import React from "react";
import styled from "styled-components";
import ListContactUser from "@/components/listContactUser/ListContactUser";

function Contact() {
  return (
    <Container>
      <ListContactUser />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export default Contact;
