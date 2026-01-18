"use client";
import { Get, Post } from "@/axios";
import Button from "@/components/core/button";
import SidebarSkeleton from "@/components/core/sidebarSkeleton";
import { baseUrl } from "@/data/constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AllUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, access_token } = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const url = baseUrl("users");
    setLoading(true);
    const res: any = await Get(url, access_token);

    setUsers(res.data?.data?.users || []);
    setLoading(false);
  };

  const handleStartChat = async (userId: string) => {
    const res = await Post(
      baseUrl("rooms/create"),
      {
        members: [user._id, userId],
      },
      access_token
    );
  };
  if (loading) return <p>Loading users...</p>;

  return (
    <SidebarSkeleton>
      <div style={{ padding: "20px" }}>
        <h2>All Users</h2>

        {users.length === 0 && <p>No users found</p>}

        <div style={gridStyle}>
          {users.map((user) => (
            <div key={user._id} style={cardStyle}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <span style={roleStyle}>{user.role}</span>
              <Button onClick={() => handleStartChat(user._id)}>
                Start Chat
              </Button>
            </div>
          ))}
        </div>
      </div>
    </SidebarSkeleton>
  );
}

/* ---------------- styles ---------------- */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "16px",
  marginTop: "20px",
};

const cardStyle = {
  padding: "16px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#fff",
};

const roleStyle = {
  display: "inline-block",
  marginTop: "8px",
  padding: "4px 8px",
  background: "#eee",
  borderRadius: "4px",
  fontSize: "12px",
};
