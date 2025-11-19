import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import RoomLobby from "./pages/RoomLobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar" element={<CreateRoom />} />
        <Route path="/sala/:code" element={<RoomLobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
