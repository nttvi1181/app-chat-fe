import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

function ListRequestAddFriend() {
  return (
    <ItemContainer>
      <AvatarRequestNews>
        <Avatar size={64} icon={<UserOutlined />} />
        <NameUser>
          Thoại Đz <p>Từ số điện thoại</p>
        </NameUser>
      </AvatarRequestNews>
      <BtnRequest>
        <button>Bỏ qua</button>
        <button>Đồng ý</button>
      </BtnRequest>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: white;
  border: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const BtnRequest = styled.div`
  display: flex;
  button:nth-child(1) {
    color: #0068ff;
  }
  button:nth-child(2) {
    background-color: #0068ff;
    height: 30px;
    width: 56px;
    color: white;
    border-radius: 4px;
    margin: 0px 30px;
  }
`;
const NameUser = styled.div`
  font-size: 18px;
  margin-left: 10px;
  p {
    font-size: 14px;
    color: #394e60;
  }
`;
const AvatarRequestNews = styled.div`
  display: flex;
  margin-left: 40px;
  align-items: center;
`;

export default ListRequestAddFriend;
