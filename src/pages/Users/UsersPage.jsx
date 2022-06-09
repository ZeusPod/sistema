import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/ui/DeleteModal";
import Table from "../../components/ui/Table";
import UserModal from "../../components/ui/UserModal";
import {
  activeUser,
  desactiveUser,
  getPaginatedUser,
} from "../../redux/slice/user.slice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, countUsers } = useSelector((state) => state.user);
  const [update, setUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [modalUser, setModalUser] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const Columns = [
    {
      title: "Nombre",
      field: "name",
      visible: true,
      optional: false,
      search: true,
    },
    {
      title: "Correo",
      field: "email",
      visible: true,
      optional: true,
      search: true,
    },
    {
      title: "Rol",
      field: "role",
      visible: true,
      optional: false,
      search: false,
    },
    {
      title: "Estado",
      field: "active",
      visible: true,
      optional: false,
      search: false,
      type: "boolean",
    },
  ];

  const openModalUpdate = () => {
    if (currentItem !== null) {
      setModalUser(true);
      setUpdate(true);
    }
  };

  const openModalAdd = () => {
    setModalUser(true);
    setUpdate(false);
  };

  const openModalDelete = () => {
    if (currentItem !== null) {
      setModalDelete(true);
    }
  };

  const onClickDesactive = () => {
    if (currentItem.active)
      dispatch(desactiveUser(currentItem.id))
        .then(() => {
          setModalDelete(false);
        })
        .catch(() => {
          setModalDelete(false);
        });
    else
      dispatch(activeUser(currentItem.id))
        .then(() => {
          setModalDelete(false);
        })
        .catch(() => {
          setModalDelete(false);
        });
  };

  return (
    <div className="flex flex-col flex-1 bg-[#E1E1E1] overflow-x-auto overflow-y-auto">
      {/* COMPONENTE REUTILIZABLE */}
      <div className="h-14 px-5 bg-white flex">
        <div className="flex w-full mx-auto max-w-7xl items-center justify-between">
          <p className="text-xl font-medium">Usuarios</p>

          <div className="flex space-x-2">
            <button
              onClick={() => openModalAdd()}
              className="bg-[#2F5ED1] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#2470E9]"
            >
              <p className="hidden md:flex">Agregar</p>
              <i className="fa-solid fa-plus flex md:hidden"></i>
            </button>

            <button
              onClick={() => openModalUpdate()}
              className="bg-[#2AC54D] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#71D888]"
            >
              <p className="hidden md:flex">Actualizar</p>
              <i className="fa-solid fa-pencil flex md:hidden"></i>
            </button>

            <button
              onClick={() => openModalDelete()}
              className="bg-[#872B5A] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#682145]"
            >
              <p className="hidden md:flex">D/A</p>
              <i className="fa-solid fa-trash flex md:hidden"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-auto">
        <Table
          columns={Columns}
          data={users}
          numberData={countUsers}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          onChangePage={getPaginatedUser}
          numberPerPage={30}
        />
      </div>

      {modalUser && (
        <UserModal
          status={true}
          changeStatus={setModalUser}
          update={update}
          data={currentItem}
        />
      )}

      {modalDelete && (
        <DeleteModal
          status={true}
          changeStatus={setModalDelete}
          onDelete={onClickDesactive}
          title="¿Está seguro que desea desactivar/activar este usuario?"
        />
      )}
    </div>
  );
};

export default UsersPage;
