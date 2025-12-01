export interface SidebarSkeletonProps {
  heading?: string;
  children?: React.ReactNode;
}
export interface RoutesInterface {
  path: string;
  title: string;
  icon?: React.ReactNode; // optional, can be a string or an actual icon component
  sub?: RoutesInterface[]; // for nested routes
}
export interface HeaderProps {
  title?: string;
  isMobileView?: boolean;
  onMobileSidebarToggle?: () => void;
}
export interface SidebarProps {
  isMobileView: boolean;
}
