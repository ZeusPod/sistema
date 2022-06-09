import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../../redux/slice/auth.slice";
import { clearMessage } from "../../redux/slice/message.slice";
import * as path from "../../config/path";
import BaseModal from "../../components/ui/BaseModal";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = useSelector((state) => state.message);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onClickSignIn = () => {
    setLoading(true);
    dispatch(signIn(user))
      .unwrap()
      .then(() => {
        if (location.state?.from) navigate(location.state?.from);
        else {
          navigate(path.SELL);
        }
      })
      .catch(() => {
        setLoading(false);
        setModal(true);
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    const validateForm = () => {
      const validate = user.email.length > 10 && user.password.length > 4;
      setDisabled(!validate);
    };
    validateForm();
  }, [user]);

  return (
    <div className=" w-full h-screen flex">
      <div className="flex flex-col flex-1 items-center justify-center space-y-5">
        <div className="h-[40%] flex flex-col items-center justify-end pb-10">
          <h1 className="font-semibold text-3xl">Bienvenido a Retro</h1>
          <h1 className="font-semibold text-2xl">Café & Bar</h1>
        </div>

        <form
          className="flex flex-col justify-start flex-1 px-5 md:px-0 w-full md:w-[450px] space-y-4"
          onSubmit={handleSubmit}
        >
          <p className="font-semibold text-xl text-center">
            Ingresar a tu cuenta
          </p>

          <div className="flex flex-col space-y-2">
            <p>Correo eletrónico</p>
            <input
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
              type="email"
              autoComplete="email"
              name="email"
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="flex flex-col space-y-2">
            <p>Contraseña</p>
            <input
              className="outline-none border-2 border-[#969696] rounded-md p-2 focus:border-[#121212]"
              type="password"
              autoComplete="current-password"
              name="password"
              onChange={handleChange}
              required
            ></input>
          </div>

          <button
            type="submit"
            disabled={disabled || loading}
            onClick={loading ? null : onClickSignIn}
            className="bg-[#2F5ED1] w-full py-3 rounded-md text-white font-semibold hover:bg-[#2470E9] disabled:bg-[#45485C] disabled:transition-none"
          >
            INICIAR SESIÓN
          </button>
        </form>
      </div>

      <div className="hidden md:flex w-[42%] bg-[#121212]">
        <div
          className="bg-repeat w-full h-full flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(150, 150, 150, 0.8), rgba(69, 72, 92, 0.9)), url(${require("../../assets/img/logox100.png")})`,
          }}
        >
          <img src={`${require("../../assets/img/logo.png")}`} />
        </div>
      </div>

      <BaseModal status={modal} changeStatus={setModal} title="Iniciar sesión">
        <div className="flex flex-col w-full md:w-[450px] px-5 pb-5 space-y-2">
          <p>{message}</p>
        </div>
      </BaseModal>
    </div>
  );
};

export default SignInPage;
