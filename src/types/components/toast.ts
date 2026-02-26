export interface ToasterProps {
  position?: ToastPosition;
  maxVisible?: number;
}
export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}
export type ToastVariant = "success" | "error" | "warning";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastCardProps {
  toast: ToastItem;
  position: ToastPosition;
  index: number;
}
