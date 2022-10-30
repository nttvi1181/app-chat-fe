import React, { useEffect } from "react";
import Styles from "./style.module.scss";
import Avatarimg from "../../assets/images/dejong.jpg";
import { Avatar, Tooltip } from "antd";
import clsx from "clsx";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AvatarGroupCustom from "@/components/common/AvatarGroupConversation";
type Props = {
  id: string;
  seens: number;
};

const ConversationItem = ({ seens, id }: Props) => {
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
  }, [id, seens]);

  return (
    <div className={clsx(Styles.listItem, "container-item")}>
      <div className="pr-2 flex-shrink-0 container-avatar">
        {/* <Avatar src={Avatarimg} size={48}>
          user
        </Avatar> */}
        <AvatarGroupCustom avatar1="" avatar2="" />
      </div>
      <div className="flex-1 container-content">
        <div>
          <span className={Styles.nameChat}>
            Việt, Hiếu, Ngọc, Tuyên, Thoại, Vũ
          </span>
        </div>
        <div className="flex flex-nowrap">
          <span className={clsx(Styles.textChat)}>Bạn:server</span>
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
          {Array.from({ length: seens }).map((_, index) => (
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
