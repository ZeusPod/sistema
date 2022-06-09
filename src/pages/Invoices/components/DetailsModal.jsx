import React from "react";
import BaseModal from "../../../components/ui/BaseModal";

const DetailsModal = ({ status = true, changeStatus, data, amount }) => {
  return (
    <BaseModal status={status} changeStatus={changeStatus} title="Detalles">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col md:h-[400px] md:w-[700px] p-5">
          {data.map((item) => (
            <div key={item._id} className="flex justify-center items-center">
              <p className="pr-5 text-lg">{item.quantity}</p>

              <p className="flex-1 text-lg">{item.name}</p>

              {/* Valor de la compra */}
              <div className="flex  items-center space-x-2">
                <p className="text-xl text-[#78D4A5] font-semibold">{`$ ${item.total}`}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between bg-[#2F5ED1] text-white p-5">
          <p className="font-medium text-lg">Total</p>
          <p className="font-medium text-2xl">{`$ ${amount}`}</p>
        </div>
      </div>
    </BaseModal>
  );
};

export default DetailsModal;
