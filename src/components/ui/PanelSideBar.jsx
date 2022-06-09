import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import Company from "../../config/company";
import sideBarConfig, { SideBarRol } from "../../config/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slice/auth.slice";

const PanelSideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const size = useWindowSize();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const distpatch = useDispatch();

  const sideBar = SideBarRol(sideBarConfig, user.role);

  useEffect(() => {
    if (size.width < 850) setOpen(false);

    return () => {};
  }, [size]);

  const clickMenu = (url, index) => {
    navigate(url);
  };

  const onSignOut = () => {
    distpatch(signOut()).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div
        className={`${
          open ? "w-64" : "w-20 "
        } bg-white px-5 relative duration-300 shadow-lg`}
      >
        {/* Boton abrir/cerrar menu */}
        <div
          onClick={() => setOpen(!open)}
          className={`absolute hidden sm:flex items-center justify-center cursor-pointer -right-3 top-9 rounded-full border-2 border-[#E1E1E1] w-8 h-8 bg-[#2470E9] text-white`}
        >
          <i
            className={`fa-solid ${open ? "fa-angle-left" : "fa-angle-right"} `}
          ></i>
        </div>

        {/* Logo */}
        <div className="flex gap-x-4 items-center h-16">
          {/* Logo de la empresa */}
          <div className="w-10 h-10 flex items-center justify-center">
            <i
              className={`cursor-pointer duration-500 fa-solid fa-mug-hot fa-xl ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>

          {/* Nombre de la empresa */}
          <h1
            className={`text-[#000000] origin-left font-medium text-xl duration-200 ${
              !open && "hidden"
            }`}
          >
            {Company.name}
          </h1>
        </div>

        {/* Lista de menus */}
        <ul className="pt-6 space-y-3">
          {sideBar.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                clickMenu(item.to, index);
              }}
              className={`flex rounded-md cursor-pointer text-gray-300 text-sm items-center gap-x-4 
      ${
        pathname === item.to
          ? "bg-[#F5F5F5]"
          : "hover:bg-[#F5F5F5] transition duration-200 ease-in-out"
      }`}
            >
              <div
                className={`flex items-center justify-center h-10 w-10 ${
                  pathname === item.to ? "text-[#2470E9]" : "text-[#969696]"
                } transition duration-200 ease-in-out`}
              >
                <i className={`${item.icon} fa-lg`} />
              </div>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 font-regular text-[#373737]`}
              >
                {item.title}
              </span>
            </li>
          ))}
          <li
            onClick={() => onSignOut()}
            className="flex rounded-md cursor-pointer text-[#969696] text-sm items-center gap-x-4 hover:bg-[#F5F5F5] transition duration-200 ease-in-out
            "
          >
            <div
              className="flex items-center justify-center h-10 w-10 
              transition duration-200 ease-in-out"
            >
              <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
            </div>
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200 font-regular text-[#373737]`}
            >
              CERRAR SESIÓN
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PanelSideBar;
