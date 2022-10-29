import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import React from "react";
import ConversationItem from "./ConversationItem";
import Styles from "./style.module.scss";

type Props = {};

const Conversations = (props: Props) => {
  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <ConversationItem />
    </div>
  );
};

export default Conversations;
