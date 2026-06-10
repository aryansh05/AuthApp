import { createRoot } from "react-dom/client";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import About from "./pages/About";
import RootLayout from "./pages/RootLayout";
import UserLayout from "./pages/users/UserLayout";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<UserLayout />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
