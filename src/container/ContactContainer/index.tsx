import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import ContactsContainer from "./ListContactsContainer";
import ContactPoolContainer from "./ContactPoolContainer";
import { Profile } from "@/interfaces/user";
import { ContactService } from "@/services/contact.service";
const { Sider, Content, Header, Footer } = Layout;
type Props = {};

const ContactContainer = (props: Props) => {
  const [listUser, setListUser] = useState<Array<Profile>>([]);

  const handleCallApi = async () => {
    try {
      const { data } = await ContactService.getAllUserOfSymtem();
      setListUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCallApi();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={350} style={{ backgroundColor: "#fff" }}>
        <ContactsContainer data={listUser} />
      </Sider>
      <Content>
        <ContactPoolContainer />
      </Content>
    </Layout>
  );
};

export default React.memo(ContactContainer);
