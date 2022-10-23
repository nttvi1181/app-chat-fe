import React from "react";
import Styles from "./style.module.scss";
import { Avatar } from "antd";
import ImageAvatar from "@/components/common/imageAvatar/ImageAvatar";
import { AiOutlineCloud, AiOutlineSetting } from "react-icons/ai";
import { CgToolbox } from "react-icons/cg";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { HiOutlineCheck } from "react-icons/hi";

function NavUser() {
  return (
    <div className={Styles.main}>
      <div className={Styles.avatar}>
        <Avatar size={54} icon={<ImageAvatar />} />
        <div className={Styles.listIcons}>
          <BiMessageRoundedDetail color="white" size={40} />
          <TiContacts color="white" size={40} style={{ marginRight: "5px" }} />
          <div className={Styles.success}>
            <HiOutlineCheck color="white" size={33} />
          </div>
        </div>
      </div>
      <div className={Styles.listIcons}>
        <AiOutlineCloud color="white" size={40} />
        <CgToolbox color="white" size={40} />
        <AiOutlineSetting color="white" size={40} />
      </div>
    </div>
  );
}

export default NavUser;
