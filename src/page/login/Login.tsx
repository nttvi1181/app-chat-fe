import React, { useState } from "react";
import Styles from "./style.module.scss";
import { Tabs, Button } from "antd";
import CustomInput from "@/components/common/customInput/CustomInput";
import { MdPhoneIphone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

function Login() {
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className={Styles.main}>
      <div className={`${Styles.headerTitle} mt-40`}>Zalo</div>
      <div className={Styles.title}>
        Đăng nhập tài khoản Zalo để kết nối với ứng dụng Zalo Web
      </div>
      <div className={`${Styles.form} mt-20`}>
        <Tabs
          defaultActiveKey="1"
          tabBarStyle={{
            width: "100%",
          }}
          size="large"
        >
          <Tabs.TabPane tab="VỚI MÃ QR" key="1">
            Content of Tab Pane 1
          </Tabs.TabPane>
          <Tabs.TabPane tab="VỚI SỐ ĐIỆN THOẠI" key="2">
            <form onSubmit={formik.handleSubmit}>
              <div className={Styles.inputForm}>
                <CustomInput
                  label={<MdPhoneIphone size={20} />}
                  placeholder="Số điện thoại"
                  onChange={formik.handleChange}
                  name="phone"
                />
              </div>
              <div className={Styles.inputForm}>
                <CustomInput
                  label={<RiLockPasswordFill size={20} />}
                  placeholder="Mật khẩu"
                  type="password"
                  onChange={formik.handleChange}
                  name="password"
                />
              </div>
              <div className={`${Styles.btn} ${Styles.btnLogin}`}>
                Đăng nhập với mật khẩu
              </div>
              <div className={`${Styles.btn} ${Styles.btnRequest}`}>
                Gửi yêu cầu đăng nhập
              </div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                Quên mật khẩu ?
              </div>
            </form>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className={Styles.footerNoAccount}>
        Bạn chưa có tài khoản ? <Link to="/test">Đăng ký ngay</Link>
      </div>
    </div>
  );
}

export default Login;
