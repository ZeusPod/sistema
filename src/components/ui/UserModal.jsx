import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../redux/slice/user.slice";
import BaseModal from "./BaseModal";

const initialState = {
  id: "",
  name: "",
  email: "",
  role: "user",
  password: "",
};

const UserModal = ({
  status = true,
  changeStatus,
  update = false,
  data = null,
}) => {
  const [user, setUser] = useState(!update ? initialState : data);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    setIsLoading(true);
    dispatch(createUser(user))
      .unwrap()
      .then(() => {
        setUser(initialState);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onClickUpdate = () => {
    setIsLoading(true);
    dispatch(
      updateUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    )
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <BaseModal status={status} changeStatus={changeStatus} title="Usuario">
      <div className="flex flex-col w-full md:w-[450px] p-5 space-y-5">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col justify-center space-y-2">
            <p>Nombre completo</p>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={user.name}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          <div className="flex flex-col justify-center space-y-2">
            <p>Correo electronico</p>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={user.email}
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
            ></input>
          </div>

          {!update && (
            <div className="flex flex-col justify-center space-y-2">
              <p>Contraseña</p>
              <input
                name="password"
                type="text"
                onChange={handleChange}
                value={user.password}
                className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
              ></input>
            </div>
          )}

          <div className="flex flex-col justify-center space-y-2">
            <p>Rol</p>
            <select
              onChange={(e) =>
                setUser({
                  ...user,
                  role: e.target.options[e.target.selectedIndex].getAttribute(
                    "name"
                  ),
                })
              }
              className="outline-none bg-white flex-1 border border-[#969696] rounded-md px-2 py-1 cursor-pointer hover:border-[#3FA0E1]"
            >
              <option name="user">Usuario</option>
              <option name="admin">Administrator</option>
            </select>
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

export default UserModal;
