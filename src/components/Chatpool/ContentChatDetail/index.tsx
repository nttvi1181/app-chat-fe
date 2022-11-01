import useChatDetail from "@/hooks/useChatDetail";
import { MessageService } from "@/services/message.service";
import { Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};
const ContentChatDetail = (props: Props) => {
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
        {Object.values(list_messages)?.map((_: any, index: number) => (
          <div style={{...style, backgroundColor: _._id? "green": "red"}} key={index}>
            {_.content}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default ContentChatDetail;
