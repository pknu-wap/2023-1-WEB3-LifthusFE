import React from "react";
import { Routes, Route } from "react-router-dom";

import ErrorPage from "../common/components/ErrorPage";

import useUserStore from "../store/user.zustand";
import BottomNav from "./BottomNav";
import Profile from "./profile/Profile";

const Main = () => {
  const user_id = useUserStore((state) => state.user_id);
  const registered = false;
  return (
    // Main page(signed in)
    <React.Fragment>
      {/*registered === false && <Navigate to="/register" />*/}
      <BottomNav />
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="group" element={<div>group</div>} />
        <Route path="training" element={<div>training</div>} />
        <Route path="statistics" element={<div>statistics</div>} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/userinfo" element={<div>PROFILE/USERINFO</div>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default Main;