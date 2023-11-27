import { Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/Login"
import { HomePage } from "./pages/Home"
import { RegistrationPage } from "./pages/Registration";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
};

export default App