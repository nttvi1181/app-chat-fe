import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./page/login/Login";
import Register from "@/page/register/Register";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
