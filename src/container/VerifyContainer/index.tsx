import useProfile from "@/hooks/useProfile";
import withAuth from "@/components/common/WithAuth/WithAuth";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import "./style.css";
import useAuth from "@/hooks/useAuth";
import UserService from "@/services/userApi";

type Props = {};

const TIMEDOWN = 120;

const VerifyContainer = (props: Props) => {
  const { onLogout } = useAuth();
  const [otp, setOtp] = useState("");
  const { currentUser } = useProfile();
  useEffect(() => {}, []);

  const handleGetOtp = async () => {
    try {
      const { data } = await UserService.getOtp();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!otp) return;
      await UserService.verifyOtp({ code: otp });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(OTP: string) {
    setOtp(OTP);
  }
  const showPhone = (phone: string) => {
    const phoneArray = phone.split("");
    phoneArray.splice(phoneArray.length - 4, phoneArray.length, "*", "*", "*","*");
    return phoneArray
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 shadow-lg p-3">
        {/* <div>
          <div className="font-bold text-2xl">Xác minh số điện thoại</div>
          <div className="font-bold mt-4">
            Một mã OTP đã được gửi vào số điện thoại: 034545***
          </div>
        </div> */}
        <div className="mt-5" style={{ backgroundColor: "#2b6350" }}>
          <div className="verifyDiv">
            <p className="p1">Xác minh số điện thoại</p>
            <p className="p2">
              Một mã otp đã được gửi vào số điện thoại{" "}
              {showPhone(currentUser?.phone ?? "")}
            </p>
            <div className="otpElements">
              <p className="p3">Nhập mã:</p>
              <div className="otp mb-4">
                <OTPInput
                  onChange={handleChange}
                  value={otp}
                  inputStyle="inputStyle"
                  numInputs={6}
                  separator={<span></span>}
                />
              </div>
              <p className="p3">Không nhận được mã?</p>
              <div className="flex justify-between w-full">
                <p className="resend cursor-pointer" onClick={handleGetOtp}>
                  Gửi lại
                </p>
                <p className="resend cursor-pointer" onClick={() => onLogout()}>
                  Thoát
                </p>
              </div>
            </div>
            <button
              className="button-verify ml-14"
              type="submit"
              onClick={handleSubmit}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withAuth(VerifyContainer);
