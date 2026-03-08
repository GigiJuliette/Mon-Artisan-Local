import { Outlet } from "react-router-dom";
import "./App.css";
import { Background } from "./components/custom/Background";

function App() {
  return (
    <>
      <div>
        <Background />
        <Outlet />
      </div>
    </>
  );
}

export default App;
