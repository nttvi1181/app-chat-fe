import { Avatar, Col, message, Popover, Row } from "antd";
import React, { useState } from "react";
import TextMessage from "./TextMessage";
import {
  BsCircle,
  BsCheckCircle,
  BsCheckCircleFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { showConfirm } from "@/utils/message.helper";
import ReactionMessage from "@/components/common/ReactionMessage";
import { TYPE_REACTION } from "@utils/enum";
import useProfile from "@/hooks/useProfile";
import styles from "./style.module.scss";
import clsx from "clsx";
import ClickOutside from "@/components/common/ClickOutside";
import { SocketService } from "@/services/socket-io";
import useChatDetail from "@/hooks/useChatDetail";
type Props = {
  isOwner: boolean;
  username: string;
  avatar_url: string;
  content: string;
  type: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  message: any;
  isSent: boolean;
};

const ChatDetailItem = ({
  isOwner,
  username,
  avatar_url,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  message,
  isSent,
  type,
}: Props) => {
  const { sendReactionMessage } = SocketService();
  const { currentUser } = useProfile();
  const [isOpentReaction, setIsOpentReaction] = useState(false);
  const { conversation_info } = useChatDetail();

  const renderIconSent = () => {
    if (!isOwner) return null;
    if (message?.member_seens?.length > 1)
      return <BsCheckCircleFill style={{ width: 14 }} />;
    return isSent ? (
      <BsCheckCircle style={{ width: 14 }} />
    ) : (
      <BsCircle style={{ width: 14 }} />
    );
  };

  const handleDeleteMessage = () => {
    showConfirm("Tin nhắn này sẽ bị thu hồi với mọi người trong đoạn chat");
  };

  const handleReaction = (type: TYPE_REACTION) => {
    sendReactionMessage({
      message_id: message.message_id,
      user_id: currentUser?._id,
      type,
      conversation_members: conversation_info.conversation_members,
    });
  };

  return (
    <Row
      id={message.message_id}
      className="align-center"
      style={{ marginTop: isFinalMessageOfBlock ? "8px" : "2px" }}
    >
      {!isOwner && isFinalMessageOfBlock && (
        <Col span={24}>
          <Row>
            <Col span={1}></Col>
            <Col>
              <div
                style={{
                  fontSize: 11,
                  color: "#65676b",
                }}
              >
                {username}
              </div>
            </Col>
          </Row>
        </Col>
      )}
      <Col span={24} className={styles.contentMessage}>
        <Row
          style={{
            flexDirection: isOwner ? "row-reverse" : "row",
          }}
        >
          {isOwner ? (
            <Col
              style={{
                width: 20,
                alignSelf: "end",
                display: "flex",
                justifyContent: "center",
                color: "#d9d9d9",
              }}
            >
              {renderIconSent()}
            </Col>
          ) : (
            <Col className="self-end pl-3 pr-2">
              <Avatar
                style={{
                  visibility: isHeaderMessageOfBlock ? "visible" : "hidden",
                }}
                src={avatar_url || "/avatar-default.png"}
              />
            </Col>
          )}

          <Col style={{ maxWidth: "590px" }}>
            <TextMessage
              isHeaderMessageOfBlock={isHeaderMessageOfBlock}
              isFinalMessageOfBlock={isFinalMessageOfBlock}
              isOwner={isOwner}
              content={content}
            />
          </Col>
          <Col
            className={clsx(
              !isOpentReaction && styles.actionMessage,
              "flex items-center ml-2"
            )}
          >
            {isOwner ? (
              <div className="flex items-center justify-center">
                <MdDelete
                  className="cursor-pointer mx-2"
                  style={{
                    color: "#65676b",
                    fontWeight: 700,
                    display: "block",
                  }}
                  size={16}
                  onClick={handleDeleteMessage}
                />
              </div>
            ) : (
              <div className="relative">
                <BsEmojiSmile
                  className="cursor-pointer mx-2"
                  style={{ color: "#65676b", fontWeight: 700 }}
                  size={16}
                  onClick={() => setIsOpentReaction(true)}
                />
                <ClickOutside onClickOutside={() => setIsOpentReaction(false)}>
                  <div
                    className={clsx("absolute", !isOpentReaction && "hidden")}
                    style={{ width: "264px", height: "52px", top: "-52px" }}
                  >
                    <ReactionMessage onClick={handleReaction} />
                  </div>
                </ClickOutside>
              </div>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChatDetailItem;
