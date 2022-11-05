import React, {
  ChangeEvent,
  ChangeEventHandler,
  useRef,
  useState,
} from "react";
import { Col, Input, Row } from "antd";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend, IoMdAddCircle, IoMdClose } from "react-icons/io";
import useChatDetail from "@/hooks/useChatDetail";
import { SocketService } from "@/services/socket-io";
import useProfile from "@/hooks/useProfile";
import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";
const { TextArea } = Input;
type Props = {};

const InputChat = (props: Props) => {
  const inputRef = useRef<any>();
  //   const { setListMessages } = useChatDetail();
  const { sendNewMessage } = SocketService();
  const {
    conversation_info,
    list_messages,
    message_reply,
    pushNewMessage,
    setMessageReply,
  } = useChatDetail();
  const { currentUser } = useProfile();

  const [valueInputText, setValueText] = useState("");

  const handleRemoveReplyMessage = () => {
    setMessageReply(null);
  };

  const handleChangeValueInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValueText(e.target.value);
  };

  const onChangeEmojio = (e: any) => {
    console.log(e);
  };

  const handleKeyPress = (e: any) => {
    if ((e.charCode === 13 || e.code === "Enter") && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
    }
  };
  const handleSendMessage = () => {
    if (!valueInputText) return;
    const data = {
      message_id: new Date().getTime().toString(),
      content: valueInputText,
      conversation_id: conversation_info.conversation_id,
      sender_id: currentUser?._id,
      recive_id: conversation_info.conversation_members,
      type: "TEXT",
      is_check_conversation: !Object.values(list_messages).length,
      member_seens: [currentUser?._id],
      send_time: new Date().getTime(),
      message_reply,
    };
    pushNewMessage(data);
    sendNewMessage(data);
    handleRemoveReplyMessage();
    setValueText("");
    scrollToBottom();
  };
  const scrollToBottom = () => {
    const objDiv = document.getElementById("scrollableDiv") as HTMLElement;
    if (objDiv) {
      objDiv.scrollTo({ top: objDiv.scrollHeight, behavior: "smooth" });
    }
  };
  
  return (
    <Row>
      {message_reply && (
        <Col
          span={24}
          className="pt-3 pb-1 px-4 relative"
          style={{ borderTop: "1px solid #ced0d4" }}
        >
          <div style={{ color: "#050505" }}>
            <span>Đang trả lời</span> &nbsp;
            <span className="font-semibold">
              {message_reply.sender_id.username}
            </span>
          </div>
          <ContentReplyWraper>
            <span style={{ color: "#65676b" }}>{message_reply.content}</span>
          </ContentReplyWraper>
          <div className="absolute top-3 right-3 cursor-pointer">
            <IoMdClose size={16} onClick={handleRemoveReplyMessage} />
          </div>
        </Col>
      )}

      <Col span={24}>
        <Row>
          <Col style={{ alignSelf: "end", width: 120 }}>
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
          <Col className="flex-1">
            <TextArea
              id="input-message-chat"
              ref={inputRef}
              style={{
                resize: "none",
                backgroundColor: "#f3f3f5",
                borderRadius: 20,
                border: "none",
              }}
              value={valueInputText}
              autoSize={{ minRows: 1, maxRows: 4 }}
              onKeyPress={(e) => handleKeyPress(e)}
              onChange={(e) => handleChangeValueInput(e)}
            />
          </Col>
          <Col style={{ alignSelf: "end", height: 24, padding: " 0 12px" }}>
            <Row
              className="items-center justify-around"
              style={{ width: 120, padding: "0 12px" }}
            >
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
      </Col>
    </Row>
  );
};

const ContentReplyWraper = styled.div`
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default InputChat;
