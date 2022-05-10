import axios from "axios";
import React, { useState } from "react";

function LogSign({ setUser }) {
  const [loggingIn, setLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/create", { username, password })
      .then((res) => {
        setUsername("");
        setPassword("");
        if (res.data._id) {
          window.localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
        } else {
          setError(res.data);
        }
      });
  }
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/login", { username, password })
      .then((res) => {
        if (res.data._id) {
          window.localStorage.setItem("user", JSON.stringify(res.data));
          setError(null);
          setUser(res.data);
        } else {
          setError(res.data);
        }
      });
  }
  return (
    <div className="flex flex-col p-4 bg-slate-200 h-[400px] w-2/3">
      <h1 className="self-center text-xl font-serif font-bold">
        {loggingIn ? "LOGIN" : "CADASTRE-SE"}
      </h1>
      <label className="self-center mt-6" htmlFor="username">
        Usuário
      </label>
      <input
        type="text"
        value={username}
        id="username"
        name="username"
        className="py-2 px-4 self-center mt-2 w-2/3 border border-cyan-600 rounded outline-none"
        placeholder="Digite aqui seu usuário..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password" className="mt-6 self-center">
        Senha
      </label>
      <input
        value={password}
        type="password"
        id="password"
        name="password"
        className="py-2 px-4 self-center mt-2 w-2/3 border border-cyan-600 rounded outline-none"
        placeholder="Digite aqui sua senha..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={loggingIn ? (e) => handleLogin(e) : (e) => handleRegister(e)}
        className="font-semibold mt-6 py-2 px-4 bg-blue-400 hover:bg-blue-500 w-[100px] self-center rounded-sm"
      >
        {loggingIn ? "Entrar" : "Cadastrar"}
      </button>
      {error && <p className="pt-2 self-center text-red-400">{error}</p>}
      <p className="self-center mt-4 text-gray-500">
        {loggingIn ? "Não tem uma conta?" : "Já tem uma conta?"}
        <span
          className="text-green-700 underline pl-2 cursor-pointer"
          onClick={() => setLoggingIn((state) => (state = !state))}
        >
          {loggingIn ? "Crie já" : "Clique aqui"}
        </span>
      </p>
    </div>
  );
}

export default LogSign;
