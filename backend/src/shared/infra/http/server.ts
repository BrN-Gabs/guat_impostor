import app from "./app.js";
import { createServer } from "http";
import { setupWebsocket } from "@/websocket/index.js";

const httpServer = createServer(app);

// inicializa socket.io
setupWebsocket(httpServer);

const PORT = 3333;

httpServer.listen(PORT, () => {
  console.log(`🔥 HTTP + WebSocket rodando em http://localhost:${PORT}`);
});
