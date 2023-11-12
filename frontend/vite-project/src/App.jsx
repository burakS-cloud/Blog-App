import { Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import Home from "../src/pages/Home";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
      {/* <Redirect to="/" /> */}
    </div>
  );
};

export default App;
