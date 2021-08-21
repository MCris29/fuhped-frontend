import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import Profile from "@/components/Profile";

const PageProfile = () => {
  return (
    <>
      <Menu />
      <Profile />
    </>
  );
};

export default withAuth(PageProfile);
