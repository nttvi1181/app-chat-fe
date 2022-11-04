import useChatDetail from "@/hooks/useChatDetail";
import { MessageService } from "@/services/message.service";
import useProfile from "@/hooks/useProfile";
import { Avatar, Col, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatDetailItem from "./ChatDetailItem";
import moment from "moment";
import styled from "styled-components";
import { SocketService } from "@/services/socket-io";

type Props = {};
const TIME_MESSAGE_CONSECUTIVE = 60; //seconds

const TimeLineGroupComponent = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  color: #65676b;
`;

const ContentChatDetail = (props: Props) => {
  const { currentUser } = useProfile();
  const { sendSeenMessage } = SocketService();
  const { list_messages, setListMessages, conversation_info } = useChatDetail();
  const [hasMore, setHasMore] = useState(false);
  const [params, setParams] = useState({
    skip: 0,
    limit: 20,
  });

  const scrollToBottom = () => {
    const objDiv = document.getElementById("scrollableDiv") as HTMLElement;
    if (objDiv) {
      objDiv.scrollTo({ top: objDiv.scrollHeight, behavior: "smooth" });
    }
  };

  const handleGetMessage = async () => {
    if (!conversation_info.conversation_id) return;
    try {
      const { data } = await MessageService.getByConversationId(
        conversation_info.conversation_id,
        params.skip,
        params.limit
      );
      setHasMore(!!data?.length);
      // check có phải loadmore hay k => nếu loadmore push => nếu không thì unshift
      if (params.skip === 0) {
        setListMessages([...data, ...Object.values(list_messages)]);
      } else {
        setListMessages([...Object.values(list_messages), ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreData = () => {
    setParams({
      skip: Object.values(list_messages).length,
      limit: 20,
    });
  };

  useEffect(() => {
    setListMessages([]);
    setParams({
      skip: 0,
      limit: 20,
    });
  }, [conversation_info.conversation_id]);

  useEffect(() => {
    handleGetMessage();
  }, [params.skip, params.limit, conversation_info.conversation_id]);

  useEffect(() => {
    scrollToBottom();
  }, []);
  const handleSeenMessage = async (message_id: string) => {
    sendSeenMessage({
      message_id: message_id,
      user_id: currentUser?._id,
      conversation_members: conversation_info.conversation_members,
    });
  };

  const handleRenderMessage = () => {
    const listData: Array<any> = [];
    let prevItem: any = null;
    let nextItem: any = null;
    let isHeaderMessage = false;
    let isFinalMessage = false;
    const ArrayLitMessage = Object.values(list_messages);
    ArrayLitMessage?.forEach((message: any, index: number) => {
      const isOwner =
        (message?.sender_id?._id ?? message?.sender_id) === currentUser?._id;
      prevItem = ArrayLitMessage?.[index - 1];
      nextItem = ArrayLitMessage?.[index + 1];
      // check message gui lien tiep
      if (!prevItem) {
        isHeaderMessage = true;
      }

      if (!nextItem) {
        isFinalMessage = true;
      }
      if (prevItem) {
        if (
          (prevItem?.sender_id?._id ?? prevItem?.sender_id) ===
            (message?.sender_id?._id ?? message?.sender_id) &&
          moment(prevItem.createdAt).diff(
            moment(message.createdAt),
            "seconds"
          ) < TIME_MESSAGE_CONSECUTIVE &&
          moment(prevItem.createdAt).format("MM-DD-YYYY") ===
            moment(message.createdAt).format("MM-DD-YYYY")
        ) {
          isHeaderMessage = false;
        } else {
          isHeaderMessage = true;
        }
      }

      if (nextItem) {
        if (
          (nextItem?.sender_id?._id ?? nextItem?.sender_id) ===
            (message?.sender_id?._id ?? message?.sender_id) &&
          moment(message.createdAt).diff(
            moment(nextItem.createdAt),
            "seconds"
          ) < TIME_MESSAGE_CONSECUTIVE &&
          moment(nextItem.createdAt).format("MM-DD-YYYY") ===
            moment(message.createdAt).format("MM-DD-YYYY")
        ) {
          isFinalMessage = false;
        } else {
          isFinalMessage = true;
        }
      }
      // done check message gui lien tiep

      // check time group
      let TimeLineGroup = "";

      const currentMessageTime = moment(message.createdAt);
      if (!nextItem) {
        TimeLineGroup =
          currentMessageTime.format("HH:mm, DD") +
          " Tháng" +
          currentMessageTime.format("MM, YYYY");
      }

      if (nextItem) {
        if (
          currentMessageTime.format("MM-DD-YYYY") !==
          moment(nextItem.createdAt).format("MM-DD-YYYY")
        ) {
          TimeLineGroup = currentMessageTime.format("HH:mm YYYY-MM-DD");
        } else if (
          currentMessageTime.diff(moment(nextItem.createdAt), "minutes") > 15
        ) {
          TimeLineGroup = currentMessageTime.format("HH:mm");
        }
      }

      if (index === 0) {
        if (!isOwner && !message?.member_seens?.includes(currentUser?._id)) {
          handleSeenMessage(message?.message_id);
        }
      }

      const itemMessage = (
        <ChatDetailItem
          key={message._id}
          message={message}
          isOwner={isOwner}
          content={message?.content}
          username={message?.sender_id?.username}
          avatar_url={message?.sender_id?.avatar_url}
          type={message?.type}
          isHeaderMessageOfBlock={isHeaderMessage}
          isFinalMessageOfBlock={isFinalMessage}
          isSent={!!message?._id}
        />
      );
      listData.push(itemMessage);
      if (TimeLineGroup) {
        listData.push(
          <TimeLineGroupComponent>{TimeLineGroup}</TimeLineGroupComponent>
        );
      }
    });
    return listData;
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100%",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={Object.values(list_messages)?.length}
        next={fetchMoreData}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={hasMore}
        loader={<Spin />}
        scrollableTarget="scrollableDiv"
        scrollThreshold={300}
      >
        {handleRenderMessage()}
      </InfiniteScroll>
    </div>
  );
};
export default ContentChatDetail;
