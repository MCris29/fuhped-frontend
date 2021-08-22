import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import AffiliateList from "@/components/AffiliateList";

const PageAffiliates = () => {
  const affiliateList = <AffiliateList />;

  return (
    <>
      <Menu page={affiliateList} />
    </>
  );
};

export default withAuth(PageAffiliates);
