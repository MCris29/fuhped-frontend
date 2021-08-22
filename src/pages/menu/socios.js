import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import PartnertsList from "@/components/PartnertsList";

const PagePartners = () => {
  const partnertsList = <PartnertsList />;

  return (
    <>
      <Menu page={partnertsList} />
    </>
  );
};

export default withAuth(PagePartners);
