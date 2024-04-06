import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProductList from "./pages/ProductList";
import ProductDetail from "./components/ProductDetail";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Fav from "./pages/Fav";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route
          path="/productList"
          element={<ProductList></ProductList>}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin></Admin>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/fav" element={<Fav></Fav>}></Route>
      </Routes>
    </>
  );
}

export default App;
