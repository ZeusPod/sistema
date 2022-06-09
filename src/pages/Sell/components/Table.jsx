import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNonInitialEffect } from "../../../hooks/useNonInitialEffect";
import { addProduct } from "../../../redux/slice/sell.slice";

const Table = ({
  columns,
  data,
  numberData = 0,
  numberPerPage = 10,
  onChangePage,
  currentItem,
  onAddItem,
  changedCurrentItem,
}) => {
  const [tableColumns, setTableColumns] = useState(columns);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [searchColumn, setSearchColumn] = useState(columns[0].field);

  const [isLodingSearch, setIsLodingSearch] = useState(false);

  const dispatch = useDispatch();

  const backPage = () => {
    if (currentPage > 1) {
      setCurrentPage((value) => value - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(numberData / numberPerPage)) {
      setCurrentPage((value) => value + 1);
    }
  };

  const onClickItem = (index, item) => {
    setCurrentIndex(index);
    changedCurrentItem(item);
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      setIsLodingSearch(true);
      setIsLoading(true);
      setCurrentPage(1);
      dispatch(
        onChangePage({
          column: searchColumn,
          page: 1,
          limit: numberPerPage,
          search: search,
        })
      )
        .then(() => {
          setIsLoading(false);
          setIsLodingSearch(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsLodingSearch(false);
        });
    } else if (e.keyCode == 27) {
      setIsLoading(true);
      setSearch("");
      setCurrentPage(1);
    }
  };

  useNonInitialEffect(() => {
    if (search === "") {
      dispatch(
        onChangePage({
          column: "name",
          page: currentPage,
          limit: numberPerPage,
          search: "",
        })
      )
        .then(() => {
          setIsLoading(false);
          setIsLodingSearch(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsLodingSearch(false);
        });
    }
  }, [search]);

  useNonInitialEffect(() => {
    currentIndex === -1
      ? changedCurrentItem(null)
      : changedCurrentItem(data[currentIndex]);
  }, [data]);

  useNonInitialEffect(() => {
    if (!isLodingSearch) {
      setIsLoading(true);
      dispatch(
        onChangePage({
          column: searchColumn,
          page: currentPage,
          limit: numberPerPage,
          search: search,
        })
      )
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      onChangePage({
        column: "name",
        page: currentPage,
        limit: numberPerPage,
        search: "",
      })
    )
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const addItemSell = (item) => {
    dispatch(onAddItem(item));
  };

  return (
    <div className="flex flex-col flex-1 p-0 md:p-5 overflow-x-auto overflow-y-auto">
      <div className="flex flex-col flex-1 bg-white p-5 md:p-10 rounded-none md:rounded-lg space-y-5 overflow-y-auto">
        {/* Opciones de busqueda y mostrar columnas */}
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none w-full px-2 py-1 border border-[#969696] rounded-md"
          placeholder="Buscar"
          onKeyDown={(e) => keyPress(e)}
          value={search}
        ></input>

        {/* Información de la tabla */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="w-full divide-y-2 relative divide-black overflow-y-auto">
            <thead className="text-left">
              <tr>
                <th className="py-2 px-2 sticky top-0 bg-white">#</th>
                {tableColumns?.map(
                  (column, index) =>
                    column.visible && (
                      <th className="px-2 sticky top-0 bg-white" key={index}>
                        {column.title}
                      </th>
                    )
                )}
                <th className="px-2 sticky top-0 bg-white"></th>
              </tr>
            </thead>

            <tbody className="divide-y overflow-y-auto">
              {isLoading ? (
                <tr className="flex w-full h-full flex-1 items-center justify-center text-gray-500"></tr>
              ) : (
                data.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() => onClickItem(i, item)}
                    className={`${
                      currentIndex == i ? "bg-[#D7D7D7]" : ""
                    } cursor-pointer`}
                  >
                    <td className="py-2 px-2">
                      {i + 1 + (currentPage - 1) * numberPerPage}
                    </td>
                    {tableColumns?.map(
                      (column, j) =>
                        column.visible && (
                          <td className="px-2" key={j}>
                            {item[column.field] == null
                              ? ""
                              : item[column.field]}
                          </td>
                        )
                    )}
                    <td className="py-2 px-2">
                      <button
                        onClick={() => addItemSell(item)}
                        className="bg-[#2AC54D] py-1 px-4 rounded-md text-white font-semibold hover:bg-[#71D888]"
                      >
                        <i className="fa-solid fa-plus flex"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Opciones de cambio de pagina */}
        <div className="flex space-x-4">
          <div>
            <p>{`Total ${numberData}`}</p>
          </div>

          <div className="flex">
            <button
              onClick={() => backPage()}
              className="font-medium text-indigo-600 hover:text-[#4EA3F6] transition duration-200 ease-in-out"
            >
              <i className="fas fa-caret-left" />
            </button>

            <span className="text-[#878FB8] font-medium px-6">{`${currentPage}/${Math.ceil(
              numberData / numberPerPage
            )}`}</span>

            <button
              onClick={() => nextPage()}
              className="font-medium text-indigo-600 hover:text-[#4EA3F6] transition duration-200 ease-in-out"
            >
              <i className="fas fa-caret-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
