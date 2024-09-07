import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import PostDetail from "./pages/PostDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import BeforeLoginRoute from "./components/BeforeLoginRoute";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<BeforeLoginRoute component={Login} />} path="/login" />
        <Route element={<BeforeLoginRoute component={Register} />} path="/register" />

        <Route element={<Posts />} path="/posts" />
        <Route
          element={<ProtectedRoute component={CreatePost} />}
          path="/create-post"
        />

        <Route element={<PostDetail />} path="/posts/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
