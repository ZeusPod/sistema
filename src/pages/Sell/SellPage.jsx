import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedProduct } from "../../redux/slice/product.slice";
import {
  addProduct,
  createInvoice,
  setStatus,
  updateInvoice,
} from "../../redux/slice/sell.slice";
import CustomersModal from "./components/CustomersModal";
import CustomerModal from "../../components/ui/CustomerModal";
import Table from "./components/Table";
import SelectProducts from "./components/SelectProducts";
import ResumeBuy from "./components/ResumeBuy";
import InvoiceResume from "./components/InvoiceResume";
import InvoiceModal from "../../components/ui/InvoiceModal";
import { getInvoicesByUserIdPending } from "../../redux/slice/invoice.slice";

const SellPage = () => {
  const { products, countProducts } = useSelector((state) => state.product);
  const [currentItemProduct, setCurrentItemProduct] = useState(null);
  const { id, client, data, amount, pay, change } = useSelector(
    (state) => state.sell
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [modalCustomers, setModalCustomers] = useState(false);
  const [modalCustomer, setModalCustomer] = useState(false);
  const [modalInvoice, setModalInvoice] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disabledPay, setDisabledPay] = useState(true);

  const Columns = [
    {
      title: "Nombre",
      field: "name",
      visible: true,
      optional: false,
      search: true,
    },
    {
      title: "Descripción",
      field: "description",
      visible: false,
      optional: true,
      search: true,
    },
    {
      title: "Precio",
      field: "price",
      visible: true,
      optional: false,
      search: false,
    },
    {
      title: "Cantidad",
      field: "quantity",
      visible: true,
      optional: false,
      search: false,
    },
  ];

  useEffect(() => {
    if (data.length === 0 && !client.id) {
      setDisabled(true);
    } else if (data.length === 0 && client.id) {
      setDisabled(true);
    } else if (data.length > 0 && client.id !== "") {
      setDisabled(false);
    } else if (data.length > 0 && !client.id) {
      setDisabled(true);
    }
  }, [client, data]);

  const onClickPending = () => {
    if (id !== "") {
      dispatch(
        updateInvoice({
          id: id,
          products: data,
          status: "Pending",
          amount: amount,
        })
      );
    } else {
      dispatch(
        createInvoice({
          client: client.id,
          user: user.data.id,
          products: data,
          amount,
          pay,
          change,
          status: "Pending",
        })
      );
    }
  };

  const onClickPay = () => {
    if (id !== "") {
      dispatch(
        updateInvoice({
          id: id,
          products: data,
          status: "Success",
          amount: amount,
        })
      )
        .then(() => {
          setDisabledPay(true);
        })
        .catch(() => {
          setDisabledPay(true);
        });
    } else {
      dispatch(
        createInvoice({
          client: client.id,
          user: user.data.id,
          products: data,
          amount,
          pay,
          change,
          status: "Success",
        })
      )
        .then(() => {
          setDisabledPay(true);
        })
        .catch(() => {
          setDisabledPay(true);
        });
    }
  };

  const onDisablePay = () => {
    if (amount > 0) {
      setDisabledPay(false);
    }
  };

  const onEnabledPay = () => {
    setDisabledPay(true);
  };

  return (
    <div className="flex flex-col flex-1 bg-[#E1E1E1] overflow-x-auto overflow-y-auto">
      {/* COMPONENTE REUTILIZABLE */}
      <div className="h-14 px-5 bg-white flex items-center">
        <p className="text-xl font-medium">Ventas</p>
      </div>

      <div className="flex flex-1">
        <div className="flex flex-1">
          <div
            className={` bg-[#E1E1E1] ${
              disabledPay ? "flex flex-1" : "hidden"
            }`}
          >
            <Table
              columns={Columns}
              data={products}
              numberData={countProducts}
              currentItem={currentItemProduct}
              changedCurrentItem={setCurrentItemProduct}
              onChangePage={getPaginatedProduct}
              onAddItem={addProduct}
              numberPerPage={30}
            />
          </div>
          <div
            className={` bg-[#E1E1E1] ${
              disabledPay ? "hidden" : "flex flex-1"
            }`}
          >
            <InvoiceResume />
          </div>
        </div>

        <div className="flex p-5 flex-col w-2/5 bg-[#F8F9FA] space-y-3">
          <p className="font-medium text-xl">Resumen de compra</p>

          {disabledPay ? (
            <div className="flex flex-1 flex-col space-y-2">
              {/* Cliente y opciones */}
              <div className="flex space-x-2 space-y-3 justify-between items-center">
                <p className="text-xl">{`Cliente: ${client.name}`}</p>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setModalCustomers(true)}
                    className="text-black font-medium px-3 py-1 float-right rounded bg-[#E1E1E1] hover:bg-[#D0D1D2]"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>

                  <button
                    onClick={() => setModalCustomer(true)}
                    tabIndex={0}
                    className="text-black font-medium px-3 py-1 float-right rounded bg-[#E1E1E1] hover:bg-[#D0D1D2]"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>

                  {client.id !== "" && (
                    <button
                      onClick={() => setModalInvoice(true)}
                      tabIndex={0}
                      className="text-black font-medium px-3 py-1 float-right rounded bg-[#E1E1E1] hover:bg-[#D0D1D2]"
                    >
                      <i className="fa-solid fa-file"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Datos de los productos a comprar */}
              <div className="flex flex-1 flex-col">
                <SelectProducts />

                {/* BOTONES */}
                <div className="flex flex-col space-y-2">
                  <button
                    disabled={disabled}
                    onClick={onClickPending}
                    className="bg-[#A5A6A6] w-full p-5 rounded-md text-white font-semibold hover:bg-[#C3C3C3] disabled:bg-[#6C757D] disabled:transition-none"
                  >
                    <div className="flex justify-between items-center">
                      <p>PENDIENTE</p>
                      <p className="text-2xl">{`$ ${amount}`}</p>
                    </div>
                  </button>

                  <button
                    disabled={disabled}
                    onClick={onDisablePay}
                    className="bg-[#2F5ED1] text-left w-full p-5 rounded-md text-white font-semibold hover:bg-[#2470E9] disabled:bg-[#6C757D] disabled:transition-none"
                  >
                    <div className="flex justify-between items-center">
                      <p>PAGAR</p>
                      <p className="text-2xl">{`$ ${amount}`}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 space-y-5">
              {/* INFORMACION BASICA DEL USUARIO */}
              <div>
                <p className="text-xl text-center">{client.name}</p>
                <p className="text-md text-center">{client.phone}</p>
              </div>

              <p className="font-medium text-lg">Productos</p>

              <ResumeBuy />

              <div className="flex justify-between bg-[#2F5ED1] text-white p-5">
                <p className="font-medium text-lg">Total</p>
                <p className="font-medium text-2xl">{`$ ${amount}`}</p>
              </div>

              <div className="flex space-x-10">
                <button
                  onClick={onClickPay}
                  className="bg-[#2AC54D] w-full py-3 rounded-md text-white font-semibold text-xl hover:bg-[#41CC60]"
                >
                  Pagar
                </button>

                <button
                  onClick={onEnabledPay}
                  className="bg-[#FE0000] w-full py-3 rounded-md text-white font-semibold text-xl hover:bg-[#FE3D3D]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <InvoiceModal
        status={modalInvoice}
        changeStatus={setModalInvoice}
        onData={getInvoicesByUserIdPending}
        client={client}
      />

      <CustomersModal
        status={modalCustomers}
        changeStatus={setModalCustomers}
      />

      <CustomerModal status={modalCustomer} changeStatus={setModalCustomer} />
    </div>
  );
};

export default SellPage;
