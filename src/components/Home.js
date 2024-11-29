import React from "react";
import { useNavigate } from "react-router-dom";
import './style.css'; // Import the Tailwind CSS file

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/main");
    } else {
      navigate("/login");
    }
  };

  const goToDenunciasList = () => {
    navigate("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-8">
        Bem-vindo ao GDA: Gerenciador de Denúncias Ambientais
      </h1>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 mb-4"
      >
        Acessar
      </button>
      <button
        onClick={goToDenunciasList}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Ver Lista de Denúncias
      </button>
    </div>
  );
};

export default Home;
