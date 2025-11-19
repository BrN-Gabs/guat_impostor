import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [mode, setMode] = useState("word");
  const navigate = useNavigate();

  async function handleCreate() {
    if (!name) return alert("Digite seu nome!");

    const res = await api.post("/room/create", { mode, playerName: name });
    const { code } = res.data;

    navigate(`/sala/${code}?name=${name}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Criar Sala</h1>

      <input
        placeholder="Seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br/><br/>

      <label>Modo:</label>
      <select value={mode} onChange={e => setMode(e.target.value)}>
        <option value="word">Palavra</option>
        <option value="question">Pergunta</option>
      </select>

      <br /><br />

      <button onClick={handleCreate}>
        Criar
      </button>
    </div>
  );
}
