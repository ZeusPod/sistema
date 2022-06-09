import React, { useState } from "react";
import Table from "../../components/ui/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  getPaginatedCustomer,
} from "../../redux/slice/customer.slice";
import { getInvoicesByUserIdSuccess } from "../../redux/slice/invoice.slice";
import CustomerModal from "../../components/ui/CustomerModal";
import DeleteModal from "../../components/ui/DeleteModal";
import InvoiceModal from "./components/InvoiceModal";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, countCustomers } = useSelector((state) => state.customer);
  const [update, setUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [modalCustomer, setModalCustomer] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalInvoice, setModalInvoice] = useState(false);

  const Columns = [
    {
      title: "Cedula",
      field: "nationalId",
      visible: true,
      optional: false,
      search: true,
    },
    {
      title: "Nombre",
      field: "name",
      visible: true,
      optional: false,
      search: true,
    },
    {
      title: "Dirección",
      field: "address",
      visible: true,
      optional: false,
      search: true,
    },
    {
      title: "Celular",
      field: "phone",
      visible: false,
      optional: true,
      search: true,
    },
  ];

  const openModalUpdate = () => {
    if (currentItem !== null) {
      setModalCustomer(true);
      setUpdate(true);
    }
  };

  const openModalInvoice = () => {
    if (currentItem !== null) {
      setModalInvoice(true);
    }
  };

  const openModalAdd = () => {
    setModalCustomer(true);
    setUpdate(false);
  };

  const openModalDelete = () => {
    if (currentItem !== null) {
      setModalDelete(true);
    }
  };

  const onClickDelete = () => {
    dispatch(deleteCustomer(currentItem.id))
      .then(() => {
        setModalDelete(false);
      })
      .catch(() => {
        setModalDelete(false);
      });
  };

  return (
    <div className="flex flex-col flex-1 bg-[#E1E1E1] overflow-x-auto overflow-y-auto">
      <div className="h-14 px-5 bg-white flex">
        <div className="flex flex-1 w-full mx-auto max-w-7xl items-center justify-between">
          <p className="text-xl font-medium">Clientes</p>

          <div className="flex space-x-2">
            <button
              onClick={() => openModalInvoice()}
              className="bg-[#9D3268] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#872B5A]"
            >
              <p className="hidden md:flex">Facturas</p>
              <i className="fa-solid fa-trash flex md:hidden"></i>
            </button>

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
              className="bg-[#FE0000] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#FE5555]"
            >
              <p className="hidden md:flex">Eliminar</p>
              <i className="fa-solid fa-trash flex md:hidden"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-auto">
        <Table
          columns={Columns}
          data={customers}
          numberData={countCustomers}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          onChangePage={getPaginatedCustomer}
          numberPerPage={30}
        />
      </div>

      {modalInvoice && (
        <InvoiceModal
          status={true}
          changeStatus={setModalInvoice}
          id={currentItem.id}
          onData={getInvoicesByUserIdSuccess}
        ></InvoiceModal>
      )}

      {modalCustomer && (
        <CustomerModal
          status={true}
          changeStatus={setModalCustomer}
          update={update}
          data={currentItem}
        />
      )}

      {modalDelete && (
        <DeleteModal
          status={true}
          changeStatus={setModalDelete}
          onDelete={onClickDelete}
        />
      )}
    </div>
  );
};

export default CustomersPage;
