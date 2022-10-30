import useChatDetail from "@/hooks/useChatDetail";
import { Avatar, Col, Row } from "antd";
import React from "react";

type Props = {};

const HeaderChatDetail = (props: Props) => {
  const { conversation_info } = useChatDetail();
  console.log("header");
  return (
    <Row
      justify="space-between"
      className="items-center"
      style={{ height: 64 }}
    >
      <Col span={20}>
        <Row>
          <Col className="pr-2">
            <Avatar
              size={40}
              src={
                conversation_info?.conversation_avatar || "/avatar-default.png"
              }
            />
          </Col>
          <Col className="flex flex-col justify-center">
            <div
              style={{
                fontSize: 17,
                color: "#050505",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              {conversation_info?.conversation_name ?? ""}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#65676B",
                fontWeight: "normal",
                lineHeight: 1.5,
              }}
            >
              Đang hoạt động
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={4}>search</Col>
    </Row>
  );
};

export default HeaderChatDetail;
