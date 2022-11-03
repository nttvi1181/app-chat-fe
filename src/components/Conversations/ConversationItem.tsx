import React, { useEffect } from "react";
import Styles from "./style.module.scss";
import Avatarimg from "../../assets/images/dejong.jpg";
import { Avatar, Tooltip } from "antd";
import clsx from "clsx";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AvatarGroupCustom from "@/components/common/AvatarGroupConversation";
import useProfile from "@/hooks/useProfile";
import useChatDetail from "@/hooks/useChatDetail";
import CustomAvatar from "@/components/common/CustomAvatar";
type Props = {
  seens: number;
  item: any;
};

const ConversationItem = ({ seens, item }: Props) => {
  const { currentUser } = useProfile();
  const { setChatDetailInfo } = useChatDetail();

  const handleClickConversationItem = (conversation: any) => {
    if (!currentUser) return;
    const data = {
      conversation_info: {
        conversation_id: conversation.conversation_id,
        origin_conversation_id: conversation?._id,
        conversation_name: getNameConversation(),
        conversation_avatar: getAvatarConversation(),
        conversation_members: conversation.members?.map(
          (member: any) => member._id
        ),
      },
      list_messages: [],
    };
    console.log(data);
    setChatDetailInfo(data);
  };

  useEffect(() => {
    const containerItems: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(
        ".container-item"
      ) as NodeListOf<HTMLDivElement>;
    if (!Array.from(containerItems).length) return;
    containerItems.forEach((item) => {
      const containerAvatar: HTMLDivElement = item.querySelector(
        ".container-avatar"
      ) as HTMLDivElement;
      const containerSeen: HTMLDivElement = item.querySelector(
        ".container-seen"
      ) as HTMLDivElement;
      const totalSubWidth =
        containerAvatar?.clientWidth + containerSeen?.clientWidth ?? 0;
      const containerContent: HTMLDivElement = item.querySelector(
        ".container-content"
      ) as HTMLDivElement;
      containerContent.style.maxWidth = `calc(100% - ${totalSubWidth}px)`;
    });
  }, [item._id, seens]);

  const getNameConversation = () => {
    if (item?.display_name) return item?.display_name;
    return item?.members
      ?.filter((member: any) => member._id !== currentUser?._id)
      ?.map((member: any) => member?.username)
      ?.join(", ");
  };

  const getAvatarConversation = () => {
    if (item?.avatar_url) return item?.avatar_url;
    return item?.members
      ?.filter((member: any) => member._id !== currentUser?._id)
      ?.map((member: any) => member?.avatar_url);
  };

  const getContentLastMessage = () => {
    const { last_message } = item;
    if (!last_message) return "";
    switch (last_message.type) {
      case "TEXT":
        if (last_message.sender_id._id === currentUser?._id) {
          return `Bạn: ${last_message.content}`;
        }
        return `${last_message.sender_id.username}: ${last_message.content}`;
    }
  };

  return (
    <div className={clsx(Styles.listItem, "container-item")}>
      <div
        className="pr-2 flex-shrink-0 container-avatar"
        onClick={() => handleClickConversationItem(item)}
      >
        {getAvatarConversation()?.length >= 2 ? (
          <AvatarGroupCustom
            avatar1={getAvatarConversation()?.[0]}
            avatar2={getAvatarConversation()?.[1]}
          />
        ) : (
          <CustomAvatar src={getAvatarConversation()?.[0]} size={48} />
        )}
      </div>
      <div
        className="flex-1 container-content"
        onClick={() => handleClickConversationItem(item)}
      >
        <div>
          <span className={Styles.nameChat}>{getNameConversation()}</span>
        </div>
        <div className="flex flex-nowrap">
          <span className={clsx(Styles.textChat)}>
            {getContentLastMessage()}
          </span>
          <span className={clsx(Styles.textChat, "relative bottom-1 pl-1")}>
            .
          </span>
          <span className={clsx(Styles.textChat)}>1 giờ</span>
        </div>
      </div>
      <div
        className={clsx(
          Styles.seensImageWraper,
          "flex-shrink-0 container-seen"
        )}
      >
        <Avatar.Group size="small">
          {Array.from({ length: 3 }).map((_, index) => (
            <Avatar
              key={index}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              size={16}
            />
          ))}
        </Avatar.Group>
      </div>
    </div>
  );
};
export default ConversationItem;
