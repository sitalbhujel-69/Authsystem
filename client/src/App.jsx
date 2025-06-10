import { Routes,Route, } from "react-router-dom";
import SignUp from '@/components/Form'
import { InputOTPDemo } from "./components/otp";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/verify-otp" element={<InputOTPDemo/>}></Route>
      <Route path="/home" element={
        <ProtectedRoute>

          <Home/>
        </ProtectedRoute>
        }></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </>
  );
}

export default App;
