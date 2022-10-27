import React from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";

function SettingPopup() {
  return (
    <Container>
      {" "}
      <FlexItem>
        <AiOutlineUser />
        <TextAlign>Thông tin tài khoản</TextAlign>
      </FlexItem>
      <FlexItem>
        <GrLanguage />
        <TextAlign>Ngôn ngữ</TextAlign>
      </FlexItem>
      <FlexItem>
        <BiLogOut />
        <TextAlign>Đăng xuất</TextAlign>
      </FlexItem>
    </Container>
  );
}

const FlexItem = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 150px;
`;
const TextAlign = styled.div`
  margin-left: 10px;
`;

export default SettingPopup;
