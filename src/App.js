import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Menu from './pages/Menu.js';
import Cart from './pages/Cart.js';
import Payment from './pages/Payment.js';
import Login from './pages/Login.js';
import Navbar from './components/Navbar.js';
import Register from './pages/Register'; // ใช้ไฟล์ที่ต้องการเท่านั้น


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:shopId" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
