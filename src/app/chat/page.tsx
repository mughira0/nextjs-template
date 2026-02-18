import { Box } from "@/components/core/box";
import ChatLayout from "@/components/core/chat";
import SidebarSkeleton from "@/components/core/sidebarSkeleton";
import React from "react";

function Chat() {
  return (
    <SidebarSkeleton>
      <ChatLayout />
    </SidebarSkeleton>
  );
}

export default Chat;
