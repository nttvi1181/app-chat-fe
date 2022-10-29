import React from "react";
import { Layout } from "antd";
import ContactsContainer from "./ContactsdContainer";
import ContactPoolContainer from "./ContactPoolContainer";
const { Sider, Content, Header, Footer } = Layout;
type Props = {};

const ContactContainer = (props: Props) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={300} style={{ backgroundColor: "#fff" }}>
        <ContactsContainer />
      </Sider>
      <Content>
        <ContactPoolContainer />
      </Content>
    </Layout>
  );
};

export default ContactContainer;
