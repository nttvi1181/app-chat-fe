import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "@/page/login/Login";
import Register from "@page/register/Register";
import NavUser from "./page/layouts/navUser/NavUser";
import Home from "@/page/home/Home";

function Main() {
  const user = localStorage.getItem("user");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <NavUser />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
