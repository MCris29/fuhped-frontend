import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import AffiliateAppointment from "@/components/AffiliateAppointment";

const PageAffiliateAppointment = () => {
  const affiliateAppointment = <AffiliateAppointment />;

  return (
    <>
      <Menu page={affiliateAppointment} />
    </>
  );
};

export default withAuth(PageAffiliateAppointment);
