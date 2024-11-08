import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const DenunciasList = () => {
  const [user, setUser] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setDescricao("");
    setMunicipio("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.post(
        process.env.REACT_APP_API_URL + "denuncias/create",
        {
          descricao,
          municipio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDenuncias((prevDenuncias) => [...prevDenuncias, response.data]);
      closeModal();
    } catch (error) {
      console.error("Erro ao adicionar denúncia:", error);
    }
  };

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const response = await api.get(
          process.env.REACT_APP_API_URL + "denuncias/"
        );
        setDenuncias(response.data);
      } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
      }
    };
    const fetchMunicipios = async () => {
      try {
        const response = await api.get(
          process.env.REACT_APP_API_URL + "municipios/"
        );
        setMunicipios(response.data);
      } catch (error) {
        console.error("Erro ao buscar municipios:", error);
      }
    };

    const getUser = async () => {
      try {
        const response = await api.get(
          process.env.REACT_APP_API_URL + "profile/"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchDenuncias();
    fetchMunicipios();
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/home");
  };

  const remover = async (id) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja remover a denúncia número ${id}?`
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("access_token");
        await api.delete(
          process.env.REACT_APP_API_URL + `denuncias/delete/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDenuncias(denuncias.filter((denuncia) => denuncia.id !== id));
      } catch (error) {
        console.error("Erro ao deletar denúncia:", error);
      }
    }
  };

  return (
    <div>
      <h2>Olá, {user.nome}.</h2>
      <button onClick={openModal} style={{ marginBottom: "20px" }}>
        Nova denúncia
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Nova Denúncia</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Descrição:</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                  rows="5"
                  cols="30"
                  placeholder="Digite a descrição da denúncia"
                />
              </div>
              <div>
                <label>Município: </label>
                <select
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  required
                >
                  <option value="">Selecione um município</option>
                  {municipios.map((mun) => (
                    <option key={mun.id} value={mun.id}>
                      {mun.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" style={{ marginTop: "10px" }}>
                Salvar
              </button>
              <button
                type="button"
                onClick={closeModal}
                style={{ marginLeft: "10px" }}
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
      <h1>Lista de Denúncias</h1>
      <ul>
        {denuncias.map((denuncia) => (
          <li key={denuncia.numero}>
            <p>
              <strong>Número:</strong> {denuncia.numero}
            </p>
            <p>
              <strong>Descrição:</strong> {denuncia.descricao}
            </p>
            <p>
              <strong>Status: </strong>
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
            <button onClick={() => remover(denuncia.numero)}>Deletar</button>
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
