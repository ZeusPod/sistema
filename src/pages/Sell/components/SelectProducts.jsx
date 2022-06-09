import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateProduct } from "../../../redux/slice/sell.slice";

const SelectProducts = () => {
  const { data } = useSelector((state) => state.sell);
  const dispatch = useDispatch();

  const addQuantity = (item, index) => {
    const { stock, quantity } = item;
    if (quantity < stock) {
      dispatch(
        updateProduct({ ...item, quantity: quantity + 1, index, type: "add" })
      );
    }
  };

  const decreaseQuantity = (item, index) => {
    const { quantity } = item;

    if (quantity > 1) {
      dispatch(
        updateProduct({
          ...item,
          quantity: quantity - 1,
          index,
          type: "decrease",
        })
      );
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-2">
      {data.map((item, index) => (
        <div key={item._id} className="flex justify-center items-center">
          <p className="flex-1">{item.name}</p>

          {/* Cantidad de producto */}
          <div className="flex space-x-2">
            <button
              onClick={() => decreaseQuantity(item, index)}
              className="font-medium text-indigo-600 hover:text-[#4EA3F6] transition duration-200 ease-in-out"
            >
              <i className="fas fa-caret-left" />
            </button>

            <input
              className="outline-none px-2 text-center py-1 border w-14 border-[#969696] rounded-md"
              placeholder="1"
              min={1}
              value={item.quantity}
              readOnly={true}
            ></input>

            <button
              onClick={() => addQuantity(item, index)}
              className="font-medium text-indigo-600 hover:text-[#4EA3F6] transition duration-200 ease-in-out"
            >
              <i className="fas fa-caret-right" />
            </button>
          </div>

          {/* Valor de la compra */}
          <div className="flex px-10 items-center space-x-2 w-[150px]">
            <p>{`$ ${item.total}`}</p>
          </div>

          {/* Eliminar producto */}
          <button
            onClick={() => dispatch(deleteProduct({ ...item, index: index }))}
            className="text-black font-medium px-3 py-1 float-right rounded bg-[#E1E1E1]"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectProducts;
