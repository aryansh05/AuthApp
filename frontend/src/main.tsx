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
import UserHome from "./pages/users/UserHome";
import UserProfile from "./pages/users/UserProfile";
import OAuthSuccess from "./pages/OAuthSuccess";
import OAuthFailure from "./pages/OAuthFailure";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="/auth/success" element={<OAuthSuccess />} />
        <Route path="/auth/failure" element={<OAuthFailure />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
