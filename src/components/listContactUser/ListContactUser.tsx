import React from "react";
import Styles from "./style.module.scss";
import SearchUserChat from "@/components/searchUserChat/SearchUserChat";
import Avatar from "../../assets/images/dejong.jpg";

function ListContactUser() {
  return (
    <div className={Styles.main}>
      <SearchUserChat />
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Kun</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Vũ xinh gái</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thị Vũ</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
      <div className={Styles.listItem}>
        <div className={Styles.img}>
          <img src={Avatar} alt="" />
        </div>
        <div>
          <div className={Styles.nameChat}>Thoại Nguyễn</div>
        </div>
      </div>
    </div>
  );
}

export default ListContactUser;
