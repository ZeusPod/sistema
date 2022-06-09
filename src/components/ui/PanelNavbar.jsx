import React from "react";
import { useSelector } from "react-redux";

const PanelNavbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-16 bg-white border-b-[1px] border-[#E1E1E1]">
      <div className="flex flex-1"></div>
      <div className="px-5 flex items-center justify-center space-x-4">
        <div className="flex flex-col items-end">
          <p className="font-semibold text-sm">{user?.name.toUpperCase()}</p>
          <p className="font-semibold text-sm text-[#8E8E8E]">
            {user?.role.toUpperCase()}
          </p>
        </div>
        <div className="bg-white border-2 rounded-full w-10 h-10 flex items-center justify-center">
          <i className="fa-solid fa-user text-[#4B4B4B]"></i>
        </div>
      </div>
    </div>
  );
};

export default PanelNavbar;
