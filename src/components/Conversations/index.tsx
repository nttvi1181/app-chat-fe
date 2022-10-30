import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import React from "react";
import ConversationItem from "./ConversationItem";
import Styles from "./style.module.scss";

type Props = {};

const Conversations = (props: Props) => {
  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <div>
        <ConversationItem key="1" id={"1"} seens={6}/>
        <ConversationItem key="2" id={"2"} seens={4} />
      </div>
    </div>
  );
};

export default Conversations;
