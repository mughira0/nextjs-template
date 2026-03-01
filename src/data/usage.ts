import { ColumnDef } from "@/types/components/table";

export const SOCKET_EVENTS = {
  EMIT: {
    USER_JOIN: "user:join",
    ROOM_JOIN: "room:join",
    ROOM_LEAVE: "room:leave",
    USER_TYPING: "user:typing",
    STOP_TYPING: "user:stop_typing",
    SEND_MESSAGE: "message:send",
    MESSAGE_READ: "message:read",
  },

  ON: {
    NEW_MESSAGE: "message:new",
    NEW_ROOM: "room:new",
    USER_TYPING: "user:typing",
    USER_STOP_TYPING: "user:stop_typing",
    ONLINE_USERS: "users:online",
    MESSAGE_READ: "message:read_receipt",
    USER_CONNECTED: "user:connected",
    USER_DISCONNECTED: "user:disconnected",

    CONNECT: "connect",
    DISCONNECT: "disconnect",
    CONNECT_ERROR: "connect_error",
  },
};
export const CHAT_VIEW_STATE = {
  EXPAND: "expand",
  ROOMS: "rooms",
  CHAT: "chat",
};

export const transactionHeader: ColumnDef[] = [
  { label: "Transaction ID", value: "id" },
  { label: "User", value: "user" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status", align: "center" },
  { label: "Date", value: "date" },
];

export const teamsHeader: ColumnDef[] = [
  { label: "Team", value: "name" },
  { label: "Members", value: "members" },
  { label: "Created By", value: "createdBy" },
  { label: "Created At", value: "createdAt" },
  { label: "Status", value: "isActive" },
  { label: "Actions", value: "actions", align: "center", width: "120px" },
];
