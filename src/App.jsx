import Navbar from "./components/Navbar";
import Home from "./pages/user/Home.jsx"
import {BrowserRouter,Routes, Route} from "react-router-dom";
import './index.css'

function App() {
  return (
    <BrowserRouter>
      {/* button panier dans Navbar*/}
      <Navbar />

      {/* Sidebar  */}
      

      <Routes>
        {/* User */}
        <Route path="/" element={<Home />} />
        
      </Routes>
      </BrowserRouter>
  );
}

export default App;
