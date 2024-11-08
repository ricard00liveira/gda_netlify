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
          "https://gda-app-22cb3b24bc60.herokuapp.com/api/profile/"
        );
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div>
      <h1>Perfil</h1>
      <p>CPF: {perfil.cpf}</p>
      <p>E-mail: {perfil.email}</p>
      <p>Nome: {perfil.nome}</p>
      <p>Tipo: {perfil.tipo_usuario}</p>
      <button
        onClick={() => {
          navigate("/home");
        }}
        style={{ marginTop: "20px" }}
      >
        Home
      </button>
    </div>
  );
};

export default Profile;
