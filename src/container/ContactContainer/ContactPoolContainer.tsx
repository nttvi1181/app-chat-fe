import Chatpool from "@/components/Chatpool";
import styled from "styled-components";
import ListRequestAddFriend from "./ListRequestAddFriend";
import CardUser from "@/components/cardUser/CardUser";
import { RelationServives } from "@/services/relation.service";
import useRelations from "@/hooks/useContact";
// import { setRelations } from "@/redux/slices/relationSlice";
import ContactHeaderLayout from "@/components/contactHeaderLayout/ContactHeaderLayout";
import React, { useEffect } from "react";

type Props = {
  data?: any[];
};

const ChatPoolContainer: React.FC<Props> = ({ data }) => {
  const { relations, setRelations } = useRelations();

  const handleGetListRelation = async () => {
    await RelationServives.getAllRequestReceived().then(({ data }) => {
      setRelations(data);
    });
  };
  useEffect(() => {
    handleGetListRelation();
  }, []);
  return (
    <div style={{ overflow: "hidden", height: "100vh" }}>
      <ContactHeaderLayout />
      <MainLayout>
        <TextRequestFriend>Lời mời kết bạn(1)</TextRequestFriend>
        <ListRequestAddFriend />
        <TextRequestFriend>Gợi ý kết bạn(99)</TextRequestFriend>
        <ListCard>
          {data?.map(({ _id, avatar_url, username }) => (
            <CardUser
              key={_id}
              _id={_id}
              username={username}
              avatar={avatar_url}
            />
          ))}
        </ListCard>
      </MainLayout>
    </div>
  );
};

const TextRequestFriend = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const MainLayout = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px 10%;
  overflow: scroll;
`;

const ListCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 25px;
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default ChatPoolContainer;
