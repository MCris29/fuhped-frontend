import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import PartnertList from "@/components/PartnertList";

const PagePartners = () => {
  const partnertList = <PartnertList />;

  return (
    <>
      <Menu page={partnertList} />
    </>
  );
};

export default withAuth(PagePartners);
