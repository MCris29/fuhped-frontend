import React from "react";
import { useAuth } from "@/lib/auth";
import AdminMenu from "@/components/AdminMenu";
import PartnerMenu from "@/components/PartnerMenu";
import AffiliateMenu from "@/components/AffiliateMenu";

const Menu = () => {
  const { user } = useAuth();

  return (
    <>
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

export default Menu;
