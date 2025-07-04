import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./components/Products";
import Login from "./pages/Login";

function App() {
  return (
    <div className="px-4 lg:px-20 min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
