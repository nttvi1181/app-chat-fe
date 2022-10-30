import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "@/page/login/Login";
import Register from "@/page/register/Register";
import Home from "@/page/home/Home";
import Socket from "./components/common/Socket";

function Main() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Socket />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
