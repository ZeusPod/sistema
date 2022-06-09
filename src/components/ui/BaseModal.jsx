import React from "react";

const BaseModal = ({
  children,
  status = true,
  changeStatus,
  title = "Alerta",
  showHeader = true,
  showOverlay = true,
  multimedia = false,
}) => {
  return (
    <>
      {status && (
        <div
          className={`w-full h-full fixed top-0 left-0 z-20 flex items-center justify-center p-10  ${
            showOverlay && "bg-black bg-opacity-50"
          }`}
        >
          {/* Contenedor modal */}
          <div className="bg-white relative w-full md:w-auto rounded-md shadow-md overflow-hidden">
            {/* Encabezado */}
            {showHeader && (
              <div className="flex items-center justify-between border-[#3D3D3D] px-5 py-5">
                <h3 className="text-black text-xl">{title}</h3>
              </div>
            )}
            <button
              onClick={() => changeStatus(false)}
              className={`absolute ${
                multimedia ? "-top-8 right-0" : "top-5 right-5"
              } bg-white bg-opacity-80 h-6 w-6 rounded-sm text-[#3D3D3D] hover:text-[#878FB8] transition duration-200 ease-in-out`}
            >
              <i className="fas fa-times"></i>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default BaseModal;
