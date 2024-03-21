import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {/* kullanıcının erişebilmesi için hesabına giriş yapmasının zorunlu olduğu 
        yolların hepsini kapsayıcı bir Route içine alıyoruz. */}
        <Route element={ <ProtectedRoute /> }>
          <Route path="/home" element={<FeedPage />} />
          <Route path="/profil" element={<h1>profil</h1>} />
          <Route path="/ayar" element={<h1>ayar</h1>} />
          <Route path="/mesaj" element={<h1>mesaj</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
