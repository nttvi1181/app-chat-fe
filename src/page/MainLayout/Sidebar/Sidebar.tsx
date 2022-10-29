import React from "react";
import { Avatar, Layout, Popover } from "antd";
import Styles from "./style.module.scss";
import ImageAvatar from "../../../components/common/imageAvatar/ImageAvatar";

import { AiOutlineCloud, AiOutlineSetting } from "react-icons/ai";
import { CgToolbox } from "react-icons/cg";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { TiContacts } from "react-icons/ti";
import { HiOutlineCheck } from "react-icons/hi";
import SettingPopup from "../../../components/settingPopup/SettingPopup";
import useUi from "@/hooks/useUi";

const { Header, Footer, Sider, Content } = Layout;
type Props = {};

const Sidebar = (props: Props) => {
  const { setCurrentPage } = useUi();

  return (
    <Sider width={150}>
      <div className={Styles.main}>
        <div className={Styles.avatar}>
          <Avatar size={54} icon={<ImageAvatar />} />
          <div className={Styles.listIcons}>
            <BiMessageRoundedDetail
              color="white"
              size={30}
              onClick={() => setCurrentPage("CHAT")}
            />
            <TiContacts
              color="white"
              size={30}
              style={{ marginRight: "5px" }}
              onClick={() => setCurrentPage("CONTACT")}
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
    </Sider>
  );
};

export default Sidebar;
