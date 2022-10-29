import React from "react";
import Styles from "./style.module.scss";
import Avatar from "../../assets/images/dejong.jpg";

type Props = {};

const ConversationItem = (props: Props) => {
  return (
    <div className={Styles.listItem}>
      <div className={Styles.img}>
        <img src={Avatar} alt="" />
      </div>
      <div>
        <div className={Styles.nameChat}>Thoại Nguyễn</div>
        <div className={Styles.textChat}>Bạn:server đang lỗi kìa ông</div>
      </div>
    </div>
  );
};
export default ConversationItem;
