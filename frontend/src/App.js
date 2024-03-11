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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UploadAvatar from "./components/user/UploadAvatar";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethod from "./components/cart/PaymentMethod";

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
            <Route exact path="/me/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>
            <Route exact path="/me/update_profile" element={
            <ProtectedRoute>
              <UpdateUserProfile/>
            </ProtectedRoute>
            }/>

            <Route exact path="/me/upload_avatar" element={
            <ProtectedRoute>
              <UploadAvatar/>
            </ProtectedRoute>
            }/>

            <Route exact path="/me/update_password" element={
            <ProtectedRoute>
              <UpdatePassword/>
            </ProtectedRoute>
            }/>
            <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
            <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
            <Route exact path="/cart" element={
              <ProtectedRoute>
              <Cart/>
              </ProtectedRoute>
            }/>
            <Route exact path="/shipping" element={
            <ProtectedRoute>
              <Shipping/>
            </ProtectedRoute>
            }/>
            <Route exact path="/confirm_order" element={
              <ProtectedRoute>
                <ConfirmOrder/>
              </ProtectedRoute>
            }/>
            <Route exact path="/payment_method" element={
              <ProtectedRoute>
                <PaymentMethod/>
              </ProtectedRoute>
            }/>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
