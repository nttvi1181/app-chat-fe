import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import ContactsContainer from "./ListContactsContainer";
import ContactPoolContainer from "./ContactPoolContainer";
import { RelationServives } from "@/services/relation.service";
import { Profile } from "@/interfaces/user";
import { ContactService } from "@/services/contact.service";
const { Sider, Content, Header, Footer } = Layout;
type Props = {};

const ContactContainer = (props: Props) => {
  const [listUser, setListUser] = useState<Array<Profile>>([]);
  const [listReceived, setListReceived] = useState<any>([]);
  const [listFriend, setListFriend] = useState<any>([]);
  const [listSuggest, setListSuggest] = useState<any>([]);
  const getListSending = async () => {
    try {
      const { data } = await RelationServives.getAllSuggest();
      setListSuggest(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getListReceived = async () => {
    try {
      const { data } = await RelationServives.getAllRequestReceived();
      setListReceived(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCallApi = async () => {
    try {
      const { data } = await ContactService.getAllUserOfSymtem();
      setListUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getListFriend = async () => {
    try {
      const { data } = await RelationServives.getAllRelation();

      setListFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListFriend();
    getListSending();
    handleCallApi();
    getListReceived();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={350} style={{ backgroundColor: "#fff" }}>
        <ContactsContainer data={listFriend} />
      </Sider>
      <Content>
        <ContactPoolContainer data={listSuggest} />
      </Content>
    </Layout>
  );
};

export default React.memo(ContactContainer);
