"use client";

import React from "react";
import Button from "@/components/core/button";
import ModalSkeleton from "./modal-skeleton";
import { FileWarning, OctagonAlert } from "lucide-react";
import { IUserDecisionModalProps } from "@/types/modal";

const UserDecisionModal: React.FC<IUserDecisionModalProps> = ({
  show,
  setShow,
  title = "Are you sure?",
  description,
  icon = <OctagonAlert className="size-16" />,
  onClick,
  isApiCall = false,
}) => {
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={title}
      width="500px"
      footer={
        <>
          <Button
            variant="primary-bordered"
            size="sm"
            onClick={() => {
              setShow(false);
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onClick}
            loading={isApiCall}
            disabled={isApiCall}
          >
            Yes
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center gap-4 ">
        {icon && <div className="text-3xl">{icon}</div>}
        {description && (
          <p className="text-[17px] text-primary-text">{description}</p>
        )}
      </div>
    </ModalSkeleton>
  );
};

export default UserDecisionModal;
