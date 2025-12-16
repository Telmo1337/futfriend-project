
import { Outlet } from "react-router-dom";

import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout as ToolpadDashboardLayout } from "@toolpad/core/DashboardLayout";


import { NAVIGATION } from "./Navigation";
import theme from "@/theme";


import SidebarFooter from "./components/SidebarFooter";


const DashboardLayout = () => {
  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      theme={theme}
      colorSchemeStorageKey="futfriend-color"
      branding={{
        title: "FutFriend",
        logo: false,
      }}


    >
      <ToolpadDashboardLayout
        slots={{
          sidebarFooter: SidebarFooter,
        }}
      >
        <Outlet />
      </ToolpadDashboardLayout>
    </ReactRouterAppProvider>
  );
};

export default DashboardLayout;