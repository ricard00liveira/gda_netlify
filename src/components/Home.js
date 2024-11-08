import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/list-denuncias");
    } else {
      navigate("/login");
    }
  };

  const goToDenunciasList = () => {
    navigate("/list-denuncias");
  };

  return (
    <div>
      <h1>Bem-vindo ao GDA: Gerenciador de Denúncias Ambientais</h1>
      <button onClick={handleLogin} style={{ marginTop: "20px" }}>
        Acessar
      </button>
      <button onClick={goToDenunciasList} style={{ marginTop: "20px" }}>
        Ver Lista de Denúncias
      </button>
    </div>
  );
};

export default Home;
