import * as io from "socket.io-client";
const baseURL = "http://192.168.0.100:8080";
const connectSocket = () => {
  if (window.socket) {
    return window.socket;
  }
  window.socket = io.connect(baseURL);

  return window.socket;
};

export const SocketService = () => {
  const socket = connectSocket();
  return {
    sendNewMessage: (data: any) => socket.emit("CLIENT_SEND_NEW_MESSAGE", data),
  };
};

export const disconnectSocket = () => {
  const socket = connectSocket();
  window.socket = undefined;
  socket.disconnect();
};

export default connectSocket;
