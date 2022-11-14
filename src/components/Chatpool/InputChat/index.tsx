import React, {
  ChangeEvent,
  ChangeEventHandler,
  useRef,
  useState,
} from "react";
import { Col, Input, message, Row, Upload } from "antd";
import { BsEmojiSmile, BsImage } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { IoIosSend, IoMdAddCircle, IoMdClose } from "react-icons/io";
import useChatDetail from "@/hooks/useChatDetail";
import { SocketService } from "@/services/socket-io";
import useProfile from "@/hooks/useProfile";
import styled from "styled-components";
import { RiCloseFill } from "react-icons/ri";
import { RcFile } from "antd/lib/upload";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { MediaService } from "@/services/MediaService";
import useUi from "@/hooks/useUi";
import { getThumbailVideo, toBase64 } from "@/utils/helper";
import PreviewFileItem from "./PreviewFileItem";
import EmojiPicker from "emoji-picker-react";
import ClickOutside from "@/components/common/ClickOutside";
import {
  ATTACH_FILE_DOCX,
  ATTACH_FILE_PDF,
  ATTACH_FILE_PPT,
  ATTACH_FILE_PPTX,
  ATTACH_FILE_XLSX,
  LIST_ATTACH_FILE_TYPE,
} from "@/constant";
const { TextArea } = Input;
type Props = {};

