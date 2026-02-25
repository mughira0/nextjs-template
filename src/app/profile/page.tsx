"use client";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";
import Tabs, { TabPanel } from "@/components/core/tabs";
import { BarChart } from "lucide-react";

function Profile() {
  return (
    <SidebarSkeleton>
      <Tabs
        variant="primary"
        tabs={[
          {
            label: "Profile",
            value: "profile",
            icon: <BarChart size={14} />,
          },
          { label: "Settings", value: "settings" },
        ]}
        onChange={(v) => console.log(v)}
      >
        <TabPanel value="profile">Profile content</TabPanel>
        <TabPanel value="settings">Settings content</TabPanel>
      </Tabs>
      <Tabs
        variant="secondary"
        tabs={[
          {
            label: "Profile",
            value: "profile",
            icon: <BarChart size={14} />,
          },
          { label: "Settings", value: "settings" },
        ]}
        onChange={(v) => console.log(v)}
      >
        <TabPanel value="profile">Profile content</TabPanel>
        <TabPanel value="settings">Settings content</TabPanel>
      </Tabs>
    </SidebarSkeleton>
  );
}

export default Profile;
