import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster} from "react-hot-toast"
import ProductDetails from "./components/product/ProductDetails";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateUserProfile from "./components/user/UpdateUserProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails/>} />
            <Route exact path="/login" element={<LogIn/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/me/profile" element={<Profile/>}/>
            <Route exact path="/me/update_profile" element={<UpdateUserProfile/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
