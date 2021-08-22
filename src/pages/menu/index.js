import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import Navigation from "@/components/Navigation";

const PageMenu = () => {
  return (
    <>
      <Menu />
    </>
  );
};

export default withAuth(PageMenu);
