import React, { useState } from "react";
import { Col, Input, Row } from "antd";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend, IoMdAddCircle } from "react-icons/io";
import useChatDetail from "@/hooks/useChatDetail";
import { SocketService } from "@/services/socket-io";
import useProfile from "@/hooks/useProfile";
const { TextArea } = Input;
type Props = {};

const InputChat = (props: Props) => {
  //   const { setListMessages } = useChatDetail();
  const { sendNewMessage } = SocketService();
  const { conversation_info } = useChatDetail();
  const { currentUser } = useProfile();

  const [valueInputText, setValueText] = useState("");
  const handleSendMessage = () => {
    sendNewMessage({
      message_id: new Date().getTime().toString(),
      content: valueInputText,
      conversation_id: conversation_info.conversation_id,
      sender_id: currentUser?._id,
      recive_id: conversation_info.conversation_members,
      type: "TEXT",
      is_check_conversation: true,
    });
  };

  return (
    <Row>
      <Col span="2" style={{ alignSelf: "end" }}>
        <Row className="items-center justify-around">
          <Col>
            <IoMdAddCircle className="cursor-pointer" size={20} />
          </Col>
          <Col>
            <BsImage className="cursor-pointer" size={20} />
          </Col>
          <Col>
            <GrAttachment className="cursor-pointer" size={20} />
          </Col>
        </Row>
      </Col>
      <Col span="20">
        <TextArea
          style={{
            resize: "none",
            backgroundColor: "#f3f3f5",
            borderRadius: 20,
            border: "none",
          }}
          autoSize={{ minRows: 1, maxRows: 4 }}
          onChange={(e) => setValueText(e.target.value)}
        />
      </Col>
      <Col
        span="2"
        style={{ alignSelf: "end", height: 24, padding: " 0 12px" }}
      >
        <Row className="items-center justify-around">
          <Col>
            <BsEmojiSmile className="cursor-pointer" size={20} />
          </Col>
          <Col>
            <FaMicrophone className="cursor-pointer" size={20} />
          </Col>
          <Col>
            <IoIosSend
              className="cursor-pointer"
              size={20}
              onClick={handleSendMessage}
            />
          </Col>
        </Row>
        {/* <div className={Styles.showPicker}>{<Picker />}</div> */}
      </Col>
    </Row>
  );
};

export default InputChat;
