import React from "react";
import withAuth from "../../components/common/WithAuth/WithAuth";
import useProfile from "../../hooks/useProfile";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content";
import ModalProfile from "@/container/ModalProfile";
import ModalCreateConversation from "@/container/ModalCreateConversation";
function Home() {
  const { currentUser, setCurrentUser } = useProfile();

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Content />
        <ModalProfile />
        <ModalCreateConversation/>
      </Layout>
    </>
  );
}

export default withAuth(Home);
