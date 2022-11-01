import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import connectSocket from "../../../services/socket-io";
import React, { useEffect } from "react";
import useChatDetail from "@/hooks/useChatDetail";

type Props = {};

const Socket = (props: Props) => {
  const { currentUser } = useProfile();
  const { conversation_info, pushNewMessage, updateNewMessage } =
    useChatDetail();

  useEffect(() => {
    if (!currentUser?._id) return;
    const socket = connectSocket();
    if (!socket) return;
    socket.emit("JOIN_APP", { user_id: currentUser._id });

    socket.on("SERVER_SEND_NEW_MESSAGE", (data: any) => {
      if (
        conversation_info.conversation_id &&
        conversation_info.conversation_id === data.conversation_id
      ) {
        if (data.sender_id === currentUser._id) {
          updateNewMessage(data);
        } else {
          pushNewMessage(data);
        }
      }
      console.log("new message", data);
    });

    socket.on("CLIENT_SEND_MESSAGE_ERROR", (data: any) => {
      console.log("send message error ==>", data);
    });

    return () => {
      socket.off("SERVER_SEND_NEW_MESSAGE");
      socket.off("CLIENT_SEND_MESSAGE_ERROR");
    };
  }, [currentUser?._id, conversation_info.conversation_id]);

  return <div></div>;
};
export default Socket;
