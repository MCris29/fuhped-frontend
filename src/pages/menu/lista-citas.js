import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import AppointmentListPartner from "@/components/AppointmentListPartner";

const PagePartnerAppointment = () => {
  const appointmentListPartner = <AppointmentListPartner />;

  return (
    <>
      <Menu page={appointmentListPartner} />
    </>
  );
};

export default withAuth(PagePartnerAppointment);
