import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      // .catch((error) => {
      //   console.error("Error fetching user:", error);
      //   dispatch(logout());
      // })
      .finally(() => setLoading(false))
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400 text-black">
        <FadeLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          Todo: <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