const InputChat = (props: Props) => {
  const inputRef = useRef<any>();
  const { setLoading } = useUi();
  //   const { setListMessages } = useChatDetail();
  const { sendNewMessage } = SocketService();
  const {
    conversation_info,
    list_messages,
    message_reply,
    pushNewMessage,
    setMessageReply,
  } = useChatDetail();
  const { currentUser } = useProfile();

  const [valueInputText, setValueText] = useState("");
  const [filesInput, setFilesInput] = useState([]);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

  const handleRemoveReplyMessage = () => {
    setMessageReply(null);
  };

  const handleChangeValueInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValueText(e.target.value);
  };

  const onChangeEmojio = (e: any) => {
    setValueText((prev) => prev + e.emoji);
  };

  const handleKeyPress = (e: any) => {
    if ((e.charCode === 13 || e.code === "Enter") && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSendMessage();
      setIsOpenEmoji(false);
    }
  };

  const handleSendMessageFile = async () => {
    try {
      if (!filesInput.length) return;
      const fileImages = filesInput.filter((file: any) =>
        file?.type?.includes("image")
      );
      const fileVideos = filesInput.filter((file: any) =>
        file?.type?.includes("video")
      );
      const fileAttachsPDF = filesInput.filter((file: any) =>
        file?.type?.includes(ATTACH_FILE_PDF)
      );
      const fileAttachsDOCX = filesInput.filter((file: any) =>
        file?.type?.includes(ATTACH_FILE_DOCX)
      );
      const fileAttachsPPT = filesInput.filter((file: any) =>
        file?.type?.includes(ATTACH_FILE_PPT)
      );
      const fileAttachsPPTX = filesInput.filter((file: any) =>
        file?.type?.includes(ATTACH_FILE_PPTX)
      );
      const fileAttachsXLSX = filesInput.filter((file: any) =>
        file?.type?.includes(ATTACH_FILE_XLSX)
      );
      setLoading(true);
      const responseFilePDF = await Promise.all(
        fileAttachsPDF?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );
      const responseFileDOCX = await Promise.all(
        fileAttachsDOCX?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );
      const responseFilePPT = await Promise.all(
        fileAttachsPPT?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );
      const responseFilePPTX = await Promise.all(
        fileAttachsPPTX?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );
      const responseFileXLSX = await Promise.all(
        fileAttachsXLSX?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );

      const responseFileImage = await Promise.all(
        fileImages?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );

      const responseFileVideo = await Promise.all(
        fileVideos?.map((file) => {
          const formData = new FormData();
          formData.append("fileUpload", file);
          formData.append(
            `folder`,
            `/app-chat-fpt/conversation/${conversation_info.conversation_id}`
          );
          return MediaService.uploadImageAvatar(formData);
        })
      );
      console.log(responseFilePDF);
      const contentMessageAttachPDF = responseFilePDF?.map((item: any) => ({
        url: item?.data?.url,
        size: item?.data?.bytes,
        name: item?.data?.name,
      }));
      const contentMessageAttachDOCX = responseFileDOCX?.map((item: any) => ({
        url: item?.data?.url,
        size: item?.data?.bytes,
        name: item?.data?.name,
      }));
      const contentMessageAttachPPT = responseFilePPT?.map((item: any) => ({
        url: item?.data?.url,
        size: item?.data?.bytes,
        name: item?.data?.name,
      }));
      const contentMessageAttachPPTX = responseFilePPTX?.map((item: any) => ({
        url: item?.data?.url,
        size: item?.data?.bytes,
        name: item?.data?.name,
      }));
      const contentMessageAttachXLSX = responseFileXLSX?.map((item: any) => ({
        url: item?.data?.url,
        size: item?.data?.bytes,
        name: item?.data?.name,
      }));

      const contentMessageImage = responseFileImage?.map(
        (item: any) => item?.data?.url
      );
      const contentMessageVideo = responseFileVideo?.map(
        (item: any) => item?.data?.url
      );

      //
      if (contentMessageAttachPDF.length) {
        const dataAttach = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageAttachPDF),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "ATTACH",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataAttach);
        sendNewMessage(dataAttach);
      }
      //
      if (contentMessageAttachDOCX.length) {
        const dataAttach = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageAttachDOCX),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "ATTACH",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataAttach);
        sendNewMessage(dataAttach);
      }
      //
      //
      if (contentMessageAttachPPT.length) {
        const dataAttach = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageAttachPPT),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "ATTACH",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataAttach);
        sendNewMessage(dataAttach);
      }
      //
      //
      if (contentMessageAttachPPTX.length) {
        const dataAttach = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageAttachPPTX),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "ATTACH",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataAttach);
        sendNewMessage(dataAttach);
      }
      //
      if (contentMessageAttachXLSX.length) {
        const dataAttach = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageAttachXLSX),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "ATTACH",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataAttach);
        sendNewMessage(dataAttach);
      }
      //

      if (contentMessageImage.length) {
        const dataImage = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageImage),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "IMAGE",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataImage);
        sendNewMessage(dataImage);
      }

      //
      if (responseFileVideo.length) {
        const dataVideo = {
          message_id: new Date().getTime().toString(),
          content: JSON.stringify(contentMessageVideo),
          conversation_id: conversation_info.conversation_id,
          sender_id: currentUser?._id,
          recive_id: conversation_info.conversation_members,
          type: "VIDEO",
          is_check_conversation: !Object.values(list_messages).length,
          member_seens: [currentUser?._id],
          send_time: new Date().getTime(),
          message_reply,
        };
        pushNewMessage(dataVideo);
        sendNewMessage(dataVideo);
      }

      handleRemoveReplyMessage();
      setFilesInput([]);
      scrollToBottom();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    handleSendMessageFile();
    if (!valueInputText) return;
    const data = {
      message_id: new Date().getTime().toString(),
      content: valueInputText,
      conversation_id: conversation_info.conversation_id,
      sender_id: currentUser?._id,
      recive_id: conversation_info.conversation_members,
      type: "TEXT",
      is_check_conversation: !Object.values(list_messages).length,
      member_seens: [currentUser?._id],
      send_time: new Date().getTime(),
      message_reply,
    };
    pushNewMessage(data);
    sendNewMessage(data);
    handleRemoveReplyMessage();
    setValueText("");
    scrollToBottom();
  };
  const scrollToBottom = () => {
    const objDiv = document.getElementById("scrollableDiv") as HTMLElement;
    if (objDiv) {
      objDiv.scrollTo({ top: objDiv.scrollHeight, behavior: "smooth" });
    }
  };

  const handleChangeFile = (e: any) => {
    setFilesInput(filesInput.concat(Array.from(e.target.files)));
  };

  const onRemoveFile = (index: number) => {
    const newFiles = [...filesInput];
    newFiles.splice(index, 1);
    setFilesInput(newFiles);
  };

  return (
    <Row className="relative">
      {message_reply && (
        <Col
          span={24}
          className="pt-3 pb-1 px-4 relative"
          style={{ borderTop: "1px solid #ced0d4" }}
        >
          <div style={{ color: "#050505" }}>
            <span>Đang trả lời</span> &nbsp;
            <span className="font-semibold">
              {message_reply.sender_id.username}
            </span>
          </div>
          <ContentReplyWraper>
            <span style={{ color: "#65676b" }}>
              {message_reply?.type === "TEXT"
                ? message_reply.content
                : "Một tập tin"}
            </span>
          </ContentReplyWraper>
          <div className="absolute top-3 right-3 cursor-pointer">
            <IoMdClose size={16} onClick={handleRemoveReplyMessage} />
          </div>
        </Col>
      )}

      {!!filesInput?.length && (
        <Col
          span={24}
          className="pt-3 pb-1 px-4 relative"
          style={{ borderTop: "1px solid #ced0d4" }}
        >
          <div className="whitespace-nowrap overflow-x-auto">
            <div className="mx-3 inline-block relative">
              <div
                className="border-2 border-black border-dotted"
                style={{ width: 48, height: 48 }}
              >
                <label className="relative  w-4 top-4 left-4 cursor-pointer">
                  <AiOutlinePlus />
                  <input
                    onChange={handleChangeFile}
                    className="hidden"
                    type="file"
                    accept=".mp4,.jpg,.jpge,.png"
                    multiple
                  />
                </label>
              </div>
            </div>
            {filesInput?.map((file, index) => (
              <PreviewFileItem
                key={index}
                file={file}
                index={index}
                onRemoveFile={onRemoveFile}
              />
            ))}
          </div>
        </Col>
      )}

      <Col span={24}>
        <Row>
          <Col style={{ alignSelf: "end", width: 120 }}>
            <Row className="items-center justify-around">
              <Col>
                <IoMdAddCircle className="cursor-pointer" size={20} />
              </Col>
              <Col>
                <label>
                  <BsImage className="cursor-pointer" size={20} />
                  <input
                    onChange={handleChangeFile}
                    className="hidden"
                    type="file"
                    accept=".mp4,.jpg,.jpge,.png"
                    multiple
                  />
                </label>
              </Col>
              <Col>
                <label>
                  <GrAttachment className="cursor-pointer" size={20} />
                  <input
                    onChange={handleChangeFile}
                    type="file"
                    className="hidden"
                    multiple
                    accept={LIST_ATTACH_FILE_TYPE.toString()}
                  />
                </label>
              </Col>
            </Row>
          </Col>
          <Col className="flex-1">
            <TextArea
              id="input-message-chat"
              ref={inputRef}
              style={{
                resize: "none",
                backgroundColor: "#f3f3f5",
                borderRadius: 20,
                border: "none",
              }}
              value={valueInputText}
              autoSize={{ minRows: 1, maxRows: 4 }}
              onKeyPress={(e) => handleKeyPress(e)}
              onChange={(e) => handleChangeValueInput(e)}
            />
          </Col>
          <Col
            className="relative"
            style={{ alignSelf: "end", height: 24, padding: " 0 12px" }}
          >
            <Row
              className="items-center justify-around"
              style={{ width: 120, padding: "0 12px" }}
            >
              <Col>
                <BsEmojiSmile
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setIsOpenEmoji(!isOpenEmoji)}
                />
              </Col>
              <Col>
                <FaMicrophone className="cursor-pointer" size={20} />
              </Col>
              <Col>
                <IoIosSend
                  className="cursor-pointer"
                  size={20}
                  onClick={handleSendMessage}
                />
              </Col>
            </Row>
            {isOpenEmoji && (
              <ClickOutside onClickOutside={() => setIsOpenEmoji(false)}>
                <div className="absolute bottom-8 right-6">
                  <EmojiPicker onEmojiClick={onChangeEmojio} />
                </div>
              </ClickOutside>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const ContentReplyWraper = styled.div`
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default InputChat;
