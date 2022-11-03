import { Avatar, Col, message, Row } from "antd";
import React from "react";
import TextMessage from "./TextMessage";

type Props = {
  isOwner: boolean;
  username: string;
  avatar_url: string;
  content: string;
  type: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
  message: any;
};

const ChatDetailItem = ({
  isOwner,
  username,
  avatar_url,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
  message,
  type,
}: Props) => {
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
            <Col style={{ width: 20 }}></Col>
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
