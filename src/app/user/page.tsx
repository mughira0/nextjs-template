"use client";

import Button from "@/components/core/button";
import Popper from "@/components/core/popper";
import SearchInput from "@/components/core/search-input";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";
import TableStructure from "@/components/core/table";
import { users } from "@/data/dummy";
import { ColumnDef, TableRow } from "@/types/components/table";
import { IUser } from "@/types/system/slice";
import { Filter, Pencil, Plus, Shield, Trash2, User } from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type SortDirection = "asc" | "desc";
interface SortState {
  key: string | null;
  dir: SortDirection;
}

// ─── Cell components ──────────────────────────────────────────────────────────
const ROLE_META = {
  admin: { bg: "oklch(92% 0.06 275)", color: "oklch(30% 0.18 275)" },
  manager: { bg: "oklch(94% 0.06 200)", color: "oklch(32% 0.16 200)" },
  user: { bg: "oklch(94% 0.04 260)", color: "oklch(34% 0.08 260)" },
  viewer: { bg: "oklch(94% 0.03 100)", color: "oklch(36% 0.10 100)" },
};

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0"
      style={{
        background: `oklch(85% 0.12 ${hue})`,
        color: `oklch(28% 0.15 ${hue})`,
      }}
    >
      {initials}
    </span>
  );
}

function UserCell({ user }: { user: IUser }) {
  return (
    <span className="inline-flex items-center gap-2.5 min-w-0">
      <Avatar name={user.name} />
      <span
        className="truncate font-medium"
        style={{ color: "oklch(18% 0.02 260)" }}
      >
        {user.name}
      </span>
    </span>
  );
}

function RoleBadge({ role }: { role: IUser["role"] }) {
  const m = ROLE_META?.["admin"]!;
  return (
    <span
      className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
      style={{ background: m.bg, color: m.color }}
    >
      {role}
    </span>
  );
}

function StatusDot({ isOnline }: { isOnline: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="w-2 h-2 rounded-full"
        style={{
          background: isOnline ? "oklch(62% 0.2 145)" : "oklch(70% 0.01 260)",
        }}
      />
      <span
        className="text-xs"
        style={{
          color: isOnline ? "oklch(40% 0.18 145)" : "oklch(55% 0.02 260)",
        }}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </span>
  );
}

const PAGE_SIZE = 5;

export default function UsersPage() {
  const [userData, setUserData] = useState<IUser[]>(users);
  const [sort, setSort] = useState<SortState>({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let list = [...userData];

    return list;
  }, [userData, search, roleFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageSlice = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const header: ColumnDef[] = [
    {
      label: "User",
      value: "name",
      sortable: true,
    },
    { label: "Email", value: "email", sortable: true },
    { label: "Role", value: "role", sortable: true },
    { label: "Phone", value: "phone" },
    { label: "Status", value: "status" },
    { label: "Actions", value: "actions", align: "center" },
  ];

  const tableData: TableRow[] = pageSlice.map((u) => ({
    ...u,
    role: <RoleBadge role={u.role} />,

    status: <StatusDot isOnline={u.isOnline!} />,
    actions: (
      <Popper
        items={[
          { label: "Delete", value: "delete", icon: <Trash2 size={14} /> },
          {
            label: "Edit",
            icon: <Pencil size={14} />,
            value: "edit",
          },
        ]}
        onClick={(item) => {}}
      />
    ),
  }));

  const tableActions = (
    <>
      <SearchInput
        onSearch={(query) => {
          setSearch(query);
          setPage(1);
        }}
        defaultValue=""
        placeholder="Search users..."
      />
      <Button variant="primary" size="sm">
        Add User
        <Plus size={14} />
      </Button>
      <Popper
        items={[
          { label: "Customer", value: "filter", icon: <User size={14} /> },
          {
            label: "Admin",
            icon: <Shield size={14} />,
            value: "export",
          },
        ]}
      >
        <Button variant="ghost" size="sm">
          Filter <Filter size={14} />
        </Button>
      </Popper>
    </>
  );

  return (
    <SidebarSkeleton>
      <div className="">
        <TableStructure
          header={header}
          data={tableData}
          headerTitle={
            "Users" /* You can also add a title above the table, or remove this prop for no title */
          }
          actions={tableActions}
          sort={sort}
          setSort={(s) => {
            setSort(s);
            setPage(1);
          }}
          page={currentPage}
          totalPages={totalPages}
          setPage={(p) => {
            setPage(p);
            setSelectedIndex(undefined);
          }}
          customeBodyStyle={{ maxHeight: "400px" }}
          minHeight="200px"
          noDataText="No users match your search."
          loading={loading}
          skeletonRows={5}
        />
      </div>
    </SidebarSkeleton>
  );
}
