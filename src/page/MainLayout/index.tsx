import React from "react";
import withAuth from "../../components/common/WithAuth/WithAuth";
import useProfile from "../../hooks/useProfile";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content";
function Home() {
  const { currentUser, setCurrentUser } = useProfile();

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Content />
      </Layout>
    </>
  );
}

export default withAuth(Home);
