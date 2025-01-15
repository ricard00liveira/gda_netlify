import React, { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";

const DenunciasList = () => {
  const [user, setUser] = useState("");
  const [denuncias, setDenuncias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [fatos, setFatos] = useState([]);
  const [subfatos, setSubFatos] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [selectedDenuncia, setSelectedDenuncia] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setDescricao("");
    setMunicipio("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openViewModal = (denuncia) => {
    setSelectedDenuncia(denuncia);
    fetchSubFatos(denuncia.fato);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedDenuncia(null);
  };

  const openEditModal = (denuncia) => {
    setSelectedDenuncia(denuncia);
    setDescricao(denuncia.descricao);
    setMunicipio(denuncia.municipio);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDenuncia(null);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await api.patch(
        process.env.REACT_APP_API_URL +
          `denuncias/${selectedDenuncia.numero}/update/`,
        {
          descricao,
          municipio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Denúncia atualizada com sucesso!", {
          autoClose: 1000,
        });
        setDenuncias((prevDenuncias) =>
          prevDenuncias.map((d) =>
            d.numero === selectedDenuncia.numero
              ? { ...d, descricao, municipio }
              : d
          )
        );
        closeEditModal();
      }
    } catch (error) {
      console.error("Erro ao atualizar denúncia:", error);
    }
  };

  const fetchSubFatos = async (id) => {
    try {
      const response = await api.get(
        process.env.REACT_APP_API_URL + "fatos/" + id + "/subfatos/"
      );
      setSubFatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar subfatos:", error);
    }
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
      if (response.status === 201) {
        toast.success("Denúncia adicionada com sucesso!", {
          autoClose: 1000,
        });
        setDenuncias((prevDenuncias) => [...prevDenuncias, response.data]);
        closeModal();
      }
    } catch (error) {
      console.error("Erro ao adicionar denúncia:", error);
    }
  };

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("user"));
        setUser(usuario);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

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
    const fetchFatos = async () => {
      try {
        const response = await api.get(
          process.env.REACT_APP_API_URL + "fatos/"
        );
        setFatos(response.data);
      } catch (error) {
        console.error("Erro ao buscar fatos:", error);
      }
    };
    buscarUsuario();
    fetchDenuncias();
    fetchMunicipios();
    fetchFatos();
  }, []);
  const remover = async (id) => {
    const confirmarDelecao = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.delete(
          process.env.REACT_APP_API_URL + `denuncias/${id}/delete/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200 || response.status === 204) {
          toast.dismiss();
          setDenuncias((prevDenuncias) => {
            console.log("Estado antes da exclusão:", prevDenuncias);
            return prevDenuncias.filter((denuncia) => denuncia.numero !== id);
          });

          toast.success(`Denúncia ${id} removida com sucesso!`, {
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.error("Erro ao deletar denúncia:", error);
      }
    };
    const cancelarDelecao = () => {
      console.log("Ação cancelada.");
      toast.dismiss();
    };
    toast.warning(
      <div>
        <p>Tem certeza que deseja remover a denúncia {id}?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={confirmarDelecao}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Confirmar
          </button>
          <button
            onClick={cancelarDelecao}
            className="bg-gray-300 text-black px-2 py-1 rounded text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>,
      { autoClose: false, position: "top-center" }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Olá, {user.tipo === "adm" ? `${user.nome} (Administrador)` : user.nome}.{" "}
      </h2>
      <button
        onClick={() => {
          navigate("/main");
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Voltar
      </button>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Nova denúncia
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Adicionar Nova Denúncia</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Descrição:</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                  rows="5"
                  cols="30"
                  placeholder="Digite a descrição da denúncia"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Município: </label>
                <select
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um município</option>
                  {municipios.map((mun) => (
                    <option key={mun.id} value={mun.id}>
                      {mun.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
      {isEditModalOpen && selectedDenuncia && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Editar Denúncia</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Descrição:</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                  rows="5"
                  cols="30"
                  placeholder="Digite a descrição da denúncia"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Município: </label>
                <select
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione um município</option>
                  {municipios.map((mun) => (
                    <option key={mun.id} value={mun.id}>
                      {mun.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      {isViewModalOpen && selectedDenuncia && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Detalhes da Denúncia</h2>
            <p>
              <strong>Número:</strong> {selectedDenuncia.numero}
            </p>
            <p>
              <strong>Fato:</strong>{" "}
              {selectedDenuncia.fato &&
                fatos.find((m) => m.id === selectedDenuncia.fato)?.nome}{" "}
              -{" "}
              {selectedDenuncia.subfato &&
                subfatos.find((n) => n.id === selectedDenuncia.subfato)?.nome}
            </p>
            <p>
              <strong>Descrição:</strong> {selectedDenuncia.descricao}
            </p>
            <p>
              <strong>Cidade:</strong>{" "}
              {municipios.find((m) => m.id === selectedDenuncia.municipio)
                ?.nome || "Não informado"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedDenuncia.status === "analise"
                ? "Em análise"
                : selectedDenuncia.status === "fila"
                ? "Na fila"
                : selectedDenuncia.status === "concluida"
                ? "Concluída"
                : selectedDenuncia.status === "negada"
                ? "Rejeitada"
                : selectedDenuncia.status}
            </p>
            <p>
              <strong>Prioridade:</strong>{" "}
              {selectedDenuncia.prioridade === "baixa"
                ? "Baixa"
                : selectedDenuncia.prioridade === "media"
                ? "Média"
                : selectedDenuncia.prioridade === "alta"
                ? "Alta"
                : selectedDenuncia.prioridade === "urgente"
                ? "Urgente"
                : selectedDenuncia.prioridade}
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(selectedDenuncia.data).toLocaleDateString()}
            </p>
            <button
              onClick={closeViewModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Lista de Denúncias</h1>
      <ul>
        {denuncias.map((denuncia) => (
          <li
            key={denuncia.numero}
            className="mb-4 p-4 border rounded shadow-sm"
          >
            <p>
              <strong>Número: {denuncia.numero}</strong>{" "}
              <button
                onClick={() => openViewModal(denuncia)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm ml-2"
              >
                Ver
              </button>
              <button
                onClick={() => openEditModal(denuncia)}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm ml-2"
              >
                Editar
              </button>
              <button
                onClick={() => remover(denuncia.numero)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2"
              >
                Deletar
              </button>
            </p>
            <p>
              <strong>Descrição:</strong> {denuncia.descricao}
            </p>
            <p>
              <strong>Status: </strong>
              <span
                className={
                  denuncia.status === "concluida"
                    ? "text-green-500"
                    : "text-black"
                }
              >
                {denuncia.status === "analise"
                  ? "Em análise"
                  : denuncia.status === "fila"
                  ? "Na fila"
                  : denuncia.status === "concluida"
                  ? "Concluída"
                  : denuncia.status === "negada"
                  ? "Rejeitada"
                  : denuncia.status}
              </span>
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(denuncia.data).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DenunciasList;
