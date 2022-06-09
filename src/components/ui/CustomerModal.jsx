import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCustomer,
  updateCustomer,
} from "../../redux/slice/customer.slice";
import BaseModal from "./BaseModal";

const initialStateCustomer = {
  id: "",
  nationalId: "",
  name: "",
  address: "",
  phone: "",
};

const CustomerModal = ({
  status = true,
  changeStatus,
  update = false,
  data = null,
}) => {
  const [customer, setCustomer] = useState(
    !update ? initialStateCustomer : data
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    setIsLoading(true);
    dispatch(createCustomer(customer))
      .unwrap()
      .then(() => {
        setCustomer(initialStateCustomer);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onClickUpdate = () => {
    setIsLoading(true);
    dispatch(updateCustomer(customer))
      .unwrap()
      .then(() => {
        setTimeout(() => {}, 2000);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <BaseModal status={status} changeStatus={changeStatus} title="Cliente">
      <div className="flex flex-col w-full md:w-[450px] p-5 space-y-5">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col justify-center space-y-2">
            <p>Número de documento</p>
            <input
              name="nationalId"
              onChange={handleChange}
              value={customer.nationalId}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Nombres</p>
            <input
              name="name"
              onChange={handleChange}
              value={customer.name}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Dirección</p>
            <input
              name="address"
              onChange={handleChange}
              value={customer.address}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Celular</p>
            <input
              name="phone"
              onChange={handleChange}
              value={customer.phone}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>
        </div>

        <button
          onClick={update ? onClickUpdate : onClickAdd}
          className="bg-[#2F5ED1] w-full py-3 rounded-md text-white font-semibold hover:bg-[#2470E9] disabled:bg-[#45485C] disabled:transition-none"
        >
          <p className={`${isLoading ? "hidden" : "block"}`}>
            {update ? "Actualizar" : "Agregar"}
          </p>
          {isLoading && (
            <i className="fa-solid fa-spinner text-xl animate-spin"></i>
          )}
        </button>
      </div>
    </BaseModal>
  );
};

export default CustomerModal;
