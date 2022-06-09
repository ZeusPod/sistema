import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../redux/slice/sell.slice";
import BaseModal from "./BaseModal";
import Table from "./Table";

const InvoiceModal = ({ status = true, changeStatus, onData, client }) => {
  const { invoices, countInvoices } = useSelector((state) => state.invoice);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();

  const onSelect = () => {
    dispatch(
      updateProducts({ data: currentItem.products, id: currentItem.id })
    );
    changeStatus(false);
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
    <BaseModal
      status={status}
      changeStatus={changeStatus}
      title="Facturas pendientes del cliente"
    >
      <div className="flex flex-col md:h-[600px] md:w-[700px]">
        <Table
          columns={Columns}
          data={invoices}
          numberData={countInvoices}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          onChangePage={onData}
          numberPerPage={30}
          nullPadding={true}
          idUser={client.id}
          optionSearch={false}
          optionDisplay={false}
        />

        <button
          onClick={() => onSelect()}
          className="bg-[#2F5ED1] text-left w-full p-5 text-white font-semibold hover:bg-[#2470E9]"
        >
          <div className="flex justify-center items-center">
            <p>SELECCIONAR FACTURA</p>
          </div>
        </button>
      </div>
    </BaseModal>
  );
};

export default InvoiceModal;
