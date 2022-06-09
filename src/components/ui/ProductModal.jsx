import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../redux/slice/product.slice";
import BaseModal from "./BaseModal";

const initialStateProduct = {
  id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

const ProductModal = ({
  status = true,
  changeStatus,
  update = false,
  data = null,
}) => {
  const [product, setProduct] = useState(!update ? initialStateProduct : data);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    setIsLoading(true);
    dispatch(createProduct(product))
      .unwrap()
      .then(() => {
        setProduct(initialStateProduct);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onClickUpdate = () => {
    setIsLoading(true);
    dispatch(updateProduct(product))
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <BaseModal status={status} changeStatus={changeStatus} title="Producto">
      <div className="flex flex-col w-full md:w-[450px] p-5 space-y-5">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col justify-center space-y-2">
            <p>Nombre del producto</p>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={product.name}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Descripción del producto</p>
            <textarea
              name="description"
              onChange={handleChange}
              value={product.description}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></textarea>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Precio</p>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              min={0}
              value={product.price}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Cantidad</p>
            <input
              name="quantity"
              onChange={handleChange}
              type="number"
              min={0}
              value={product.quantity}
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

export default ProductModal;
