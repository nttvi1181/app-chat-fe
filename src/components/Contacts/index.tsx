import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import React from "react";
import Styles from "./style.module.scss";
import Avatar from "../../assets/images/dejong.jpg";
import ContactItem from "./ContactItem";

type Props = {};

const Contacts = (props: Props) => {
  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <ContactItem />
    </div>
  );
};

export default Contacts;