import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import React from "react";
import Styles from "./style.module.scss";
import Avatar from "../../assets/images/dejong.jpg";
import ContactItem from "./ContactItem";
import { Profile } from "@/interfaces/user";
import useProfile from "@/hooks/useProfile";
import { createConversationId } from "@/utils/helper";
import useChatDetail from "@/hooks/useChatDetail";
import useUi from "@/hooks/useUi";

type Props = {
  data: Array<Profile>;
};

const Contacts = ({ data }: Props) => {
  const { currentUser } = useProfile();
  const { setChatDetailInfo } = useChatDetail();
  const { setCurrentPage } = useUi();

  const handleClickContactItem = (profile: Profile) => {
    if (!currentUser) return;
    const conversation_id = createConversationId([
      currentUser._id,
      profile._id,
    ]);
    const data = {
      conversation_info: {
        conversation_id: conversation_id,
        origin_conversation_id: null,
        conversation_name: profile?.username,
        conversation_avatar: [profile?.avatar_url],
        conversation_members: [currentUser._id, profile._id],
      },
      list_messages: [],
    };
    setChatDetailInfo(data);
    setCurrentPage("CHAT");
  };

  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <div>
        {data
          ?.filter((pr) => pr._id !== currentUser?._id)
          ?.map((profile) => (
            <ContactItem
              key={profile._id}
              profile={profile}
              onClick={handleClickContactItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Contacts;
