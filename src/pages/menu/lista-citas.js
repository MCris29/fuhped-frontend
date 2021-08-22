import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import PartnerAppointment from "@/components/PartnerAppointment";

const PagePartnerAppointment = () => {
  const partnerAppointment = <PartnerAppointment />;

  return (
    <>
      <Menu page={partnerAppointment} />
    </>
  );
};

export default withAuth(PagePartnerAppointment);
