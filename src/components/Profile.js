import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [perfil, setPerfil] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await api.get(
          process.env.REACT_APP_API_URL + "profile/"
        );
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar profile:", error);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>
        <p className="mb-2">
          <span className="font-semibold">CPF:</span> {perfil.cpf}
        </p>
        <p className="mb-2">
          <span className="font-semibold">E-mail:</span> {perfil.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Nome:</span> {perfil.nome}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Tipo:</span>{" "}
          {perfil.tipo === "adm" ? "Administrador" : perfil.tipo}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/main");
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
