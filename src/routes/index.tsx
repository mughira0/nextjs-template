import { RoutesInterface } from "@/types/components/sidebar";
import { File, Home } from "lucide-react";

const Routes: RoutesInterface[] = [
  {
    title: "Example",
    path: "/",
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
    title: "Chart Example",
    path: "/chart",
    icon: <File />,
  },

  {
    title: "Users",
    path: "/users",
    icon: <File />,
  },
];

export default Routes;
