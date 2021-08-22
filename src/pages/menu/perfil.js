import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import FormProfile from "@/components/FormProfile";

const PageBlog = () => {
  return (
    <>
      <Menu page={<FormProfile />} />
    </>
  );
};

export default withAuth(PageBlog);
