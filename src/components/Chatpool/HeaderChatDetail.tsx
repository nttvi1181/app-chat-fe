import useChatDetail from "@/hooks/useChatDetail";
import AvatarGroupCustom from "@/components/common/AvatarGroupConversation";
import { Avatar, Col, Row } from "antd";
import React from "react";
import CustomAvatar from "@/components/common/CustomAvatar";

type Props = {};

const HeaderChatDetail = (props: Props) => {
  const { conversation_info } = useChatDetail();
  return (
    <Row
      justify="space-between"
      className="items-center"
      style={{ height: 64 }}
    >
      <Col span={20}>
        <Row>
          <Col className="pr-2">
            {(conversation_info?.conversation_avatar?.length ?? 0) >= 2 ? (
              <AvatarGroupCustom
                avatar1={conversation_info?.conversation_avatar?.[0]}
                avatar2={conversation_info?.conversation_avatar?.[1]}
              />
            ) : (
              <CustomAvatar
                src={conversation_info?.conversation_avatar?.[0]}
                size={48}
              />
            )}
          </Col>
          <Col className="flex flex-col justify-center round">
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
