import SidebarSkeleton from "@/components/core/sidebarSkeleton";
import RenderChat from "@/components/core/chat";
import React from "react";

function Chat() {
  return (
    <SidebarSkeleton>
      <RenderChat />
    </SidebarSkeleton>
  );
}

export default Chat;
