import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home/Home";
import { Navbar } from "./Navbar/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

import arrowUp from "../assets/icons/arrow-up.svg";
import { AnimatePresence } from "framer-motion";
import { Dashboard } from "./Dashboard/Dashboard";
import { Bill } from "./Bill/Bill";
import { Login } from "./Login";
import { Monitoring } from "./Oprator/Monitoring/Monitoring";
import { Menu } from "./Oprator/Menu/Menu";

const ProtectedRoute = ({ currentRole, allowedRoles, children }) => {
  if (currentRole === null) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export function Layout() {
  const [showButton, setShowButton] = useState(false);

  // Simulasi State Role yang Dinamis (Nantinya ganti dengan Context/Redux/Custom Hook)
  // Misalnya: const { userRole } = useAuth();
  const [userRole] = useState("kasir");

  // useEffect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BrowserRouter>
      <div className="grid grid-cols-12 min-h-screen pb-25">
        <ProtectedRoute
          currentRole={userRole}
          allowedRoles={["kasir", "oprator"]}
        >
          <Navbar role={userRole} />
        </ProtectedRoute>

        <Routes>
          {/* Rute Publik: Bisa diakses siapa saja */}
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute currentRole={userRole} allowedRoles={["kasir"]}>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Rute Terlindungi: Hanya untuk Kasir */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute currentRole={userRole} allowedRoles={["kasir"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/monitoring"
            element={
              <ProtectedRoute currentRole={userRole} allowedRoles={["oprator"]}>
                <Monitoring />
              </ProtectedRoute>
            }
          />

          {/* Rute Terlindungi: Bisa diakses Admin dan Kasir */}
          <Route
            path="/bill"
            element={
              <ProtectedRoute currentRole={userRole} allowedRoles={["kasir"]}>
                <Bill />
              </ProtectedRoute>
            }
          />

          {/* oprator */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute currentRole={userRole} allowedRoles={["oprator"]}>
                <Menu />
              </ProtectedRoute>
            }
          />
        </Routes>

        <AnimatePresence>
          {showButton && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed bottom-20 md:right-20 left-10 text-white rounded-full shadow-lg cursor-pointer print:hidden"
            >
              <img
                src={arrowUp}
                alt="arrowUp"
                className="max-w-13 object-cover"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
