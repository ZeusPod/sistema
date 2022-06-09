import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseModal from "../../../components/ui/BaseModal";
import Table from "../../../components/ui/Table";
import { getPaginatedCustomer } from "../../../redux/slice/customer.slice";
import { setClient } from "../../../redux/slice/sell.slice";

const CustomersModal = ({ status = true, changeStatus }) => {
  const { customers, countCustomers } = useSelector((state) => state.customer);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();

  const onSelect = () => {
    dispatch(setClient(currentItem));
    changeStatus(false);
  };

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
      visible: false,
      optional: false,
      search: false,
    },
    {
      title: "Celular",
      field: "phone",
      visible: false,
      optional: false,
      search: false,
    },
  ];

  return (
    <BaseModal status={status} changeStatus={changeStatus} title="Clientes">
      <div className="flex flex-col md:h-[600px] md:w-[700px]">
        <Table
          columns={Columns}
          data={customers}
          numberData={countCustomers}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          onChangePage={getPaginatedCustomer}
          numberPerPage={30}
          nullPadding={true}
          optionDisplay={false}
        />

        <button
          onClick={() => onSelect()}
          className="bg-[#2F5ED1] text-left w-full p-5 text-white font-semibold hover:bg-[#2470E9]"
        >
          <div className="flex justify-center items-center">
            <p>SELECCIONAR CLIENTE</p>
          </div>
        </button>
      </div>
    </BaseModal>
  );
};

export default CustomersModal;
