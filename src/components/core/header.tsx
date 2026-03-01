"use client";

import { FC, useState, useRef, useEffect } from "react";
import { Menu, Bell, ChevronRight, Home, Check } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { imageUrl } from "@/data/constants";
import { Avatar } from "@/components/core/avatar";
import { IUser } from "@/types/system/slice";
import { HeaderProps } from "@/types/components/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Dummy user (swap with Redux selector) ────────────────────────────────────

// ─── Dummy notifications ──────────────────────────────────────────────────────

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New user registered",
    body: "Alex joined the platform.",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    title: "Report ready",
    body: "Your Q3 export is complete.",
    time: "18m ago",
    read: false,
  },
  {
    id: "3",
    title: "Payment received",
    body: "$1,200 from Acme Corp.",
    time: "1h ago",
    read: true,
  },
  {
    id: "4",
    title: "Server alert",
    body: "CPU usage above 85%.",
    time: "3h ago",
    read: true,
  },
];

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: seg,
    }));

  return (
    <nav className="flex items-center gap-1" aria-label="Breadcrumb">
      <Home
        size={13}
        style={{ color: "var(--secondary-text-color)", flexShrink: 0 }}
      />
      {segments.map((seg, i) => (
        <span key={seg.href} className="flex items-center gap-1">
          <ChevronRight
            size={11}
            style={{ color: "var(--secondary-text-color)", opacity: 0.5 }}
          />
          <span
            style={{
              fontSize: 12.5,
              fontWeight: i === segments.length - 1 ? 600 : 400,
              color:
                i === segments.length - 1
                  ? "var(--primary-text-color)"
                  : "var(--secondary-text-color)",
              whiteSpace: "nowrap",
            }}
          >
            {seg.label}
          </span>
        </span>
      ))}
    </nav>
  );
}

// ─── Notification panel ───────────────────────────────────────────────────────

function NotificationPanel({
  notifications,
  onMarkAllRead,
  onClose,
}: {
  notifications: Notification[];
  onMarkAllRead: () => void;
  onClose: () => void;
}) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div
      className="flex flex-col"
      style={{
        width: 320,
        background: "var(--card)",
        border: "1px solid var(--field-border)",
        borderRadius: "var(--global-radius)",
        boxShadow: "0 8px 32px oklch(0% 0 0 / 0.12)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--field-border)" }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: "var(--primary-text-color)",
            }}
          >
            Notifications
          </span>
          {unread > 0 && (
            <span
              className="flex items-center justify-center rounded-full text-white"
              style={{
                fontSize: 10,
                fontWeight: 700,
                minWidth: 18,
                height: 18,
                padding: "0 5px",
                background: "var(--primary-color)",
              }}
            >
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-1"
            style={{
              fontSize: 11.5,
              color: "var(--primary-color)",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            <Check size={11} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 320 }}>
        {notifications.length === 0 ? (
          <div
            className="flex items-center justify-center py-10"
            style={{ color: "var(--secondary-text-color)", fontSize: 13 }}
          >
            All caught up!
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors duration-150"
              style={{
                borderBottom: "1px solid var(--field-border)",
                background: n.read
                  ? "transparent"
                  : "oklch(0.62 0.22 275 / 0.04)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "oklch(0.62 0.22 275 / 0.07)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = n.read
                  ? "transparent"
                  : "oklch(0.62 0.22 275 / 0.04)")
              }
            >
              {/* Unread dot */}
              <div className="flex-shrink-0 mt-1.5">
                <div
                  className="rounded-full"
                  style={{
                    width: 7,
                    height: 7,
                    background: n.read ? "transparent" : "var(--primary-color)",
                    border: n.read ? "1.5px solid var(--field-border)" : "none",
                  }}
                />
              </div>

              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: n.read ? 400 : 600,
                    color: "var(--primary-text-color)",
                  }}
                >
                  {n.title}
                </span>
                <span
                  style={{ fontSize: 12, color: "var(--secondary-text-color)" }}
                  className="truncate"
                >
                  {n.body}
                </span>
              </div>

              <span
                style={{
                  fontSize: 11,
                  color: "var(--secondary-text-color)",
                  flexShrink: 0,
                }}
              >
                {n.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

const Header: FC<HeaderProps> = ({ isMobileView, onMobileSidebarToggle }) => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // close notif panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <aside
      className="w-full flex items-center gap-3 px-3"
      style={{
        height: 48,
        background: "var(--header-bg)",
        boxShadow: "var(--header-shadow)",
        border: "1px solid var(--header-border)",
        borderRadius: "var(--header-radius)",
      }}
    >
      {/* ── Left: hamburger (mobile) + breadcrumb ── */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {isMobileView && (
          <button
            onClick={onMobileSidebarToggle}
            aria-label="Toggle sidebar"
            className="flex-shrink-0 flex items-center justify-center rounded-lg transition-colors duration-150"
            style={{
              width: 32,
              height: 32,
              background: "none",
              border: "1px solid var(--field-border)",
              cursor: "pointer",
              color: "var(--primary-text-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "oklch(0.62 0.22 275 / 0.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <Menu size={15} strokeWidth={2} />
          </button>
        )}

        <Breadcrumb />
      </div>

      {/* ── Right: notifications + theme + user ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((p) => !p)}
            aria-label="Notifications"
            className="relative flex items-center justify-center rounded-lg transition-colors duration-150"
            style={{
              width: 32,
              height: 32,
              background: notifOpen ? "oklch(0.62 0.22 275 / 0.1)" : "none",
              border: "1px solid var(--field-border)",
              cursor: "pointer",
              color: "var(--primary-text-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "oklch(0.62 0.22 275 / 0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = notifOpen
                ? "oklch(0.62 0.22 275 / 0.1)"
                : "none")
            }
          >
            <Bell size={15} strokeWidth={2} />
            {unreadCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full text-white"
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  minWidth: 15,
                  height: 15,
                  padding: "0 3px",
                  background: "var(--primary-color)",
                  top: -4,
                  right: -4,
                  border: "2px solid var(--header-bg)",
                  lineHeight: 1,
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <div
              className="absolute right-0 mt-2"
              style={{ zIndex: 9999, top: "100%" }}
            >
              <NotificationPanel
                notifications={notifications}
                onMarkAllRead={markAllRead}
                onClose={() => setNotifOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div
          className="flex-shrink-0"
          style={{
            width: 1,
            height: 20,
            background: "var(--field-border)",
          }}
        />

        {/* User chip */}
        {user && (
          <div className="flex items-center gap-2">
            <Avatar
              src={user.photo ? imageUrl(user.photo) : null}
              alt={user.name}
              fallback={user?.name}
              size={28}
              isOnline={user.isOnline}
            />
            {!isMobileView && (
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--primary-text-color)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--secondary-text-color)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.role}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Header;
