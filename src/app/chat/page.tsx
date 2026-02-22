import RenderChat from "@/components/core/chat";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";

function Chat() {
  return (
    <SidebarSkeleton>
      <RenderChat />
    </SidebarSkeleton>
  );
}

export default Chat;
