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
import { TYPE_REACTION } from "@/utils/enum";
import useProfile from "@/hooks/useProfile";
import styles from "./style.module.scss";
import clsx from "clsx";
import ClickOutside from "@/components/common/ClickOutside";
import { SocketService } from "@/services/socket-io";
import useChatDetail from "@/hooks/useChatDetail";
import RenderReactions from "./renderReaction";
import styled from "styled-components";
import CustomAvatar from "@/components/common/CustomAvatar";
import { MessageService } from "@/services/message.service";
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
  const [isOpentActionMessage, setIsOpenActionMessage] = useState(false);
  const { conversation_info } = useChatDetail();

  const handleDeleteMessage = () => {
    showConfirm(
      "Tin nhắn này sẽ bị thu hồi với mọi người trong đoạn chat",
      "ok",
      onDeleteMessage
    );
  };

  const onDeleteMessage = async () => {
    try {
      MessageService.deleteMessage(message._id, conversation_info.conversation_members);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReaction = (type: TYPE_REACTION) => {
    sendReactionMessage({
      message_id: message.message_id,
      conversation_id: conversation_info.conversation_id,
      user_id: currentUser?._id,
      type,
      conversation_members: conversation_info.conversation_members,
    });
    setIsOpentReaction(false);
    setIsOpenActionMessage(false);
  };

  const handleMoveOverMessage = () => {
    setIsOpenActionMessage(true);
  };

  const handleMoveLeaveMessage = () => {
    if (isOpentReaction) return;
    setIsOpenActionMessage(false);
    setIsOpentReaction(false);
  };

  const handleClickOutsideReaction = () => {
    setIsOpenActionMessage(false);
    setIsOpentReaction(false);
  };

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

  const renderAvatarMessage = () => {
    return isOwner ? (
      <Col
        className="w-5 self-end flex justify-center"
        style={{ color: "#d9d9d9" }}
      >
        {renderIconSent()}
      </Col>
    ) : (
      <Col className="self-end pl-3 pr-2">
        <CustomAvatar
          visibility={isHeaderMessageOfBlock}
          src={avatar_url}
          size={28}
        />
      </Col>
    );
  };

  const renderNameAuthorMessage = () => (
    <Col span={24}>
      <Row>
        <Col className="w-14"></Col>
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
  );

  return (
    <Row
      id={message.message_id}
      className="align-center"
      style={{
        marginTop: isFinalMessageOfBlock ? "8px" : "2px",
        marginBottom: !!message.reactions?.length ? "20px" : "0",
      }}
    >
      {!isOwner && isFinalMessageOfBlock && renderNameAuthorMessage()}
      <Col span={24}>
        <Row style={{ flexDirection: isOwner ? "row-reverse" : "row" }}>
          {renderAvatarMessage()}
          <Col
            className={clsx(styles.contentMessage)}
            onMouseOver={handleMoveOverMessage}
            onMouseLeave={handleMoveLeaveMessage}
          >
            <div className="relative">
              <TextMessage
                isHeaderMessageOfBlock={isHeaderMessageOfBlock}
                isFinalMessageOfBlock={isFinalMessageOfBlock}
                isOwner={isOwner}
                content={content}
              />
              {!!message.reactions?.length && (
                <RenderReactions reactions={message.reactions} />
              )}
            </div>
          </Col>
          {isOpentActionMessage && (
            <Col
              className={clsx("flex items-center")}
              onMouseOver={handleMoveOverMessage}
              onMouseLeave={handleMoveLeaveMessage}
            >
              {isOwner ? (
                <div className="flex items-center justify-center">
                  <IconDeleteMessage size={16} onClick={handleDeleteMessage} />
                </div>
              ) : (
                <div className="relative">
                  <IconReaction onClick={() => setIsOpentReaction(true)} />
                  {isOpentReaction && (
                    <div className="absolute w-64 -top-14 left-5 z-30">
                      <ClickOutside onClickOutside={handleClickOutsideReaction}>
                        <ReactionMessage onClick={handleReaction} />
                      </ClickOutside>
                    </div>
                  )}
                </div>
              )}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default ChatDetailItem;

const IconDeleteMessage = styled(MdDelete)`
  color: #65676b;
  font-weight: 700;
  display: block;
  margin: 0 8px;
  cursor: pointer;
`;

const IconReaction = styled(BsEmojiSmile)`
  color: #65676b;
  font-weight: 700;
  display: block;
  margin: 0 8px;
  cursor: pointer;
`;
