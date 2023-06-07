import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const HomeRedirect = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/posts");
  }, [navigate]);

  return <div>Redirecting to /posts...</div>;
};

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth /> : <HomeRedirect />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
