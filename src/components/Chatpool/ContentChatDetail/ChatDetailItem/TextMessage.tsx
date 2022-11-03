import React from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { getUrlLinks, setURL } from "@/utils/helper";
import style from "./style.module.scss";
import clsx from "clsx";
type Props = {
  isOwner: boolean;
  content: string;
  isHeaderMessageOfBlock?: boolean;
  isFinalMessageOfBlock?: boolean;
};

const TextMessage = ({
  isOwner,
  content,
  isHeaderMessageOfBlock,
  isFinalMessageOfBlock,
}: Props) => {
  const links = getUrlLinks(content || "");
  let className = "";
  if (isOwner) {
    className = " rounded-l-2xl ";
    if (isHeaderMessageOfBlock) {
      className += " rounded-br-2xl ";
    }

    if (isFinalMessageOfBlock) {
      className += " rounded-tr-2xl ";
    }
  } else {
    className = " rounded-r-2xl ";
    if (isHeaderMessageOfBlock) {
      className += " rounded-bl-2xl ";
    }

    if (isFinalMessageOfBlock) {
      className += " rounded-tl-2xl ";
    }
  }
  return (
    <div
      className={className}
      style={{
        minHeight: 36,
        padding: "8px 12px",
        backgroundColor: !isOwner ? "#e4e6eb" : "#0084ff",
        color: !isOwner ? "#050505" : "#fff",
        whiteSpace: "pre-wrap",
      }}
    >
      <span
        className={style.content_text_massage}
        dangerouslySetInnerHTML={{ __html: setURL(content || "") }}
      />
      {links.length > 0 && <LinkPreview url={links[0]} imageHeight={100} />}
    </div>
  );
};

export default TextMessage;
