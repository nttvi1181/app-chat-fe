import React, { useState } from "react";
import Styles from "./style.module.scss";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { GrSend } from "react-icons/gr";
import { Input } from "antd";

function ListChatText() {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const handleSendMess = () => {};
  return (
    <div className={Styles.main}>
      <div className={Styles.inputSend}>
        <Input
          type="text"
          placeholder="Nhập đoạn tin nhắn chat"
          style={{
            border: "none",
            outline: "none",
            height: "100%",
            paddingLeft: "20px",
          }}
        />
        <BsEmojiSmile
          className={Styles.iconSmile}
          size={30}
          onClick={() => {
            setShowPicker(!showPicker);
          }}
        />
        <GrSend
          className={Styles.iconSend}
          size={30}
          onClick={handleSendMess}
        />
        <div className={Styles.showPicker}>{showPicker && <Picker />}</div>
      </div>
    </div>
  );
}

export default ListChatText;
