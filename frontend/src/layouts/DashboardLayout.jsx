
import { Outlet} from "react-router-dom";

import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout as ToolpadDashboardLayout } from "@toolpad/core/DashboardLayout";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";

import { NAVIGATION } from "./Navigation";
import theme from "@/theme";


import SidebarFooterAccount from "./components/SidebarFooterAccount";

import AuthProviderBridge from "@/components/auth/AuthProvider.jsx";

const DashboardLayout = () => {

  return (
     <AuthProviderBridge>
      {({ session, authentication }) => (
        <ReactRouterAppProvider
          navigation={NAVIGATION}
          theme={theme}
          colorSchemeStorageKey="futfriend-color"
          branding={{
            title: "FutFriend",
            logo: false,
          }}
          session={session}
          authentication={authentication}
        >
          <ToolpadDashboardLayout
            slots={{
              sidebarFooter: SidebarFooterAccount, // Account + SignOutButton
              toolbarActions: () => <ThemeSwitcher />
            }}
          >
            <Outlet />
          </ToolpadDashboardLayout>
        </ReactRouterAppProvider>
      )}
    </AuthProviderBridge>
  );
};

export default DashboardLayout;