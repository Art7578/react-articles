import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
      </Routes>
    </div>
    </>
  )
}

export default App;
