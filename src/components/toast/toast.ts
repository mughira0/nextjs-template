import {
  ToastItem,
  ToastPosition,
  ToastVariant,
} from "@/types/components/toast";

type Listener = (toasts: ToastItem[]) => void;

let _toasts: ToastItem[] = [];
let _listeners: Listener[] = [];

const notify = () => _listeners.forEach((l) => l([..._toasts]));

const add = (
  message: string,
  variant: ToastVariant,
  duration = 3500,
): string => {
  const id = Math.random().toString(36).slice(2);
  _toasts = [{ id, message, variant, duration }, ..._toasts];
  notify();
  if (duration > 0) setTimeout(() => remove(id), duration);
  return id;
};

export const remove = (id: string) => {
  _toasts = _toasts.filter((t) => t.id !== id);
  notify();
};

export const subscribe = (listener: Listener) => {
  _listeners.push(listener);
  listener([..._toasts]);
  return () => {
    _listeners = _listeners.filter((l) => l !== listener);
  };
};
export const isBottom = (p: ToastPosition) => p.startsWith("bottom");

export const toast = {
  success: (message: string, duration?: number) =>
    add(message, "success", duration),
  error: (message: string, duration?: number) =>
    add(message, "error", duration),
  warning: (message: string, duration?: number) =>
    add(message, "warning", duration),
  dismiss: (id: string) => remove(id),
};
