import React from "react";
import { Outlet } from "react-router-dom";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout as ToolpadDashboardLayout } from "@toolpad/core/DashboardLayout";

import { NAVIGATION } from "./Navigation";

import FF from "@/assets/FF.png";

import theme from "@/theme";


const DashboardLayout = () => {
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={theme}
      branding={{ 
        title: "FutFriend",
        logo: false,
      }}
    >
      <ToolpadDashboardLayout>
        <Outlet />
      </ToolpadDashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayout;
