import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import BlogList from "@/components/BlogList";

const PageBlog = () => {
  const blogList = <BlogList />;

  return (
    <>
      <Menu page={blogList} />
    </>
  );
};

export default withAuth(PageBlog);
