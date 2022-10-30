import React from "react";
import Styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { MdPhoneIphone } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import CustomInput from "@/components/common/customInput/CustomInput";
import useAuth from "@/hooks/useAuth";

function Register() {
  const { onRegister } = useAuth();
  const formik = useFormik({
    initialValues: {
      phone: "0865132893",
      email: "thoaikun1905@gmail.com",
      confirm_password: "thoai1905",
      password: "thoai1905",
    },
    onSubmit: (values) => {
      onRegister(values);
    },
  });
  return (
    <div className={Styles.main}>
      {" "}
      <div className={`${Styles.headerTitle} mt-40`}>Zalo</div>
      <div className={`${Styles.title} mb-20`}>
        Đăng ký tài khoản Zalo trên Web
      </div>
      <div className={`${Styles.form} mt-20`}>
        <form onSubmit={formik.handleSubmit}>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<MdPhoneIphone size={20} />}
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              // value={formik.values.phone}
              name="phone"
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<AiOutlineMail size={20} />}
              placeholder="Email"
              type="email"
              onChange={formik.handleChange}
              name="email"
              // value={formik.values.password}
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<RiLockPasswordFill size={20} />}
              placeholder="Mật khẩu"
              type="password"
              onChange={formik.handleChange}
              name="password"
              // value={formik.values.password}
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<Si1Password size={20} />}
              placeholder="Xác nhận mật khẩu"
              type="password"
              onChange={formik.handleChange}
              name="confirm_password"
              // value={formik.values.password}
            />
          </div>
          <button className={`${Styles.btn} ${Styles.btnLogin} mb-20`}>
            Đăng ký
          </button>

          <div style={{ textAlign: "center", marginTop: "5px" }}>
            Bạn đã có tài khoản ?<Link to="/login">Đăng nhập </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
