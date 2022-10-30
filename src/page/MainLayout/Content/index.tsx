import React from "react";
import { Layout } from "antd";
import ChatContainer from "@/container/ChatContainer";
import useUi from "@/hooks/useUi";
import ContactsContainer from "@/container/ContactContainer";
const { Content } = Layout;
type Props = {};

const Index = (props: Props) => {
  const { currentPage } = useUi();
  console.log("main layout");
  const renderContent = () => {
    switch (currentPage) {
      case "CHAT":
        return <ChatContainer />;
      case "CONTACT":
        return <ContactsContainer />;
      default:
        return <ChatContainer />;
    }
  };

  return <Content>{renderContent()}</Content>;
};

export default Index;
