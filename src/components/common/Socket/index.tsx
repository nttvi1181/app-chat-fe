import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import connectSocket from "../../../services/socket-io";
import React, { useEffect } from "react";

type Props = {};

const Socket = (props: Props) => {
  const { currentUser } = useProfile();

  useEffect(() => {
    if (!currentUser?._id) return;
    const socket = connectSocket();
    if (!socket) return;
    socket.emit("JOIN_APP", { user_id: currentUser._id });

    socket.on("SERVER_SEND_NEW_MESSAGE", (data: any) => {
      console.log("new message", data);
    });

    socket.on("CLIENT_SEND_MESSAGE_ERROR", (data: any) => {
      console.log("send message error ==>", data);
    });

    return () => {
      socket.off("SERVER_SEND_NEW_MESSAGE");
      socket.off("CLIENT_SEND_MESSAGE_ERROR");
    };
  }, [currentUser?._id]);

  return <div></div>;
};
export default Socket;
