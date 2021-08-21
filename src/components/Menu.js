import React from "react";
import Routes from "@/constants/routes";
import { useAuth } from "@/lib/auth";
import NavigationMenu from "@/components/NavigationMenu";

const menuProfile = [
  {
    text: "Perfil",
    to: Routes.PROFILE,
  },
];

const menuAdminItems = [
  {
    text: "Blog",
    to: Routes.ADMINBLOG,
  },
  {
    text: "Afiliados",
    to: Routes.AFFILIATES,
  },
  {
    text: "Socios",
    to: Routes.PARTNERS,
  },
  {
    text: "Citas",
    to: Routes.APPOINTMENTS,
  },
];

const menuPartnerItems = [
  {
    text: "Servicios",
    to: Routes.PARTNER_SERVICES,
  },
  {
    text: "Citas",
    to: Routes.PARTNER_APPOINTMENTS,
  },
];

const menuAffiliateItems = [
  {
    text: "Citas",
    to: Routes.AFFILIATES_APPOINTMENTS,
  },
];

const Menu = (prop) => {
  const { user } = useAuth();

  return (
    <>
      <div>
        {(() => {
          switch (user.role) {
            case "ROLE_ADMIN":
              return (
                <NavigationMenu
                  page={prop.page}
                  menuProfile={menuProfile}
                  menuItems={menuAdminItems}
                />
              );

            case "ROLE_PARTNER":
              return (
                <NavigationMenu
                  page={prop.page}
                  menuProfile={menuProfile}
                  menuItems={menuPartnerItems}
                />
              );

            case "ROLE_AFFILIATE":
              return (
                <NavigationMenu
                  page={prop.page}
                  menuProfile={menuProfile}
                  menuItems={menuAffiliateItems}
                />
              );
          }
        })()}
      </div>
    </>
  );
};

export default Menu;
