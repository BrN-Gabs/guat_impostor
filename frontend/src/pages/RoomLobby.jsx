import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "@/services/api";
import { socket } from "@/services/socket";

export default function RoomLobby() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const playerName = params.get("name");

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // envia evento correto pro backend
    socket.emit("room:join", { 
      roomCode: code, 
      playerName 
    });

    // quando um jogador entra
    socket.on("room:playerJoined", (player) => {
      setPlayers(prev => [...prev, player]);
    });

    // quando a sala for iniciada
    socket.on("room:started", () => {
      alert("A sala foi iniciada!");
    });

    return () => {
      socket.off("room:playerJoined");
      socket.off("room:started");
    };
  }, []);

  async function handleStart() {
    try {
      await api.post("/room/start", { roomCode: code });

      // notifica via websocket
      socket.emit("room:start", { roomCode: code });
    } catch (err) {
      alert("Erro ao iniciar!");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sala {code}</h1>

      <h3>Jogadores:</h3>
      <ul>
        {players.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>

      <button onClick={handleStart}>Iniciar Jogo</button>
    </div>
  );
}
