import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../components/ui/DeleteModal";
import ProductModal from "../../components/ui/ProductModal";
import Table from "../../components/ui/Table";
import {
  deleteProduct,
  getPaginatedProduct,
} from "../../redux/slice/product.slice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, countProducts } = useSelector((state) => state.product);
  const [update, setUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [modalProduct, setModalProduct] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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
      type: "dollar",
    },
    {
      title: "Cantidad",
      field: "quantity",
      visible: true,
      optional: false,
      search: false,
    },
  ];

  const openModalUpdate = () => {
    if (currentItem !== null) {
      setModalProduct(true);
      setUpdate(true);
    }
  };

  const openModalAdd = () => {
    setModalProduct(true);
    setUpdate(false);
  };

  const openModalDelete = () => {
    if (currentItem !== null) {
      setModalDelete(true);
    }
  };

  const onClickDelete = () => {
    dispatch(deleteProduct(currentItem.id))
      .then(() => {
        setModalDelete(false);
      })
      .catch(() => {
        setModalDelete(false);
      });
  };

  return (
    <div className="flex flex-col flex-1 bg-[#E1E1E1] overflow-x-auto overflow-y-auto">
      {/* COMPONENTE REUTILIZABLE */}
      <div className="h-14 px-5 bg-white flex">
        <div className="flex w-full mx-auto max-w-7xl items-center justify-between">
          <p className="text-xl font-medium">Inventario</p>

          <div className="flex space-x-2">
            <button
              onClick={() => openModalAdd()}
              className="bg-[#2F5ED1] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#2470E9]"
            >
              <p className="hidden md:flex">Agregar</p>
              <i className="fa-solid fa-plus flex md:hidden"></i>
            </button>

            <button
              onClick={() => openModalUpdate()}
              className="bg-[#2AC54D] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#71D888]"
            >
              <p className="hidden md:flex">Actualizar</p>
              <i className="fa-solid fa-pencil flex md:hidden"></i>
            </button>

            <button
              onClick={() => openModalDelete()}
              className="bg-[#FE0000] py-2 px-4 rounded-md text-white font-semibold hover:bg-[#FE5555]"
            >
              <p className="hidden md:flex">Eliminar</p>
              <i className="fa-solid fa-trash flex md:hidden"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-x-auto overflow-y-auto">
        <Table
          columns={Columns}
          data={products}
          numberData={countProducts}
          currentItem={currentItem}
          changedCurrentItem={setCurrentItem}
          onChangePage={getPaginatedProduct}
          numberPerPage={30}
        />
      </div>

      {modalProduct && (
        <ProductModal
          status={true}
          changeStatus={setModalProduct}
          update={update}
          data={currentItem}
        />
      )}

      {modalDelete && (
        <DeleteModal
          status={true}
          changeStatus={setModalDelete}
          onDelete={onClickDelete}
        />
      )}
    </div>
  );
};

export default ProductsPage;
