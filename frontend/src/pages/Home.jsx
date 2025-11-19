import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  function handleEnterRoom() {
    if (!name || !roomCode) return alert("Nome e código obrigatórios!");
    navigate(`/sala/${roomCode}?name=${name}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Impostor Game</h1>

      <input
        placeholder="Seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Código da sala"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
      /><br/><br/>

      <button onClick={handleEnterRoom}>
        Entrar na sala
      </button>

      <br /><br />

      <button onClick={() => navigate("/criar")}>
        Criar sala
      </button>
    </div>
  );
}
