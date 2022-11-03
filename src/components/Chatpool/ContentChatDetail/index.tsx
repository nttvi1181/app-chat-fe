import useChatDetail from "@/hooks/useChatDetail";
import { MessageService } from "@/services/message.service";
import useProfile from "@/hooks/useProfile";
import { Avatar, Col, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatDetailItem from "./ChatDetailItem";
import moment from "moment";

type Props = {};
const TIME_MESSAGE_CONSECUTIVE = 60; //seconds

const ContentChatDetail = (props: Props) => {
  const { currentUser } = useProfile();
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
      const datetimeGroupString = moment(message.createdAt).format("YYYYMMDD");
      prevItem = ArrayLitMessage?.[index - 1];
      nextItem = ArrayLitMessage?.[index + 1];

      if (!prevItem) {
        isHeaderMessage = true;
      }

      if (!nextItem) {
        isFinalMessage = true;
      }
console.log(message)
      if (prevItem) {
        if (
          (prevItem?.sender_id?._id ?? prevItem?.sender_id) ===
            (message?.sender_id?._id ?? message?.sender_id) &&
          moment(prevItem.createdAt).diff(
            moment(message.createdAt),
            "seconds"
          ) < TIME_MESSAGE_CONSECUTIVE
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
          ) < TIME_MESSAGE_CONSECUTIVE
        ) {
          isFinalMessage = false;
        } else {
          isFinalMessage = true;
        }
      }

      const itemMessage = (
        <ChatDetailItem
          message={message}
          isOwner={isOwner}
          content={message?.content}
          username={message?.sender_id?.username}
          avatar_url={message?.sender_id?.avatar_url}
          type={message?.type}
          isHeaderMessageOfBlock={isHeaderMessage}
          isFinalMessageOfBlock={isFinalMessage}
        />
      );
      listData.push(itemMessage);
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
