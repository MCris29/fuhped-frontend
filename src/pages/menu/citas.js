import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import AppointmentList from "@/components/AppointmentList";

const PageAppointments = () => {
  const appointmentList = <AppointmentList />;

  return (
    <>
      <Menu page={appointmentList} />
    </>
  );
};

export default withAuth(PageAppointments);
