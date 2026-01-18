"use client";
import { SOCKET_BASE_URL } from "@/data/constants";
import { SOCKET_EVENTS } from "@/data/usage";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, access_token: token } = useSelector(
    (state: any) => state.authReducer
  );
  console.log("SocketProvider Socket:", socketRef);
  useEffect(() => {
    if (socketRef.current?.connected) {
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Initialize socket
    const socket = io(SOCKET_BASE_URL || "", {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,

      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection handlers
    socket.on(SOCKET_EVENTS.ON.CONNECT, () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      socket.emit(SOCKET_EVENTS.EMIT.USER_JOIN, { userId: user._id });
    });

    socket.on(SOCKET_EVENTS.ON.DISCONNECT, (reason: string) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    socket.on(SOCKET_EVENTS.ON.CONNECT_ERROR, (error: any) => {
      console.warn("Socket connection error:", error);
      setIsConnected(false);
    });

    socketRef.current = socket;

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [user?._id, token]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    console.error("useSocket must be used within SocketProvider");
    // throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};
