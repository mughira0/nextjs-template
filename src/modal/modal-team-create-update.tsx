import { Get } from "@/axios";
import Button from "@/components/core/button";
import Dropdown from "@/components/core/dropdown";
import Input from "@/components/core/input";
import TextArea from "@/components/core/textArea";
import { baseUrl } from "@/data/constants";
import { validateParams } from "@/helper/generic";
import { RootState } from "@/redux/store/store";
import { ICreateUpdateTeamModal } from "@/types/modal";
import { IUser } from "@/types/system/slice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ModalLoader from "./modal-loader";
import ModalSkeleton from "./modal-skeleton";
import { DropdownOption } from "@/types/components/dropdown";

function CreateUpdateTeamModal({
  show,
  setShow,
  data,
  isApiCall = false,
  onClick,
}: ICreateUpdateTeamModal) {
  const { access_token } = useSelector(
    (state: RootState) => state?.authReducer,
  );
  const [name, setName] = React.useState(data?.name || "");
  const [description, setDescription] = React.useState(data?.description || "");
  const [members, setMembers] = React.useState<IUser[]>(data?.members || []);
  const [membersOptions, setMembersOptions] = React.useState<IUser[]>([]);
  const [loading, setLoading] = React.useState<LoadingState>({
    [LOADING_KEYS.GET_USERS]: false,
  } as LoadingState);

  const fetchUsers = async () => {
    handleLoader(LOADING_KEYS.GET_USERS, true);

    const url = baseUrl(API_URLS.USERS);
    const result = await Get<{
      data: IUser[];
    }>(url, access_token);
    if (result.data) {
      setMembersOptions(result.data?.data);
    }
    handleLoader(LOADING_KEYS.GET_USERS, false);
  };

  const handleLoader = (key: string, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidate = async () => {
    const body = {
      name,
      description,
      members: members.map((m) => m._id) as string[],
      ...(data && {
        id: data._id,
      }),
    };
    if (!validateParams(body)) return;
    if (onClick) onClick(body);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={data ? "Edit Team" : "Create Team"}
      footer={
        !loading[LOADING_KEYS.GET_USERS] && (
          <>
            <Button
              variant="primary-bordered"
              size="sm"
              onClick={() => {
                setShow(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={isApiCall || loading[LOADING_KEYS.GET_USERS]}
              loading={isApiCall}
              onClick={handleValidate}
            >
              Save
            </Button>
          </>
        )
      }
    >
      {loading[LOADING_KEYS.GET_USERS] ? (
        <ModalLoader />
      ) : (
        <div className="grid grid-cols-1 gap-2">
          <Input
            label="Name"
            value={name}
            placeholder="Enter Name"
            setter={setName}
          />
          <Dropdown<DropdownOption>
            label="Members"
            options={membersOptions}
            value={members}
            optionLabel="name"
            optionValue="_id"
            setter={(e) => setMembers(e as IUser[])}
            isMultiple
            isSearchable
          />
          <TextArea
            label="Description"
            value={description}
            placeholder="Enter Description"
            setter={setDescription}
          />
        </div>
      )}
    </ModalSkeleton>
  );
}

export default CreateUpdateTeamModal;
const API_URLS = {
  USERS: "users/find/all",
};

const LOADING_KEYS = {
  GET_USERS: "users-get",
};

interface LoadingState {
  [key: string]: boolean;
}
