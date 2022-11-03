import { Avatar, Col, message, Row } from "antd";
import React from "react";
import TextMessage from "./TextMessage";
import { BsCircle, BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
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
  
  const renderIconSent = () => {
    if (!isOwner) return null;
    if (message?.member_seens?.length >= 1)
      return <BsCheckCircleFill style={{ width: 14 }} />;
    return isSent ? (
      <BsCheckCircle style={{ width: 14 }} />
    ) : (
      <BsCircle style={{ width: 14 }} />
    );
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
      <Col span={24}>
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
        </Row>
      </Col>
    </Row>
  );
};

export default ChatDetailItem;
