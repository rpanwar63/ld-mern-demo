import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
}

export default App;
