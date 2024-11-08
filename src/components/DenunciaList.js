import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const DenunciasList = () => {
  const [denuncias, setDenuncias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const response = await api.get(
          "https://gda-app-22cb3b24bc60.herokuapp.com/api/denuncias/"
        );
        setDenuncias(response.data);
      } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
      }
    };

    fetchDenuncias();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/home");
  };

  return (
    <div>
      <h1>Lista de Denúncias</h1>
      <ul>
        {denuncias.map((denuncia) => (
          <li key={denuncia.numero}>
            <p>
              <strong>Descrição:</strong> {denuncia.descricao}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                style={{
                  color:
                    denuncia.status === "Pendente"
                      ? "red"
                      : denuncia.status === "Resolvido"
                      ? "green"
                      : "black",
                }}
              >
                {denuncia.status}
              </span>
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(denuncia.data).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate("/home");
        }}
        style={{ marginTop: "20px" }}
      >
        Home
      </button>
      <button
        onClick={() => navigate("/profile")}
        style={{ marginTop: "20px" }}
      >
        Perfil
      </button>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Sair
      </button>
    </div>
  );
};

export default DenunciasList;
