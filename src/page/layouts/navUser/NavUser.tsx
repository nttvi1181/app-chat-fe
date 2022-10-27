import React, { useState } from "react";
import Styles from "./style.module.scss";
import { Avatar, Button, Popover } from "antd";
import ImageAvatar from "@/components/common/imageAvatar/ImageAvatar";
import { AiOutlineCloud, AiOutlineSetting } from "react-icons/ai";
import { CgToolbox } from "react-icons/cg";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { HiOutlineCheck } from "react-icons/hi";
import Chat from "../chat/Chat";
import Contact from "../contact/Contact";
import SettingPopup from "@/components/settingPopup/SettingPopup";

function NavUser() {
  const [chooseItem, setChooseItem] = useState<string>("chat");
  const renderItem = () => {
    switch (chooseItem) {
      case "chat":
        return <Chat />;
      case "contact":
        return <Contact />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <div className={Styles.main}>
        <div className={Styles.avatar}>
          <Avatar size={54} icon={<ImageAvatar />} />
          <div className={Styles.listIcons}>
            <BiMessageRoundedDetail
              color="white"
              size={30}
              onClick={() => {
                setChooseItem("chat");
              }}
            />
            <TiContacts
              color="white"
              size={30}
              style={{ marginRight: "5px" }}
              onClick={() => {
                setChooseItem("contact");
              }}
            />
            <div className={Styles.success}>
              <HiOutlineCheck color="white" size={23} />
            </div>
          </div>
        </div>
        <div className={Styles.listIcons}>
          <AiOutlineCloud color="white" size={30} />
          <CgToolbox color="white" size={30} />
          <Popover content={<SettingPopup />} trigger="click">
            <AiOutlineSetting color="white" size={30} />
          </Popover>
        </div>
      </div>
      <div className={Styles.ContainerRight}>{renderItem()}</div>
    </>
  );
}

export default NavUser;
