import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { FullPost } from "./pages/FullPost ";
import { AddPost } from "./pages/AddPost/AddPost";
import TagPage from "./pages/TagPage/TagPage";

function App() {

  return (
    <>
    <Header/>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/posts/:id" element={<FullPost />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/posts/:id/edit" element={<AddPost />}/>
        <Route path="/add-post" element={<AddPost />}/>
        <Route path="/tag/:tag" element={<TagPage />}/>
      </Routes>
    </div>
    </>
  )
}

export default App;
