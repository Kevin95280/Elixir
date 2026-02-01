import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Home from "../Home";
import Layout from "../Layout";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import AccountPage from "../AccountPage";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";


const App = () => {
  const { loading } = useAuth();

  // Afficher un loader si le contexte Auth est en cours de chargement
  if (loading) {
    return <p className="p-6">Chargement...</p>;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Layout>
  );
};


export default App;

