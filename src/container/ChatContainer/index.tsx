import { Layout } from "antd";
const { Sider, Content, Header, Footer } = Layout;
import React from "react";
import ChatPoolContainer from "./ChatPoolContainer";
import ConersationsContainer from "./ConersationsContainer";

type Props = {};

const ChatContainer = (props: Props) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={300} style={{ backgroundColor: "#fff" }}>
        <ConersationsContainer />
      </Sider>
      <Content>
        <ChatPoolContainer />
      </Content>
    </Layout>
  );
};

export default ChatContainer;
