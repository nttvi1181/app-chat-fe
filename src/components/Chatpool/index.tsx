import React from "react";
import { Layout } from "antd";
const { Sider, Content, Header, Footer } = Layout;
type Props = {};

const Chatpool = (props: Props) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header>header</Header>
      <Content>conent</Content>
      <Footer>
        <textarea></textarea>
      </Footer>
    </Layout>
  );
};

export default Chatpool;
