import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../../components/ui/BaseModal";
import Table from "../../../components/ui/Table";
const InvoiceModal = ({ status = true, changeStatus, onData, id }) => {
  const { invoices, countInvoices } = useSelector((state) => state.invoice);
  const [currentItem, setCurrentItem] = useState(null);

  const Columns = [
    {
      title: "Cliente",
      field: "client.name",
      visible: true,
      optional: false,
      search: true,
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
    {
      title: "Estado",
      field: "status",
      visible: true,
      optional: true,
      search: false,
    },
  ];

  return (
    <BaseModal
      status={status}
      changeStatus={changeStatus}
      title="Factura de clientes"
    >
      <div className="flex flex-col md:h-[600px] md:w-[700px]">
        <Table
          columns={Columns}
          data={invoices}
          numberData={countInvoices}
          onChangePage={onData}
          numberPerPage={30}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          nullPadding={true}
          idUser={id}
          optionSearch={false}
          optionDisplay={false}
        />
      </div>
    </BaseModal>
  );
};

export default InvoiceModal;
