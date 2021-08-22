import React from "react";
import withAuth from "@/hocs/withAuth";
import Menu from "@/components/Menu";
import ServicesList from "@/components/ServicesList";

const PageServices = () => {
  const servicesList = <ServicesList />;

  return (
    <>
      <Menu page={servicesList} />
    </>
  );
};

export default withAuth(PageServices);
