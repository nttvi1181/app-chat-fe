import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import useConversations from "@/hooks/useConversations";
import React from "react";
import ConversationItem from "./ConversationItem";
import Styles from "./style.module.scss";

type Props = {};

const Conversations = (props: Props) => {
  const { conversations } = useConversations();

  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <div>
        {conversations?.map((item, index) => (
          <ConversationItem key={index} item={item}/>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
