import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";
import Footer from "./components/Footer";
import Home from "./components/Home";
import TermsAndConditions from "./components/TermsCondition";

function App() {
  return (
 
      <Router>
          <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/Allarticles" element={<Articles />} />
        <Route path="/" element={<Home />} />
        <Route path="/termsconditions" element={<TermsAndConditions/>} />
        </Routes>
        <Footer/>
      </Router>
    
  );
}

export default App;
