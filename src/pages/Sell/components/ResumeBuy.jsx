import React from "react";
import { useSelector } from "react-redux";

const ResumeBuy = () => {
  const { data } = useSelector((state) => state.sell);

  return (
    <div className="flex flex-1 flex-col space-y-2">
      {data.map((item, index) => (
        <div className="flex justify-center items-center">
          <p className="pr-5">{item.quantity}</p>

          <p className="flex-1">{item.name}</p>

          {/* Valor de la compra */}
          <div className="flex px-10 items-center space-x-2">
            <p>{`$ ${item.total}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeBuy;
