import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPay } from "../../../redux/slice/sell.slice";

const InvoiceResume = () => {
  const { client, data, amount, pay, change, status } = useSelector(
    (state) => state.sell
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setPay(e.target.value));
  };

  return (
    <div className="flex flex-col w-full p-10 h-auto">
      <div className="bg-white rounded-md w-full p-10 divide-y-2 space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="">Monto a cobrar</p>
          <p className="text-3xl font-medium">{`$ ${amount}`}</p>
        </div>

        <div className="flex px-2 py-4 justify-between">
          <div className="flex flex-col items-center space-y-2">
            <p>Ingresar monto</p>
            <div className="flex">
              <div className="bg-[#F5F7FA] h-12 w-12 flex items-center justify-center border rounded-md font-medium">
                $
              </div>
              <input
                onChange={handleChange}
                value={pay}
                type="number"
                className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p>Vuelto</p>
            <p className="text-xl font-medium">{`$ ${change}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceResume;
