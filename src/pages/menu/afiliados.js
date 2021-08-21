import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import AffiliatesList from "@/components/AffiliatesList";

const PageAffiliates = () => {
  const affiliatesList = <AffiliatesList />;

  return (
    <>
      <Menu page={affiliatesList} />
    </>
  );
};

export default withAuth(PageAffiliates);
