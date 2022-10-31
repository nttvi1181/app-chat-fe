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
  const messagesEndRef = useRef<any>();
  const [state, setState] = useState({ items: Array.from({ length: 40 }) });

  const scrollToBottom = () => {
    const objDiv = document.getElementById("scrollableDiv") as HTMLElement;
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setState({
        items: state.items.concat(Array.from({ length: 20 })),
      });
    }, 1500);
  };

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
        dataLength={state.items.length}
        next={fetchMoreData}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={true}
        loader={<Spin />}
        scrollableTarget="scrollableDiv"
        initialScrollY={100}
      >
        {state.items.map((_, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default ContentChatDetail;
