import RenderChat from "@/components/core/chat";
import SidebarSkeleton from "@/components/core/sidebarSkeleton";

function Chat() {
  return (
    <SidebarSkeleton>
      <RenderChat />
    </SidebarSkeleton>
  );
}

export default Chat;
