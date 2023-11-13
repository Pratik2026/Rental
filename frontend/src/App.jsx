import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Rent from "./pages/rent";
import Products from "./pages/Products.jsx";
import SellForm from "./pages/sellForm.jsx";
import View from "./pages/viewitem.jsx";
import UserProfile from "./pages/userProfile.jsx";
import { NotFound } from "./components/notfound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="rent" element={<Rent />} />
        <Route path="products" element={<Products />} />
        <Route path="products/product" element={<View />} />
        <Route path="sellform" element={<SellForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/not-found" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
