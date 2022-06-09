import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNonInitialEffect } from "../../hooks/useNonInitialEffect";
import { typeColumn } from "../../utils/typeColumn";

const Table = ({
  columns,
  data,
  numberData = 0,
  numberPerPage = 10,
  onChangePage,
  currentItem,
  changedCurrentItem,
  initialRequest = null,
  idUser = "",
  nullPadding = false,
  optionSearch = true,
  optionDisplay = true,
}) => {
  const [tableColumns, setTableColumns] = useState(columns);

  const [openDropdown, setOpenDropdown] = useState(false);

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

  const openClose = () => {
    setOpenDropdown(!openDropdown);
  };

  const showColumn = (field, value) => {
    setTableColumns(
      tableColumns.map((column) =>
        column.field == field ? { ...column, visible: !column.visible } : column
      )
    );
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
      if (idUser === "") {
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
      } else {
        dispatch(
          onChangePage({
            id: idUser,
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
      }
    } else if (e.keyCode == 27) {
      setIsLoading(true);
      setSearch("");
      setCurrentPage(1);
    }
  };

  useNonInitialEffect(() => {
    if (search === "") {
      if (idUser === "") {
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
      } else {
        dispatch(
          onChangePage({
            id: idUser,
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
      if (idUser === "") {
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
      } else {
        dispatch(
          onChangePage({
            id: idUser,
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
    }
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);

    if (idUser === "") {
      dispatch(
        onChangePage({
          column: initialRequest == null ? "name" : initialRequest,
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
    } else {
      dispatch(
        onChangePage({
          id: idUser,
          column: initialRequest == null ? "name" : initialRequest,
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
    }
  }, []);

  return (
    <div
      className={`flex flex-col flex-1 p-0 overflow-x-auto overflow-y-auto ${
        nullPadding ? "md:p-0" : "md:p-10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-1 w-full overflow-x-auto overflow-y-auto">
        <div className="flex flex-col flex-1 bg-white p-5 md:p-5 rounded-none md:rounded-lg space-y-10 overflow-y-auto">
          {/* Opciones de busqueda y mostrar columnas */}
          <div className="flex space-x-4 md:space-x-0 md:justify-between">
            {optionSearch ? (
              <div className="flex flex-col flex-1 space-y-4 md:space-y-0 md:space-x-2 md:flex-row">
                <div className="flex items-center space-x-2">
                  <p>Filtrar por:</p>
                  <select
                    onChange={(e) =>
                      setSearchColumn(
                        e.target.options[e.target.selectedIndex].getAttribute(
                          "name"
                        )
                      )
                    }
                    className="outline-none bg-white flex-1 border border-[#969696] rounded-md px-2 py-1 cursor-pointer hover:border-[#3FA0E1]"
                  >
                    {tableColumns.map(
                      (column, i) =>
                        column.search && (
                          <option key={i} name={column.field.split(".")[-1]}>
                            {column.title}
                          </option>
                        )
                    )}
                  </select>
                </div>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="outline-none px-2 py-1 border border-[#969696] rounded-md md:w-64"
                  onKeyDown={(e) => keyPress(e)}
                  placeholder="Buscar"
                  value={search}
                ></input>
              </div>
            ) : (
              <div></div>
            )}

            {optionDisplay && (
              <div className="relative inline-flex align-middle">
                <button
                  tabIndex={0}
                  className="text-white font-medium px-3 py-1 rounded bg-[#617EFC]"
                  onClick={openClose}
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>

                <div
                  className={`shadow-md absolute min-w-[200px] right-0 rounded top-[90px] md:top-[40px] z-50 px-5 py-4 bg-white ${
                    openDropdown ? "block" : "hidden"
                  }`}
                >
                  <ul className="flex flex-col space-y-2">
                    {tableColumns.map(
                      (column, i) =>
                        column.optional && (
                          <label
                            key={i}
                            className="flex items-center space-x-2 font-medium cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={column.visible}
                              onChange={() => showColumn(column.field)}
                            />
                            <p>{column.title}</p>
                          </label>
                        )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

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
                                ? column.field.split(".").length > 1
                                  ? item[column.field.split(".")[0]][
                                      column.field.split(".")[1]
                                    ]
                                  : ""
                                : typeColumn(item[column.field], column.type)}
                            </td>
                          )
                      )}
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
    </div>
  );
};

export default Table;
