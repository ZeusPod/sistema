import React, { useState } from "react";
import { useSelector } from "react-redux";
import BaseModal from "../../components/ui/BaseModal";
import Table from "../../components/ui/Table";
import { getPaginatedInvoices } from "../../redux/slice/invoice.slice";
import DetailsModal from "./components/DetailsModal";

const InvoicesPage = () => {
  const { invoices, countInvoices } = useSelector((state) => state.invoice);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalDetails, setModalDetails] = useState(false);

  const openDetails = () => {
    if (currentItem) {
      setModalDetails(true);
    }
  };

  const Columns = [
    {
      title: "Cliente",
      field: "client.name",
      visible: true,
      optional: false,
      search: true,
    },
    {
      title: "Estado",
      field: "status",
      visible: false,
      optional: true,
      search: false,
    },
    {
      title: "Numero",
      field: "number",
      visible: true,
      optional: false,
      search: false,
    },
    {
      title: "Total",
      field: "amount",
      visible: true,
      optional: false,
      search: false,
      type: "dollar",
    },
    {
      title: "Fecha",
      field: "timestamp",
      visible: true,
      optional: false,
      search: false,
      type: "date",
    },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#E1E1E1] overflow-x-auto overflow-y-auto">
      {/* COMPONENTE REUTILIZABLE */}
      <div className="h-14 px-5 bg-white flex">
        <div className="flex w-full mx-auto max-w-7xl items-center justify-between">
          <p className="text-xl font-medium">Facturas</p>

          <div className="flex space-x-2">
            <button
              onClick={() => openDetails()}
              className="bg-[#2F5ED1] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#2470E9]"
            >
              <p className="hidden md:flex">Detalles</p>
              <i className="fa-solid fa-plus flex md:hidden"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-auto">
        <Table
          columns={Columns}
          data={invoices}
          numberData={countInvoices}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          onChangePage={getPaginatedInvoices}
          numberPerPage={30}
          initialRequest={"status"}
          optionSearch={false}
        />
      </div>

      {modalDetails && (
        <DetailsModal
          status={true}
          changeStatus={setModalDetails}
          data={currentItem.products}
          amount={currentItem.amount}
        />
      )}
    </div>
  );
};

export default InvoicesPage;
