"use client";

import { Delete, Get, Patch, Post } from "@/axios";
import Button from "@/components/core/button";
import Dropdown from "@/components/core/dropdown";
import Popper from "@/components/core/popper";
import SearchInput from "@/components/core/search-input";
import SidebarSkeleton from "@/components/core/sidebar-skeleton";
import TableStructure from "@/components/core/table";
import Tabs from "@/components/core/tabs";
import { baseUrl, TOTAL_RECORDS } from "@/data/constants";
import { teamsHeader } from "@/data/usage";
import {
  formatDate,
  getTotalCount,
  makeUrlQyeryString,
} from "@/helper/generic";
import CreateUpdateTeamModal from "@/modal/modal-team-create-update";
import UserDecisionModal from "@/modal/modal-user-decision";
import { RootState } from "@/redux/store/store";
import { ITeam, ITeamInput } from "@/types/api/teams";
import { DropdownOption, DropdownProps } from "@/types/components/dropdown";
import { PopperItem } from "@/types/components/popper";
import { Edit, MoreVertical, Trash2, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SingleValue } from "react-select";

export default function TeamsPage() {
  const { access_token } = useSelector(
    (state: RootState) => state?.authReducer,
  );
  const [dropdown, setDropdown] = useState<DropdownOption>(dropdownOptions[0]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<ITeam | null>(null);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [modalKey, setModalKey] = useState<string | boolean>(false);
  const [loading, setLoading] = useState({
    [LOADING_KEYS.GET_TEAMS]: false,
  } as LoadingState);

  const fetchTeams = async (
    _page: number = page,
    _search: string = search,
    _tab: string = dropdown.value,
  ) => {
    handleLoader(LOADING_KEYS.GET_TEAMS, true);
    const params = {
      page: _page,
      search: _search,
      limit: TOTAL_RECORDS,
    };
    const url = _tab === "my" ? API_URLS.MY_TEAMS : API_URLS.TEAMS;
    const makeUrl = makeUrlQyeryString(params, url);
    const result = await Get<{
      data: {
        results: ITeam[];
        totalCount: number;
      };
    }>(makeUrl, access_token);
    if (result.data) {
      setTeams(result.data.data?.results);
      setTotalItems(result.data?.data?.totalCount);
    }
    handleLoader(LOADING_KEYS.GET_TEAMS, false);
  };

  const handleLoader = (key: string, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const handleTeamCreateUpdate = async (data: ITeamInput) => {
    handleLoader(LOADING_KEYS.CREATE_UPDATE_TEAM, true);
    const Function = selectedItem ? Patch : Post;
    const url = selectedItem ? API_URLS.UPDATE_TEAM : API_URLS.CREATE_TEAM;
    const result = await Function<{
      data: ITeam;
    }>(`${baseUrl(url)}`, data, access_token);

    if (result?.data?.data) {
      if (selectedItem) {
        setTeams((prev) => {
          const temp = structuredClone(prev);
          const index = temp.findIndex((t) => t._id === selectedItem._id);
          if (index !== -1 && temp[index]) {
            temp.splice(index, 1, result?.data?.data as ITeam);
          }
          return temp;
        });
      } else {
        setTeams((prev) => [...prev, result?.data?.data as ITeam]);
      }
      setModalKey(false);
      setSelectedItem(null);
    }
    handleLoader(LOADING_KEYS.CREATE_UPDATE_TEAM, false);
  };

  const handleTeamDelete = async () => {
    if (!selectedItem) return;
    handleLoader(LOADING_KEYS.DELETE_TEAM, true);
    const url = baseUrl(API_URLS.DELETE_TEAM) + selectedItem._id;
    const result = await Delete<{
      data: ITeam;
    }>(url, access_token);

    if (result?.data) {
      setTeams((prev) => {
        const temp = structuredClone(prev);
        const index = temp.findIndex((t) => t._id === selectedItem._id);
        if (index !== -1 && prev[index]) {
          temp.splice(index, 1);
        }
        return temp;
      });
      setModalKey(false);
      setSelectedItem(null);
    }
    handleLoader(LOADING_KEYS.DELETE_TEAM, false);
  };

  const handlePopperClick = (item: PopperItem, team: ITeam) => {
    setSelectedItem(team);
    switch (item.value) {
      case "update":
        setModalKey(MODAL_KEYS.CREATE_UPDATE_TEAM);
        break;
      case "delete":
        setModalKey(MODAL_KEYS.DELETE_TEAM);
        break;
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <SidebarSkeleton>
      <div className="">
        <TableStructure
          header={teamsHeader}
          actions={
            <>
              <SearchInput
                onSearch={(e) => {
                  setSearch(e);
                  setPage(1);
                  fetchTeams(1, e);
                }}
                placeholder="Search teams"
              />
              {dropdown.value === "my" && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedItem(null);
                    setModalKey(MODAL_KEYS.CREATE_UPDATE_TEAM);
                  }}
                >
                  Add Team
                </Button>
              )}
            </>
          }
          data={teams?.map((t) => ({
            ...t,
            members: t.members.length,
            createdAt: formatDate(t.createdAt),
            isActive: t.isActive ? "Active" : "Inactive",
            createdBy: t.createdBy.name,
            actions: (
              <Popper
                items={actionsPopoverItems}
                onClick={(e) => {
                  handlePopperClick(e, t);
                }}
              >
                <MoreVertical className="size-4 text-[var(--main-color)]" />
              </Popper>
            ),
          }))}
          headerTitle={
            <>
              <Dropdown
                options={dropdownOptions}
                value={dropdown}
                size="sm"
                setter={(e) => {
                  if (e) setDropdown(e);
                  setPage(1);
                  setSearch("");
                  fetchTeams(1, "", e?.value);
                }}
              />
            </>
          }
          page={page}
          totalPages={getTotalCount(totalItems)}
          setPage={(p) => {
            setPage(p);
            fetchTeams(p);
          }}
          noDataText="No teams match your search."
          loading={loading[LOADING_KEYS.GET_TEAMS]}
          skeletonRows={5}
        />
        {modalKey === MODAL_KEYS.CREATE_UPDATE_TEAM && (
          <CreateUpdateTeamModal
            show={modalKey === MODAL_KEYS.CREATE_UPDATE_TEAM}
            setShow={(s) => {
              setModalKey(s as boolean);
              setSelectedItem(null);
            }}
            onClick={handleTeamCreateUpdate}
            data={selectedItem as ITeam}
            isApiCall={loading[LOADING_KEYS.CREATE_UPDATE_TEAM]}
          />
        )}
        {modalKey === MODAL_KEYS.DELETE_TEAM && (
          <UserDecisionModal
            show={modalKey === MODAL_KEYS.DELETE_TEAM}
            setShow={(s) => {
              setModalKey(s as boolean);
              setSelectedItem(null);
            }}
            title="Delete Team"
            description="Are you sure you want to delete this team?"
            onClick={handleTeamDelete}
            isApiCall={loading[LOADING_KEYS.DELETE_TEAM]}
          />
        )}
      </div>
    </SidebarSkeleton>
  );
}

const API_URLS = {
  TEAMS: "teams/find/all",
  MY_TEAMS: "teams/find/my",
  CREATE_TEAM: "teams/create",
  UPDATE_TEAM: "teams/update",
  DELETE_TEAM: "teams/",
};

const LOADING_KEYS = {
  GET_TEAMS: "teams-get",
  CREATE_UPDATE_TEAM: "create-update-team",
  DELETE_TEAM: "delete-team",
};
const MODAL_KEYS = {
  CREATE_UPDATE_TEAM: "create-update-team",
  DELETE_TEAM: "delete-team",
};
interface LoadingState {
  [key: string]: boolean;
}

const actionsPopoverItems = [
  {
    label: "Update",
    value: "update",
    icon: <Edit className="size-4" />,
  },
  {
    label: "Delete",
    value: "delete",
    icon: <Trash2 className="size-4" />,
  },
] as PopperItem[];

const dropdownOptions = [
  {
    label: "My Teams",
    value: "my",
  },
  {
    label: "All Teams",
    value: "all",
  },
];
