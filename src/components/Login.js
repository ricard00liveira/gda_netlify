import React, { useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import './style.css'; 

const Login = () => {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await api.get(
        process.env.REACT_APP_API_URL + "profile/"
      );
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        process.env.REACT_APP_API_URL + "token/",
        {
          cpf,
          password,
        }
      );
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      await getUser();

      console.log("Login successful");
      navigate("/main");
    } catch (error) {
      setError("Erro ao entrar. Verifique seu CPF e/ou senha!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">CPF:</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Entrar</button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
        </form>
        <div className="flex justify-center mt-4">
          <button onClick={() => navigate('/home')} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300">Voltar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
