import { RoutesInterface } from "@/types/components/sidebar";
import { File, Folder, Home, Layers } from "lucide-react";

const Routes: RoutesInterface[] = [
  {
    title: "Example",
    path: "/",
    icon: <Home />,
    sub: [
      {
        title: "Example1",
        path: "/example1",
        icon: <File />,
      },
      {
        title: "Example2",
        path: "/example2",
        icon: <File />,
        sub: [
          {
            title: "Example1",
            path: "/example1",
            icon: <File />,
          },
          {
            title: "Example2",
            path: "/example2",
            icon: <File />,
          },
        ],
      },
    ],
  },
  {
    title: "Example3",
    path: "/example3",
    icon: <Folder />,
  },
  {
    title: "Example4",
    path: "/example4",
    icon: <Layers />,
  },
];

export default Routes;
