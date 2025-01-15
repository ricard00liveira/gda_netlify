import React, { useEffect, useState } from "react";
//import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { ToastContainer } from "react-toastify";

const Main = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  //const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("user"));
        setUser(usuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    buscarUsuario();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Olá, {user.tipo === "adm" ? `${user.nome} (Administrador)` : user.nome}.{" "}
      </h2>
      <div className="mt-4">
        <button
          onClick={() => {
            navigate("/home");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/denuncias");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Denúncias
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Perfil
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Main;
