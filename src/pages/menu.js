import React from "react";
import withAuth from "../hocs/withAuth";
import { useAuth } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import AdminMenu from "@/components/AdminMenu";
import PartnerMenu from "@/components/PartnerMenu";
import AffiliateMenu from "@/components/AffiliateMenu";

const Menu = () => {
  const { user } = useAuth();

  return (
    <>
      <Navigation />
      <div>
        {(() => {
          switch (user.role) {
            case "ROLE_ADMIN":
              return <AdminMenu />;

            case "ROLE_PARTNER":
              return <PartnerMenu />;

            case "ROLE_AFFILIATE":
              return <AffiliateMenu />;
          }
        })()}
      </div>
    </>
  );
};

export default withAuth(Menu);
