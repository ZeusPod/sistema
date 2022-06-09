import React from "react";
import BaseModal from "./BaseModal";

const DeleteModal = ({
  status,
  changeStatus,
  onDelete,
  title = "¿Esta seguro que desea eliminar este elemento?",
}) => {
  return (
    <BaseModal status={status} changeStatus={changeStatus} showHeader={false}>
      <div className="flex flex-col items-center p-5 space-y-5">
        <h1 className="text-[#878FB8] font-medium pt-10">{title}</h1>
        <div className="flex space-x-5">
          <button
            onClick={() => onDelete()}
            className="font-medium relative w-full flex justify-center py-2 px-6 border border-transparent rounded-md text-white bg-[#2F5ED1] hover:bg-[#2470E9] disabled:bg-[#45485C] transition duration-200 ease-in-out"
          >
            Si
          </button>
          <button
            onClick={() => changeStatus(false)}
            className="font-medium relative w-full flex justify-center py-2 px-6 border border-transparent rounded-md text-white bg-[#A5A6A6] hover:bg-[#D0D1D2] disabled:bg-[#45485C] transition duration-200 ease-in-out"
          >
            No
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteModal;
