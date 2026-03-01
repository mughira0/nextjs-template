import { RoutesInterface } from "@/types/components/sidebar";
import {
  File,
  Home,
  LayoutDashboard,
  MessageCircleMore,
  Settings,
  ShieldHalf,
  User,
} from "lucide-react";

const Routes: RoutesInterface[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard />,
  },
  {
    title: "Example",
    path: "/example",
    icon: <Home />,
    // sub: [
    //   {
    //     title: "Example1",
    //     path: "/example1",
    //     icon: <File />,
    //   },
    //   {
    //     title: "Example2",
    //     path: "/example2",
    //     icon: <File />,
    //     sub: [
    //       {
    //         title: "Example1",
    //         path: "/example1",
    //         icon: <File />,
    //       },
    //       {
    //         title: "Example2",
    //         path: "/example2",
    //         icon: <File />,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    title: "Users",
    path: "/user",
    icon: <User />,
  },
  {
    title: "Teams",
    path: "/teams",
    icon: <ShieldHalf />,
  },
  {
    title: "Chart Example",
    path: "/chart",
    icon: <File />,
  },

  {
    title: "Chat",
    path: "/chat",
    icon: <MessageCircleMore />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <Settings />,
  },
];

export default Routes;
