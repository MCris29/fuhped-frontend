import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import AppointmentListAffiliate from "@/components/AppointmentListAffiliate";

const PageAffiliateAppointment = () => {
  const appointmentListAffiliate = <AppointmentListAffiliate />;

  return (
    <>
      <Menu page={appointmentListAffiliate} />
    </>
  );
};

export default withAuth(PageAffiliateAppointment);
