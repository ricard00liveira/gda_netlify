import React, { useEffect, useState } from "react";
import axios from "axios";

const DenunciasList = () => {
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    // Função para buscar as denúncias
    const fetchDenuncias = async () => {
      try {
        const response = await axios.get(
          "https://gda-app-22cb3b24bc60.herokuapp.com/api/denuncias/"
        );
        setDenuncias(response.data);
      } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
      }
    };

    fetchDenuncias();
  }, []);

  return (
    <div>
      <h1>Lista de Denúncias</h1>
      <ul>
        {denuncias.map((denuncia) => (
          <li key={denuncia.numero}>
            <p>
              <strong>Descrição:</strong>
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
              <strong>Status:</strong> {denuncia.status}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(denuncia.data).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DenunciasList;
