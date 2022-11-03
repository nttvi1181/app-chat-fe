import { Avatar } from "antd";
import React from "react";

type Props = {
  className?: string;
  style?: any;
  src: string | undefined;
  size: number;
};

const CustomAvatar = ({ className, style = {}, src, size = 28 }: Props) => {
  return (
    <Avatar
      className={className}
      style={style}
      size={size}
      src={src || "/avatar-default.png"}
    />
  );
};

export default CustomAvatar;
