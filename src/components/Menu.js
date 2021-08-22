import React from "react";
import Routes from "@/constants/routes";
import { useAuth } from "@/lib/auth";
import NavigationMenu from "@/components/NavigationMenu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CommentIcon from "@material-ui/icons/Comment";
import PeopleIcon from "@material-ui/icons/People";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ViewListIcon from "@material-ui/icons/ViewList";

const menuProfile = [
  {
    text: "Perfil",
    to: Routes.PROFILE,
    icon: <AccountCircleIcon />,
  },
];

const menuAdminItems = [
  {
    text: "Blog",
    to: Routes.ADMINBLOG,
    icon: <CommentIcon />,
  },
  {
    text: "Afiliados",
    to: Routes.AFFILIATES,
    icon: <PeopleIcon />,
  },
  {
    text: "Socios",
    to: Routes.PARTNERS,
    icon: <SupervisedUserCircleIcon />,
  },
  {
    text: "Citas",
    to: Routes.APPOINTMENTS,
    icon: <DateRangeIcon />,
  },
];

const menuPartnerItems = [
  {
    text: "Servicios",
    to: Routes.PARTNER_SERVICES,
    icon: <ViewListIcon />,
  },
  {
    text: "Citas",
    to: Routes.PARTNER_APPOINTMENTS,
    icon: <DateRangeIcon />,
  },
];

const menuAffiliateItems = [
  {
    text: "Citas",
    to: Routes.AFFILIATES_APPOINTMENTS,
    icon: <DateRangeIcon />,
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
