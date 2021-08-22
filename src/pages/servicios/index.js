import React from "react";
import PageServicesList from "@/components/PageServicesList";
import Navigation from "@/components/Navigation";
import NavItems from "@/components/NavItems";
import NavItemsMobile from "@/components/NavItemsMobile";

const servicios = () => {
  const navItems = <NavItems />;
  const navItemsMobile = <NavItemsMobile />;

  return (
    <>
      <Navigation navItems={navItems} navItemsMobile={navItemsMobile} />
      <PageServicesList />
    </>
  );
};

export default servicios;
