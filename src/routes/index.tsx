import { RoutesInterface } from "@/types/components/sidebar";
import {
  File,
  Home,
  LayoutDashboard,
  MessageCircleMore,
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
    title: "Chart Example",
    path: "/chart",
    icon: <File />,
  },

  {
    title: "Chat",
    path: "/chat",
    icon: <MessageCircleMore />,
  },
];

export default Routes;
